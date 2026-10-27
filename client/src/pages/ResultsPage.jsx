import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  Search, 
  FileCheck, 
  Loader2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import api from '../services/api';

export default function ResultsPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDossier, setShowDossier] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getCaseResult(id),
      api.getCase(id)
    ])
      .then(([resResult, resCase]) => {
        if (resResult.success) {
          setResult(resResult);
          if (resCase.success) {
            setCaseData(resCase.case);
          }
          // If player solved it correctly, launch celebratory confetti!
          if (resResult.isSolved) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        } else {
          throw new Error(resResult.message || 'Could not retrieve case outcome.');
        }
      })
      .catch(err => {
        console.error('Error fetching result:', err);
        setError(err.response?.data?.message || err.message || 'Unable to load case results.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-300">
        <Loader2 className="w-10 h-10 text-amberGold-400 animate-spin mb-4" />
        <p className="font-mono text-sm">Unsealing Case Verdict #{id}...</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="max-w-xl mx-auto my-16 p-6 rounded-2xl bg-noir-900 border border-rose-500/30 text-center">
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-slate-100 mb-2">Verdict Locked</h3>
        <p className="text-sm text-slate-400 mb-6">{error || 'Unable to retrieve case results.'}</p>
        <Link to={`/case/${id}`} className="px-5 py-2.5 rounded-lg bg-noir-800 text-slate-200 text-xs font-mono">
          Return to Investigation
        </Link>
      </div>
    );
  }

  const isSolved = result.isSolved;
  const breakdown = result.scoreBreakdown || {
    basePoints: isSolved ? 150 : 0,
    clueBonus: (result.playerProgress?.discoveredCluesCount || 0) * 5,
    hintPenalty: (result.playerProgress?.hintsUsedCount || 0) * 10,
    total: result.score || 0
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in pb-20">
      
      {/* Verdict Header Banner */}
      <div className={`rounded-3xl p-8 sm:p-10 mb-8 border text-center relative overflow-hidden shadow-2xl ${
        isSolved
          ? 'bg-gradient-to-b from-amberGold-950/40 via-noir-900 to-noir-950 border-amberGold-500/50 shadow-amberGold-500/10'
          : 'bg-gradient-to-b from-rose-950/40 via-noir-900 to-noir-950 border-rose-500/50 shadow-rose-500/10'
      }`}>
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          {isSolved ? (
            <span className="flex items-center gap-1.5 text-amberGold-300 bg-amberGold-500/20 px-3 py-1 rounded-full border border-amberGold-500/40">
              <Sparkles className="w-4 h-4 text-amberGold-400" /> Case Solved
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-rose-300 bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/40">
              <ShieldAlert className="w-4 h-4 text-rose-400" /> Mistrial — Wrong Suspect
            </span>
          )}
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-100 tracking-tight mb-4">
          {result.verdict}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {isSolved
            ? 'Your sharp forensic deduction pierced through fabricated alibis. The criminal has been remanded into custody.'
            : 'The suspect you accused was innocent. The true mastermind exploited your oversight and slipped through the cracks.'}
        </p>

        {/* Large Score Card Display */}
        <div className="mt-8 inline-flex flex-col items-center justify-center px-8 py-4 rounded-2xl bg-noir-950/80 border border-noir-700/80 shadow-inner">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Final Detective Score</span>
          <span className={`font-mono font-black text-4xl sm:text-5xl mt-1 ${isSolved ? 'gold-gradient-text' : 'text-slate-200'}`}>
            {result.score} <span className="text-base text-slate-400 font-normal">PTS</span>
          </span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        {/* Culprit Reveal Card (2 columns) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 sm:p-8 border border-noir-700 shadow-xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 rounded-xl bg-noir-800 text-rose-400 border border-noir-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-slate-100">The Culprit Unmasked</h2>
              <p className="text-xs text-slate-400">Forensic Identity & Modus Operandi</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-noir-900/90 border border-rose-500/30 flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 font-display font-black text-xl flex items-center justify-center border border-rose-500/40">
                {result.culprit?.name?.charAt(0) || '!'}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block">Perpetrator</span>
                <h3 className="font-display font-bold text-lg text-slate-100">
                  {result.culprit?.name}
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              Guilty
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amberGold-400">
              Case Resolution Breakdown
            </h4>
            <div className="p-5 rounded-xl bg-noir-950/80 border border-noir-800 text-sm text-slate-200 leading-relaxed font-sans">
              {result.explanation}
            </div>
          </div>
        </div>

        {/* Detailed Score Breakdown (1 column) */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-noir-700 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 mb-6">
              <Award className="w-5 h-5 text-amberGold-400" />
              <h3 className="font-display font-bold text-lg text-slate-100">Scoring Audit</h3>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-noir-800">
                <span className="text-slate-400">Base Accusation Points</span>
                <span className={`font-bold ${breakdown.basePoints > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                  +{breakdown.basePoints} pts
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-noir-800">
                <div className="flex flex-col">
                  <span className="text-slate-400">Evidence Discovery Bonus</span>
                  <span className="text-[10px] text-slate-400">
                    {result.playerProgress?.discoveredCluesCount || 0} clues x 5 pts
                  </span>
                </div>
                <span className="font-bold text-amberGold-400">
                  +{breakdown.clueBonus} pts
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-noir-800">
                <div className="flex flex-col">
                  <span className="text-slate-400">Emergency Hints Used</span>
                  <span className="text-[10px] text-slate-400">
                    {result.playerProgress?.hintsUsedCount || 0} hints x -10 pts
                  </span>
                </div>
                <span className="font-bold text-rose-400">
                  -{breakdown.hintPenalty} pts
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 text-sm">
                <span className="font-bold text-slate-200">Total Computed Score</span>
                <span className="font-black text-emerald-400 text-base">
                  {result.score} pts
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-noir-800 space-y-3">
            <Link
              to="/create"
              id="btn-play-again"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amberGold-500 to-amberGold-600 hover:from-amberGold-400 hover:to-amberGold-500 text-noir-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amberGold-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Solve Another Mystery</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowDossier(!showDossier)}
              className="w-full py-2.5 px-4 rounded-xl bg-noir-800 hover:bg-noir-700 text-slate-300 font-mono text-xs transition-colors flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>{showDossier ? 'Hide Case Files' : 'Review Full Case Dossier'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Expandable Case Dossier Review */}
      {showDossier && caseData && (
        <div className="glass-panel rounded-2xl p-6 border border-noir-800 mt-6 animate-fade-in">
          <h3 className="font-display font-bold text-lg text-slate-100 mb-4">
            Archive Review: {caseData.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-amberGold-400 mb-2">Suspects</h4>
              <div className="space-y-2">
                {caseData.suspects.map(s => (
                  <div key={s.id} className="p-3 rounded-lg bg-noir-900 border border-noir-800 text-xs">
                    <span className="font-bold text-slate-200 block">{s.name} ({s.role})</span>
                    <span className="text-slate-400 italic">"{s.alibi}"</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyanGlow-400 mb-2">Discovered Clues</h4>
              <div className="space-y-2">
                {caseData.clues.map(c => (
                  <div key={c.id} className="p-3 rounded-lg bg-noir-900 border border-noir-800 text-xs">
                    <span className="font-bold text-slate-200 block">{c.title}</span>
                    <span className="text-slate-400">{c.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
