import express from 'express';
import Case from '../models/Case.js';
import { isDbConnected, MemoryCaseRepo } from '../db.js';
import { generateMysteryCase } from '../geminiService.js';
import { calculateScore } from '../scoring.js';

const router = express.Router();

/**
 * Helper to strip secret culprit and solution fields
 * to guarantee security until accusation is submitted!
 */
function sanitizeCase(caseDoc) {
  const obj = caseDoc.toObject ? caseDoc.toObject() : JSON.parse(JSON.stringify(caseDoc));
  
  // Strip private solution
  delete obj.solution;
  
  // Strip isCulprit flag from all suspects
  if (Array.isArray(obj.suspects)) {
    obj.suspects = obj.suspects.map(s => {
      const { isCulprit, ...rest } = s;
      return rest;
    });
  }

  return obj;
}

/**
 * POST /api/cases
 * Generate and store a new mystery case
 */
router.post('/', async (req, res) => {
  try {
    const { premise, difficulty } = req.body;
    const normDiff = (difficulty || 'medium').toLowerCase();

    // Generate case via Gemini AI (or verified procedural engine)
    const generated = await generateMysteryCase(premise, normDiff);

    const initialData = {
      title: generated.title,
      premise: premise || 'Investigate the scene',
      difficulty: normDiff,
      story: generated.story,
      suspects: generated.suspects,
      clues: generated.clues.map(c => ({ ...c, discovered: false })),
      hints: generated.hints.map(h => ({ ...h, revealed: false })),
      solution: generated.solution,
      playerProgress: {
        discoveredCluesCount: 0,
        hintsUsedCount: 0,
        accusedSuspectId: null,
        accusedSuspectName: null,
        isSolved: false,
        score: 0,
        completed: false
      }
    };

    let savedCase;
    if (isDbConnected()) {
      savedCase = await Case.create(initialData);
    } else {
      savedCase = await MemoryCaseRepo.create(initialData);
    }

    const sanitized = sanitizeCase(savedCase);
    return res.status(201).json({
      success: true,
      case: sanitized
    });
  } catch (err) {
    console.error('Error generating mystery case:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate mystery case: ' + err.message
    });
  }
});

/**
 * GET /api/cases
 * Retrieve list of recent mysteries (sanitized)
 */
