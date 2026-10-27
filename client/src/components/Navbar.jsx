import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Sparkles, FolderArchive, Activity, PlusCircle } from 'lucide-react';
import api from '../services/api';

export default function Navbar() {
  const location = useLocation();
  const [serverOnline, setServerOnline] = useState(null);

  useEffect(() => {
    api.checkHealth()
      .then(() => setServerOnline(true))
      .catch(() => setServerOnline(false));
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-noir-700/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          id="nav-brand-logo"
          className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amberGold-600 via-amberGold-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amberGold-500/20 group-hover:shadow-amberGold-500/40 transition-all">
            <Shield className="w-5 h-5 text-noir-950 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-wider text-slate-100 flex items-center gap-1.5">
              AI MYSTERY <span className="text-amberGold-400 font-sans font-bold text-xs uppercase tracking-widest px-1.5 py-0.5 rounded bg-amberGold-500/10 border border-amberGold-500/20">ROOM</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight -mt-0.5">Powered by Google Gemini</span>
          </div>
        </Link>

        {/* Navigation Actions */}
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Link
            to="/create"
            id="nav-create-btn"
            className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              location.pathname === '/create'
                ? 'bg-amberGold-500 text-noir-950 shadow-md shadow-amberGold-500/25 font-bold'
                : 'text-slate-200 hover:text-white bg-noir-800/80 hover:bg-noir-700 border border-noir-600/50'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-amberGold-400" />
            <span>New Case</span>
          </Link>

          {/* Backend Health Badge */}
          <div 
            id="nav-server-status"
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-noir-800/80 border border-noir-700 text-[11px] font-mono text-slate-400"
            title={serverOnline === true ? "Backend API & Database Operational" : serverOnline === false ? "Connecting to Backend..." : "Checking API..."}
          >
            <span className={`w-2 h-2 rounded-full ${
              serverOnline === true 
                ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse' 
                : serverOnline === false 
                  ? 'bg-rose-400 animate-ping' 
                  : 'bg-amber-400'
            }`} />
            <span>{serverOnline ? 'AI Core Live' : 'Connecting'}</span>
          </div>
        </nav>

      </div>
    </header>
  );
}
