import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles, Shield, Compass, AlertCircle, Loader2, ArrowRight, BookOpen, Layers } from 'lucide-react';
import api from '../services/api';

const PRESET_THEMES = [
  {
    name: 'Victorian Manor Heist',
    icon: '🏰',
    text: 'A priceless emerald necklace disappears from the duke’s secured safe during an intimate midnight dinner with four aristocratic guests.'
  },
  {
    name: 'Cyberpunk Lab Espionage',
    icon: '⚡',
    text: 'The lead quantum AI architect is found incapacitated in cleanroom 4, and the encrypted sentient drive prototype has been wiped clean.'
  },
  {
    name: 'Alpine Express Poisoning',
    icon: '🚂',
    text: 'A reclusive billionaire collapses in their private first-class cabin after consuming rare vintage wine while traversing a snowbound mountain pass.'
  },
  {
    name: 'Metropolitan Art Gallery',
    icon: '🎨',
    text: 'During an unexpected 3-minute gallery blackout, a Renaissance masterpiece was neatly cut from its frame and replaced with a forged canvas.'
  },
  {
    name: 'Luxury Yacht Mystery',
    icon: '🛥️',
    text: 'An offshore tech investor vanishes from their private yacht 20 miles off the Monaco coastline with only five prominent business partners on board.'
  }
];

const LOADING_STEPS = [
  'Querying Google Gemini Neural Core...',
  'Constructing crime scene forensics...',
  'Fabricating suspect alibis and motives...',
  'Scattering logical forensic clues across the scene...',
  'Locking private solution in backend vault...',
  'Dispatching detective credentials...'
];

