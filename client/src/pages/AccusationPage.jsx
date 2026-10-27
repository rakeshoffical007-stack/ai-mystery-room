import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Check, AlertTriangle, Loader2, Scale, Lock } from 'lucide-react';
import api from '../services/api';
import SuspectCard from '../components/SuspectCard';

export default function AccusationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [caseData, setCaseData] = useState(null);
  const [selectedSuspectId, setSelectedSuspectId] = useState(searchParams.get('target') || null);
  const [deductionNotes, setDeductionNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getCase(id)
      .then(res => {
        if (res.success && res.case) {
          setCaseData(res.case);
          if (res.case.playerProgress?.completed) {
            navigate(`/case/${id}/result`);
          }
          if (!selectedSuspectId && res.case.suspects.length > 0) {
            setSelectedSuspectId(res.case.suspects[0].id);
          }
        }
      })
      .catch(err => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAccusationSubmit = async () => {
    if (!selectedSuspectId) {
      alert('Please select a prime suspect from the lineup.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitAccusation(id, selectedSuspectId);
      if (res.success) {
        navigate(`/case/${id}/result`);
      } else {
        throw new Error(res.message || 'Failed to submit accusation');
      }
    } catch (err) {
      console.error('Accusation error:', err);
      alert('Error submitting accusation: ' + (err.response?.data?.message || err.message));
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-300">
        <Loader2 className="w-10 h-10 text-rose-500 animate-spin mb-4" />
        <p className="font-mono text-sm">Convening Accusation Tribunal #{id}...</p>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="max-w-xl mx-auto my-16 p-6 rounded-2xl bg-noir-900 border border-rose-500/30 text-center">
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-slate-100 mb-2">Error Loading Lineup</h3>
        <p className="text-sm text-slate-400 mb-6">{error || 'Case not found'}</p>
        <Link to={`/case/${id}`} className="px-5 py-2.5 rounded-lg bg-noir-800 text-slate-200 text-xs font-mono">
          Return to Investigation
        </Link>
      </div>
    );
  }

  const selectedSuspect = caseData.suspects.find(s => s.id === selectedSuspectId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in pb-20">
      
      {/* Back button */}
      <div className="mb-6">
        <Link
          to={`/case/${id}`}
          className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>&larr; Return to Evidence Board</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs font-semibold mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>The Moment of Truth</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100 tracking-tight">
          Formal Accusation Lineup
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Select the prime suspect responsible for the crime. Your verdict is final and will be validated against the sealed backend evidence.
        </p>
      </div>

      {/* Suspect Lineup */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Step 1: Choose the Culprit
          </span>
          <span className="text-xs font-mono text-rose-400">
            {selectedSuspect ? `Target: ${selectedSuspect.name}` : 'No suspect chosen'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseData.suspects.map(suspect => (
            <SuspectCard
              key={suspect.id}
              suspect={suspect}
              selectable={true}
              selected={selectedSuspectId === suspect.id}
              onSelect={(suspectId) => setSelectedSuspectId(suspectId)}
            />
          ))}
        </div>
      </div>

      {/* Detective Deduction Notes (Optional) */}
      <div className="glass-card rounded-2xl p-6 border border-noir-800 mb-8 max-w-3xl mx-auto">
        <label htmlFor="deduction-notes" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
          Step 2: Detective Deduction Log (Optional)
        </label>
        <textarea
          id="deduction-notes"
          rows={3}
          value={deductionNotes}
          onChange={(e) => setDeductionNotes(e.target.value)}
          placeholder="Summarize the contradictory alibi or forensic clue that cracked the case..."
          className="w-full px-4 py-3 rounded-xl bg-noir-950/80 border border-noir-700/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-slate-100 placeholder-slate-400 text-sm outline-none transition-all"
        />
      </div>

      {/* Submit Trigger */}
      <div className="max-w-md mx-auto text-center">
        <button
          type="button"
          id="btn-lock-in-verdict"
          disabled={!selectedSuspectId || submitting}
          onClick={() => setConfirmModal(true)}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 disabled:opacity-50 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50"
        >
          <Lock className="w-4 h-4 stroke-[2.5]" />
          <span>Lock In Final Accusation</span>
        </button>
        <p className="text-[11px] font-mono text-slate-400 mt-2">
          Validation is performed on the server. The verdict cannot be undone.
        </p>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && selectedSuspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/85 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full glass-panel rounded-2xl p-6 border border-rose-500/40 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h3 className="font-display font-bold text-xl text-slate-100 mb-2">
              Confirm Arrest Warrant
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              You are formally naming <strong className="text-rose-400 font-bold">{selectedSuspect.name}</strong> ({selectedSuspect.role}) as the perpetrator of this crime.
            </p>

            <div className="p-3 rounded-lg bg-noir-950/80 border border-noir-800 text-xs text-slate-400 mb-6 font-mono">
              <div>• Base points if correct: +{caseData.difficulty === 'easy' ? 100 : caseData.difficulty === 'hard' ? 200 : 150}</div>
              <div>• If incorrect: 0 base points (Mistrial)</div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setConfirmModal(false)}
                className="px-4 py-2.5 rounded-lg bg-noir-800 hover:bg-noir-700 text-slate-300 text-xs font-mono transition-colors"
              >
                Re-evaluate Evidence
              </button>
              <button
                type="button"
                id="btn-confirm-accusation-submit"
                disabled={submitting}
                onClick={handleAccusationSubmit}
                className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-lg shadow-rose-600/30"
              >
                {submitting ? 'Rendering Verdict...' : 'Execute Warrant'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
