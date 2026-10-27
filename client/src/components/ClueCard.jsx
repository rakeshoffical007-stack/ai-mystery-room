import React, { useState } from 'react';
import { Search, CheckCircle2, MapPin, Sparkles, AlertCircle, FileText, Fingerprint, Lock } from 'lucide-react';

export default function ClueCard({ clue, onDiscover, disabled = false }) {
  const [loading, setLoading] = useState(false);

  const handleDiscover = async () => {
    if (clue.discovered || disabled || loading) return;
    setLoading(true);
    try {
      await onDiscover(clue.id);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'digital':
        return <Sparkles className="w-3.5 h-3.5 text-cyanGlow-400" />;
      case 'forensic':
        return <Fingerprint className="w-3.5 h-3.5 text-rose-400" />;
      case 'document':
        return <FileText className="w-3.5 h-3.5 text-amberGold-400" />;
      default:
        return <Search className="w-3.5 h-3.5 text-amberGold-400" />;
    }
  };

  return (
    <div 
      id={`clue-card-${clue.id}`}
      className={`relative rounded-xl p-5 transition-all duration-300 border ${
        clue.discovered
          ? 'bg-noir-900/90 border-amberGold-500/40 shadow-lg shadow-amberGold-500/5 ring-1 ring-amberGold-500/20'
          : 'bg-noir-900/40 border-noir-800 hover:border-noir-700 hover:bg-noir-900/60'
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 rounded-lg bg-noir-800 border border-noir-700">
            {getTypeIcon(clue.type)}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            {clue.type || 'Physical Evidence'}
          </span>
        </div>

        {clue.discovered ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Discovered (+5)
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-noir-800 text-slate-400 border border-noir-700">
            <Lock className="w-3 h-3 text-slate-400" /> Hidden
          </span>
        )}
      </div>

      {/* Clue Title */}
      <h4 className="font-display font-semibold text-slate-100 text-base mb-1.5">
        {clue.title}
      </h4>

      {/* Location */}
      <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-3 font-mono">
        <MapPin className="w-3.5 h-3.5 text-amberGold-400/80" />
        <span>Found in: {clue.location}</span>
      </div>

      {/* Description / Discovery State */}
      {clue.discovered ? (
        <div className="p-3 rounded-lg bg-noir-950/60 border border-noir-800/80 text-sm text-slate-300 leading-relaxed font-sans animate-fade-in">
          {clue.description}
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-xs text-slate-400 mb-3 italic">
            This piece of evidence has not been forensically analyzed yet.
          </p>
          <button
            id={`btn-discover-${clue.id}`}
            onClick={handleDiscover}
            disabled={disabled || loading}
            className="w-full py-2.5 px-4 rounded-lg bg-amberGold-500 hover:bg-amberGold-400 disabled:opacity-50 text-noir-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md shadow-amberGold-500/20 hover:shadow-amberGold-500/40"
          >
            <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{loading ? 'Inspecting Scene...' : 'Inspect & Discover Clue (+5 pts)'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