export default function CreateMysteryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [premise, setPremise] = useState(
    'A priceless emerald necklace disappears from the duke’s secured safe during an intimate midnight dinner with aristocratic guests.'
  );
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || 'medium');
  const [loading, setLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [error, setError] = useState(null);

  // Cycle loading messages during AI generation
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStepIndex(prev => (prev + 1) % LOADING_STEPS.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!premise.trim()) {
      setError('Please provide a mystery premise or select one of the suggested themes.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.createCase({
        premise: premise.trim(),
        difficulty
      });

      if (res.success && res.case) {
        const caseId = res.case.id || res.case._id;
        navigate(`/case/${caseId}`);
      } else {
        throw new Error(res.message || 'Failed to initialize mystery case.');
      }
    } catch (err) {
      console.error('Case generation error:', err);
      setError(err.response?.data?.message || err.message || 'An error occurred while generating the mystery.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 animate-fade-in text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl bg-noir-900 border border-amberGold-500/40 flex items-center justify-center shadow-2xl shadow-amberGold-500/20">
            <Loader2 className="w-10 h-10 text-amberGold-400 animate-spin" />
          </div>
          <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-amberGold-500 text-noir-950 text-[10px] font-mono font-bold uppercase animate-pulse">
            AI Active
          </span>
        </div>

        <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-100 mb-3">
          Authoring Case Files
        </h2>
        
        <p className="font-mono text-sm text-amberGold-400 max-w-md h-8 transition-all animate-pulse">
          {LOADING_STEPS[loadingStepIndex]}
        </p>

        <p className="text-xs text-slate-400 mt-6 max-w-sm">
          Please wait while Gemini creates airtight clues and verifies alibi consistency...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amberGold-500/10 border border-amberGold-500/30 text-amberGold-400 font-mono text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Case Architect</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100 tracking-tight">
          Create Your Mystery
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Design your custom premise or choose a classic theme. Gemini will weave suspects, motives, clues, and an airtight secret solution.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
          <div>
            <span className="font-bold block">Generation Error:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Theme Preset Chips */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2.5">
            Quick Theme Templates
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {PRESET_THEMES.map((theme, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setPremise(theme.text)}
                className="p-3 rounded-xl bg-noir-900/80 hover:bg-noir-800 border border-noir-800 hover:border-amberGold-500/40 text-left transition-all group flex flex-col justify-between"
              >
                <span className="text-xl mb-1.5">{theme.icon}</span>
                <span className="font-display font-semibold text-xs text-slate-200 group-hover:text-amberGold-300 transition-colors line-clamp-2">
                  {theme.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Premise Textarea */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="premise-input" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Mystery Premise & Crime Scene Details
            </label>
            <span className="text-[11px] font-mono text-slate-400">Describe setting, victim, or missing item</span>
          </div>
          <textarea
            id="premise-input"
            rows={4}
            value={premise}
            onChange={(e) => setPremise(e.target.value)}
            placeholder="e.g. A high-stakes heist at a midnight gala in an ancient Venetian palazzo..."
            className="w-full px-4 py-3.5 rounded-xl bg-noir-900/90 border border-noir-700/80 focus:border-amberGold-500 focus:ring-1 focus:ring-amberGold-500 text-slate-100 placeholder-slate-400 text-sm leading-relaxed outline-none transition-all"
            required
          />
        </div>

        {/* Difficulty Selection */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
            Select Investigation Difficulty
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Easy Option */}
            <label
              id="difficulty-option-easy"
              className={`cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between ${
                difficulty === 'easy'
                  ? 'bg-emerald-950/20 border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'bg-noir-900/60 border-noir-800 hover:border-noir-700'
              }`}
            >
              <input
                type="radio"
                name="difficulty"
                value="easy"
                checked={difficulty === 'easy'}
                onChange={(e) => setDifficulty(e.target.value)}
                className="sr-only"
              />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    EASY
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">100 Base Pts</span>
                </div>
                <h4 className="font-display font-bold text-slate-100 text-base mb-1">Amateur Sleuth</h4>
                <p className="text-xs text-slate-400">Straightforward case with distinct clues.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-noir-800/80 text-[11px] font-mono text-slate-300 space-y-1">
                <div>• 3 Suspects</div>
                <div>• 5 Forensic Clues</div>
                <div>• 2 Progressive Hints</div>
              </div>
            </label>

            {/* Medium Option */}
            <label
              id="difficulty-option-medium"
              className={`cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between ${
                difficulty === 'medium'
                  ? 'bg-amberGold-950/20 border-amberGold-500 ring-2 ring-amberGold-500/30'
                  : 'bg-noir-900/60 border-noir-800 hover:border-noir-700'
              }`}
            >
              <input
                type="radio"
                name="difficulty"
                value="medium"
                checked={difficulty === 'medium'}
                onChange={(e) => setDifficulty(e.target.value)}
                className="sr-only"
              />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amberGold-500/10 text-amberGold-400 border border-amberGold-500/30">
                    MEDIUM
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">150 Base Pts</span>
                </div>
                <h4 className="font-display font-bold text-slate-100 text-base mb-1">Lead Inspector</h4>
                <p className="text-xs text-slate-400">Balanced puzzle with red herrings.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-noir-800/80 text-[11px] font-mono text-slate-300 space-y-1">
                <div>• 4 Suspects</div>
                <div>• 7 Forensic Clues</div>
                <div>• 3 Progressive Hints</div>
              </div>
            </label>

            {/* Hard Option */}
            <label
              id="difficulty-option-hard"
              className={`cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between ${
                difficulty === 'hard'
                  ? 'bg-rose-950/20 border-rose-500 ring-2 ring-rose-500/30'
                  : 'bg-noir-900/60 border-noir-800 hover:border-noir-700'
              }`}
            >
              <input
                type="radio"
                name="difficulty"
                value="hard"
                checked={difficulty === 'hard'}
                onChange={(e) => setDifficulty(e.target.value)}
                className="sr-only"
              />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    HARD
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">200 Base Pts</span>
                </div>
                <h4 className="font-display font-bold text-slate-100 text-base mb-1">Chief Detective</h4>
                <p className="text-xs text-slate-400">Intricate web of contradictory testimonies.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-noir-800/80 text-[11px] font-mono text-slate-300 space-y-1">
                <div>• 5 Suspects</div>
                <div>• 9 Forensic Clues</div>
                <div>• 3 Progressive Hints</div>
              </div>
            </label>

          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            id="generate-mystery-submit-btn"
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amberGold-500 to-amberGold-600 hover:from-amberGold-400 hover:to-amberGold-500 text-noir-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xl shadow-amberGold-500/25 hover:shadow-amberGold-500/40"
          >
            <Sparkles className="w-4 h-4 stroke-[2.5]" />
            <span>Generate Mystery with Gemini</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
}