router.get('/', async (req, res) => {
  try {
    let cases = [];
    if (isDbConnected()) {
      cases = await Case.find().sort({ createdAt: -1 }).limit(20);
    } else {
      cases = await MemoryCaseRepo.listAll();
      cases.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    const sanitized = cases.map(sanitizeCase);
    return res.json({ success: true, cases: sanitized });
  } catch (err) {
    console.error('Error fetching cases:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * GET /api/cases/:id
 * Retrieve an active mystery (SECURITY: sanitized!)
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let caseDoc;
    if (isDbConnected()) {
      caseDoc = await Case.findById(id);
    } else {
      caseDoc = await MemoryCaseRepo.findById(id);
    }

    if (!caseDoc) {
      return res.status(404).json({ success: false, message: 'Mystery case not found.' });
    }

    const sanitized = sanitizeCase(caseDoc);
    return res.json({ success: true, case: sanitized });
  } catch (err) {
    console.error('Error fetching case:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * POST /api/cases/:id/clues/:clueId/discover
 * Discover a clue (+5 points upon case scoring)
 */
router.post('/:id/clues/:clueId/discover', async (req, res) => {
  try {
    const { id, clueId } = req.params;
    let caseDoc;

    if (isDbConnected()) {
      caseDoc = await Case.findById(id);
      if (!caseDoc) return res.status(404).json({ success: false, message: 'Case not found' });

      const clue = caseDoc.clues.find(c => c.id === clueId);
      if (!clue) return res.status(404).json({ success: false, message: 'Clue not found' });

      if (!clue.discovered) {
        clue.discovered = true;
        caseDoc.playerProgress.discoveredCluesCount = caseDoc.clues.filter(c => c.discovered).length;
        await caseDoc.save();
      }

      return res.json({
        success: true,
        clue,
        playerProgress: caseDoc.playerProgress
      });
    } else {
      caseDoc = await MemoryCaseRepo.findById(id);
      if (!caseDoc) return res.status(404).json({ success: false, message: 'Case not found' });

      const clue = caseDoc.clues.find(c => c.id === clueId);
      if (!clue) return res.status(404).json({ success: false, message: 'Clue not found' });

      if (!clue.discovered) {
        await MemoryCaseRepo.update(id, (doc) => {
          const targetClue = doc.clues.find(c => c.id === clueId);
          if (targetClue) targetClue.discovered = true;
          doc.playerProgress.discoveredCluesCount = doc.clues.filter(c => c.discovered).length;
        });
        caseDoc = await MemoryCaseRepo.findById(id);
      }

      return res.json({
        success: true,
        clue: caseDoc.clues.find(c => c.id === clueId),
        playerProgress: caseDoc.playerProgress
      });
    }
  } catch (err) {
    console.error('Error discovering clue:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * POST /api/cases/:id/hints
 * Request a strategic hint (-10 points penalty)
 */
router.post('/:id/hints', async (req, res) => {
  try {
    const { id } = req.params;
    let caseDoc;

    if (isDbConnected()) {
      caseDoc = await Case.findById(id);
      if (!caseDoc) return res.status(404).json({ success: false, message: 'Case not found' });

      const nextHint = caseDoc.hints.find(h => !h.revealed);
      if (!nextHint) {
        return res.status(400).json({ success: false, message: 'All hints for this case have already been revealed.' });
      }

      nextHint.revealed = true;
      caseDoc.playerProgress.hintsUsedCount = caseDoc.hints.filter(h => h.revealed).length;
      await caseDoc.save();

      return res.json({
        success: true,
        hint: nextHint,
        revealedHints: caseDoc.hints.filter(h => h.revealed),
        playerProgress: caseDoc.playerProgress
      });
    } else {
      caseDoc = await MemoryCaseRepo.findById(id);
      if (!caseDoc) return res.status(404).json({ success: false, message: 'Case not found' });

      const nextHint = caseDoc.hints.find(h => !h.revealed);
      if (!nextHint) {
        return res.status(400).json({ success: false, message: 'All hints for this case have already been revealed.' });
      }

      let revealedHintId = nextHint.id;
      await MemoryCaseRepo.update(id, (doc) => {
        const h = doc.hints.find(hint => hint.id === revealedHintId);
        if (h) h.revealed = true;
        doc.playerProgress.hintsUsedCount = doc.hints.filter(hint => hint.revealed).length;
      });

      const updated = await MemoryCaseRepo.findById(id);
      return res.json({
        success: true,
        hint: updated.hints.find(h => h.id === revealedHintId),
        revealedHints: updated.hints.filter(h => h.revealed),
        playerProgress: updated.playerProgress
      });
    }
  } catch (err) {
    console.error('Error requesting hint:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * POST /api/cases/:id/accuse
 * Submit final accusation, compute score, and reveal verdict
 */
router.post('/:id/accuse', async (req, res) => {
  try {
    const { id } = req.params;
    const { suspectId } = req.body;

    if (!suspectId) {
      return res.status(400).json({ success: false, message: 'suspectId is required for accusation.' });
    }

    let caseDoc;
    if (isDbConnected()) {
      caseDoc = await Case.findById(id);
    } else {
      caseDoc = await MemoryCaseRepo.findById(id);
    }

    if (!caseDoc) {
      return res.status(404).json({ success: false, message: 'Case not found' });
    }

    const accusedSuspect = caseDoc.suspects.find(s => s.id === suspectId);
    if (!accusedSuspect) {
      return res.status(400).json({ success: false, message: 'Invalid suspect ID.' });
    }

    // Evaluate verdict against secret solution
    const isCorrect = (suspectId === caseDoc.solution.culpritId);

    // Calculate score based on difficulty and evidence
    const scoreBreakdown = calculateScore({
      difficulty: caseDoc.difficulty,
      isCorrect,
      discoveredCluesCount: caseDoc.playerProgress.discoveredCluesCount,
      hintsUsedCount: caseDoc.playerProgress.hintsUsedCount
    });

    const progressUpdate = {
      accusedSuspectId: suspectId,
      accusedSuspectName: accusedSuspect.name,
      isSolved: isCorrect,
      score: scoreBreakdown.total,
      scoreBreakdown,
      completed: true,
      completedAt: new Date()
    };

    if (isDbConnected()) {
      caseDoc.playerProgress = { ...caseDoc.playerProgress, ...progressUpdate };
      await caseDoc.save();
    } else {
      await MemoryCaseRepo.update(id, (doc) => {
        doc.playerProgress = { ...doc.playerProgress, ...progressUpdate };
      });
      caseDoc = await MemoryCaseRepo.findById(id);
    }

    // Now reveal full resolution
    return res.json({
      success: true,
      isSolved: isCorrect,
      verdict: isCorrect ? 'GUILTY — CASE SOLVED!' : 'MISTRIAL — WRONG SUSPECT ACCUSED',
      accusedSuspect: {
        id: accusedSuspect.id,
        name: accusedSuspect.name,
        role: accusedSuspect.role
      },
      culprit: {
        id: caseDoc.solution.culpritId,
        name: caseDoc.solution.culpritName
      },
      explanation: caseDoc.solution.explanation,
      score: scoreBreakdown.total,
      scoreBreakdown,
      playerProgress: caseDoc.playerProgress
    });
  } catch (err) {
    console.error('Error submitting accusation:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * GET /api/cases/:id/result
 * Retrieve completed result with culprit & explanation
 * (Forbidden if case is not completed yet!)
 */
router.get('/:id/result', async (req, res) => {
  try {
    const { id } = req.params;
    let caseDoc;
    if (isDbConnected()) {
      caseDoc = await Case.findById(id);
    } else {
      caseDoc = await MemoryCaseRepo.findById(id);
    }

    if (!caseDoc) {
      return res.status(404).json({ success: false, message: 'Case not found' });
    }

    if (!caseDoc.playerProgress || !caseDoc.playerProgress.completed) {
      return res.status(403).json({
        success: false,
        message: 'Security lock active: Accusation has not been submitted yet.'
      });
    }

    return res.json({
      success: true,
      isSolved: caseDoc.playerProgress.isSolved,
      verdict: caseDoc.playerProgress.isSolved ? 'GUILTY — CASE SOLVED!' : 'MISTRIAL — WRONG SUSPECT ACCUSED',
      culprit: {
        id: caseDoc.solution.culpritId,
        name: caseDoc.solution.culpritName
      },
      explanation: caseDoc.solution.explanation,
      score: caseDoc.playerProgress.score,
      scoreBreakdown: caseDoc.playerProgress.scoreBreakdown,
      playerProgress: caseDoc.playerProgress
    });
  } catch (err) {
    console.error('Error fetching result:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
