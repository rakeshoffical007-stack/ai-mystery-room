import React from 'react';
import { ShieldAlert, Cpu, Award, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-noir-800 bg-noir-900/60 backdrop-blur text-slate-400 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-noir-800 border border-noir-700 text-amberGold-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-slate-200 text-sm tracking-wider">AI MYSTERY ROOM</h4>
            <p className="text-xs text-slate-400">Generative Detective Whodunit • Powered by Google Gemini</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyanGlow-400" />
            <span>Strict Backend Security</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amberGold-400" />
            <span>Dynamic Scoring Engine</span>
          </div>
          <a 
            href="https://bit.ly/ai-mystery-room-sub-form" 
            target="_blank" 
            rel="noreferrer"
            className="text-amberGold-400 hover:text-amberGold-300 flex items-center gap-1 transition-colors"
          >
            <span>Submission Form</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </footer>
  );
}
