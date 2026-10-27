import React, { useState } from 'react';
import { User, ShieldAlert, Clock, AlertTriangle, Check, ExternalLink } from 'lucide-react';

export default function SuspectCard({ 
  suspect, 
  selectable = false, 
  selected = false, 
  onSelect,
  showAccuseAction = false,
  onQuickAccuse
}) {
  const [activeTab, setActiveTab] = useState('alibi'); // 'alibi' | 'motive'

  return (
    <div 
      id={`suspect-card-${suspect.id}`}
      className={`relative rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between ${
        selected
          ? 'bg-rose-950/20 border-rose-500 shadow-xl shadow-rose-500/10 ring-2 ring-rose-500/40'
          : 'bg-noir-900/60 border-noir-800 hover:border-noir-700 hover:bg-noir-900/90'
      }`}
    >
      <div>
        {/* Top Header with Avatar & Details */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative flex-shrink-0">
            {suspect.avatar ? (
              <img 
                src={suspect.avatar} 
                alt={suspect.name} 
                className="w-14 h-14 rounded-xl object-cover border border-noir-700 shadow-md"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              style={{ display: suspect.avatar ? 'none' : 'flex' }}
              className="w-14 h-14 rounded-xl bg-noir-800 border border-noir-700 items-center justify-center text-amberGold-400 font-display font-bold text-xl"
            >
              {suspect.name.charAt(0)}
            </div>
            
            {/* Tag */}
            <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-noir-900 text-slate-400 border border-noir-700">
              <User className="w-3 h-3" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-slate-100 text-lg leading-tight truncate">
              {suspect.name}
            </h3>
            <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-noir-800 text-amberGold-400 border border-noir-700/80 truncate max-w-full">
              {suspect.role}
            </span>
            <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {suspect.description}
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex rounded-lg bg-noir-950 p-1 mb-3 border border-noir-800/80">
          <button
            type="button"
            onClick={() => setActiveTab('alibi')}
            className={`flex-1 py-1.5 px-2 rounded text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'alibi'
                ? 'bg-noir-800 text-slate-100 shadow-sm border border-noir-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3 h-3 text-cyanGlow-400" />
            <span>Alibi</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('motive')}
            className={`flex-1 py-1.5 px-2 rounded text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'motive'
                ? 'bg-noir-800 text-slate-100 shadow-sm border border-noir-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>Motive</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-3.5 rounded-lg bg-noir-950/60 border border-noir-800/80 text-xs text-slate-300 min-h-[75px] leading-relaxed">
          {activeTab === 'alibi' ? (
            <div>
              <span className="font-semibold text-cyanGlow-400 font-mono block mb-1">Stated Alibi:</span>
              <p className="italic">"{suspect.alibi}"</p>
            </div>
          ) : (
            <div>
              <span className="font-semibold text-rose-400 font-mono block mb-1">Suspected Motive:</span>
              <p>{suspect.motive}</p>
            </div>
          )}
        </div>
      </div>

      {/* Select / Accuse Buttons */}
      {selectable && (
        <div className="mt-4 pt-3 border-t border-noir-800">
          <button
            type="button"
            id={`btn-select-suspect-${suspect.id}`}
            onClick={() => onSelect && onSelect(suspect.id)}
            className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
              selected
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                : 'bg-noir-800 hover:bg-noir-700 text-slate-200 border border-noir-700 hover:border-slate-500'
            }`}
          >
            {selected ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Selected as Prime Culprit</span>
              </>
            ) : (
              <span>Target for Accusation</span>
            )}
          </button>
        </div>
      )}

      {showAccuseAction && !selectable && (
        <div className="mt-4 pt-3 border-t border-noir-800">
          <button
            type="button"
            onClick={() => onQuickAccuse && onQuickAccuse(suspect.id)}
            className="w-full py-2 px-3 rounded-lg bg-noir-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-300 border border-noir-700 hover:border-rose-500/40 text-xs font-mono font-medium flex items-center justify-center space-x-1.5 transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Accuse in Lineup</span>
          </button>
        </div>
      )}
    </div>
  );
}
