import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  Lightbulb, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  User, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Loader2,
  FileQuestion,
  HelpCircle
} from 'lucide-react';
import api from '../services/api';
import ClueCard from '../components/ClueCard';
import SuspectCard from '../components/SuspectCard';

export default function InvestigationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Hint request state
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [requestingHint, setRequestingHint] = useState(false);

  const fetchCase = async () => {
    try {
      const res = await api.getCase(id);
      if (res.success && res.case) {
        setCaseData(res.case);
        // If already completed, redirect to results
        if (res.case.playerProgress?.completed) {
          navigate(`/case/${id}/result`);
        }
      } else {
        throw new Error(res.message || 'Case not found');
      }
    } catch (err) {
      console.error('Error fetching case:', err);
      setError(err.response?.data?.message || err.message || 'Unable to load case file.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCase();
  }, [id]);

  // Discover Clue handler
  const handleDiscoverClue = async (clueId) => {
    try {
      const res = await api.discoverClue(id, clueId);
      if (res.success) {
        setCaseData(prev => {
          const updatedClues = prev.clues.map(c => 
            c.id === clueId ? { ...c, discovered: true } : c
          );
          return {
            ...prev,
            clues: updatedClues,
            playerProgress: res.playerProgress
          };
        });
      }
    } catch (err) {
      console.error('Error discovering clue:', err);
      alert('Failed to discover clue: ' + (err.response?.data?.message || err.message));
    }
  };

  // Request Hint handler
  const handleRequestHint = async () => {
    setRequestingHint(true);
    try {
      const res = await api.requestHint(id);
      if (res.success) {
        setCaseData(prev => {
          const updatedHints = prev.hints.map(h => 
            h.id === res.hint.id ? { ...h, revealed: true } : h
          );
          return {
            ...prev,
            hints: updatedHints,
            playerProgress: res.playerProgress
          };
        });
        setHintModalOpen(false);
      }
    } catch (err) {
      console.error('Error requesting hint:', err);
      alert(err.response?.data?.message || err.message || 'Failed to unlock hint.');
    } finally {
      setRequestingHint(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-300">
        <Loader2 className="w-10 h-10 text-amberGold-400 animate-spin mb-4" />
        <p className="font-mono text-sm">Accessing Secured Case Dossier #{id}...</p>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="max-w-xl mx-auto my-16 p-6 rounded-2xl bg-noir-900 border border-rose-500/30 text-center">
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-slate-100 mb-2">Access Denied</h3>
        <p className="text-sm text-slate-400 mb-6">{error || 'This mystery case cannot be located.'}</p>
        <Link
          to="/"
          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-noir-800 hover:bg-noir-700 text-slate-200 text-xs font-mono font-semibold transition-colors"
        >
          Return to Headquarters
        </Link>
      </div>
    );
  }

  const discoveredCount = caseData.clues.filter(c => c.discovered).length;
  const totalClues = caseData.clues.length;
  const revealedHints = caseData.hints.filter(h => h.revealed);
  const remainingHints = caseData.hints.filter(h => !h.revealed);

  // Score estimation
  const basePoints = caseData.difficulty === 'easy' ? 100 : caseData.difficulty === 'hard' ? 200 : 150;
  const currentClueBonus = discoveredCount * 5;
  const currentHintPenalty = (caseData.playerProgress?.hintsUsedCount || 0) * 10;
  const projectedScore = Math.max(0, basePoints + currentClueBonus - currentHintPenalty);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in pb-28">
      
      {/* Top Banner / Case Overview */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-8 border border-noir-700/80 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${
                caseData.difficulty === 'easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : caseData.difficulty === 'hard'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-amberGold-500/10 text-amberGold-400 border-amberGold-500/30'
              }`}>
                {caseData.difficulty} Difficulty
              </span>
              <span className="text-xs font-mono text-slate-400">
                Case ID: #{id?.substring(0, 10)}
              </span>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-100 tracking-tight">
              {caseData.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans pt-1">
              {caseData.story?.synopsis}
            </p>
          </div>

          {/* Quick HUD Counters */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            
            {/* Clues Discovered Meter */}
            <div className="p-3.5 rounded-xl bg-noir-900/90 border border-noir-700/80 min-w-[110px] text-center">
              <span className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Clues Found</span>
              <span className="font-mono font-bold text-lg text-amberGold-400">
                {discoveredCount} / {totalClues}
              </span>
            </div>

            {/* Projected Score Meter */}
            <div className="p-3.5 rounded-xl bg-noir-900/90 border border-noir-700/80 min-w-[110px] text-center">
              <span className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Potential Score</span>
              <span className="font-mono font-bold text-lg text-emerald-400">
                {projectedScore} pts
              </span>
            </div>

          </div>

        </div>

        {/* Crime Scene Metadata Strip */}
        <div className="mt-6 pt-5 border-t border-noir-800 flex flex-wrap gap-y-2 gap-x-6 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-400">Victim/Target:</span>
            <span className="font-semibold text-slate-200">{caseData.story?.victim}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyanGlow-400" />
            <span className="text-slate-400">Scene Location:</span>
            <span className="font-semibold text-slate-200">{caseData.story?.sceneLocation}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amberGold-400" />
            <span className="text-slate-400">Time of Incident:</span>
            <span className="font-semibold text-slate-200">{caseData.story?.timeOfCrime}</span>
          </div>
        </div>
      </div>

      {/* Grid: Suspects & Evidence */}
      <div className="space-y-12">
        
        {/* Suspects Section */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-noir-800 text-rose-400 border border-noir-700">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-slate-100">Suspect Dossier</h2>
                <p className="text-xs text-slate-400">Review testimonies, alibis, and possible motives</p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">{caseData.suspects.length} Persons of Interest</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseData.suspects.map((suspect) => (
              <SuspectCard 
                key={suspect.id} 
                suspect={suspect} 
                showAccuseAction={true}
                onQuickAccuse={() => navigate(`/case/${id}/accuse?target=${suspect.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Evidence Board Section */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-noir-800 text-amberGold-400 border border-noir-700">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-slate-100">Forensic Evidence Board</h2>
                <p className="text-xs text-slate-400">Inspect the scene to unlock clues (+5 pts per discovery)</p>
              </div>
            </div>
            <span className="text-xs font-mono text-amberGold-400">
              {discoveredCount} of {totalClues} Discovered
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseData.clues.map((clue) => (
              <ClueCard 
                key={clue.id} 
                clue={clue} 
                onDiscover={handleDiscoverClue} 
              />
            ))}
          </div>
        </div>

        {/* Hint Terminal Section */}
        <div className="glass-card rounded-2xl p-6 border border-noir-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-noir-800 text-cyanGlow-400 border border-noir-700">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-100">Detective Hint Terminal</h3>
                <p className="text-xs text-slate-400">Request forensic assistance (-10 pts penalty per hint used)</p>
              </div>
            </div>

            <button
              id="btn-request-hint-modal"
              type="button"
              disabled={remainingHints.length === 0}
              onClick={() => setHintModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-cyanGlow-500/10 hover:bg-cyanGlow-500/20 disabled:opacity-40 text-cyanGlow-400 border border-cyanGlow-500/30 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>
                {remainingHints.length > 0 
                  ? `Request Hint (${remainingHints.length} Left)` 
                  : 'All Hints Unlocked'}
              </span>
            </button>
          </div>

          {/* List of Revealed Hints */}
          {revealedHints.length > 0 ? (
            <div className="space-y-2.5 mt-4">
              {revealedHints.map((hint, idx) => (
                <div 
                  key={hint.id || idx}
                  className="p-3.5 rounded-xl bg-noir-950/80 border border-cyanGlow-500/30 text-xs sm:text-sm text-slate-200 flex items-start space-x-3 animate-fade-in"
                >
                  <span className="px-2 py-0.5 rounded bg-cyanGlow-500/20 text-cyanGlow-400 font-mono text-xs font-bold mt-0.5">
                    Hint #{idx + 1}
                  </span>
                  <p className="flex-1 font-sans">{hint.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic pt-1">
              No hints requested yet. Rely solely on your deductive skill to preserve maximum points!
            </p>
          )}
        </div>

      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 glass-panel border-t border-noir-700/80 p-4 z-40 shadow-2xl backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center space-x-4 text-xs font-mono text-slate-300">
            <span>Evidence: <strong className="text-amberGold-400">{discoveredCount}/{totalClues}</strong></span>
            <span>Hints: <strong className="text-cyanGlow-400">{revealedHints.length} used</strong></span>
            <span>Current Score: <strong className="text-emerald-400">{projectedScore} pts</strong></span>
          </div>

          <Link
            to={`/case/${id}/accuse`}
            id="btn-proceed-to-accuse"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50"
          >
            <Shield className="w-4 h-4 stroke-[2.5]" />
            <span>Enter Accusation Lineup &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Hint Confirmation Modal */}
      {hintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full glass-panel rounded-2xl p-6 border border-cyanGlow-500/40 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyanGlow-500/10 border border-cyanGlow-500/30 flex items-center justify-center text-cyanGlow-400 mb-4">
              <Lightbulb className="w-6 h-6" />
            </div>

            <h3 className="font-display font-bold text-lg text-slate-100 mb-2">
              Unlock Strategic Hint?
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Revealing a hint will give you crucial forensic guidance, but it carries a permanent deduction of <strong className="text-rose-400">-10 points</strong> from your final detective score.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-noir-800">
              <button
                type="button"
                onClick={() => setHintModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-noir-800 hover:bg-noir-700 text-slate-300 text-xs font-mono font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btn-confirm-hint-unlock"
                disabled={requestingHint}
                onClick={handleRequestHint}
                className="px-4 py-2 rounded-lg bg-cyanGlow-500 hover:bg-cyanGlow-400 text-noir-950 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-md shadow-cyanGlow-500/30"
              >
                {requestingHint ? 'Decryption in progress...' : 'Confirm (-10 pts)'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
