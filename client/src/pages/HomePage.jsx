import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Compass, Search, Award, ArrowRight, Eye, AlertOctagon, History } from 'lucide-react';
import api from '../services/api';

export default function HomePage() {
  const [recentCases, setRecentCases] = useState([]);
  const [loadingCases, setLoadingCases] = useState(true);

  useEffect(() => {
    api.getRecentCases()
      .then(res => {
        if (res.cases) setRecentCases(res.cases);
      })
      .catch(err => console.log('Could not load recent cases:', err.message))
      .finally(() => setLoadingCases(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Hero Section */}
      <div className="relative text-center max-w-3xl mx-auto mb-20 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amberGold-500/10 border border-amberGold-500/30 text-amberGold-400 font-mono text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Detective Experience</span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-100 tracking-tight leading-[1.1] mb-6">
          Unravel the Mystery. <br />
          <span className="gold-gradient-text">Expose the Culprit.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mb-8 max-w-2xl mx-auto">
          Step into high-stakes, AI-orchestrated murder mysteries powered by Google Gemini. 
          Interrogate suspects, discover concealed forensic clues, request hints, and submit your final accusation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/create"
            id="hero-start-investigation-btn"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amberGold-500 to-amberGold-600 hover:from-amberGold-400 hover:to-amberGold-500 text-noir-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-amberGold-500/25 hover:shadow-amberGold-500/40 hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Start Investigation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <a
            href="#difficulty-section"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-noir-800/80 hover:bg-noir-700 text-slate-200 border border-noir-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            <span>Rules & Difficulty</span>
          </a>
        </div>
      </div>

      {/* Feature Pillar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        
        <div className="glass-card rounded-2xl p-6 border border-noir-800 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-amberGold-500/10 border border-amberGold-500/20 flex items-center justify-center text-amberGold-400 mb-5 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-slate-100 text-lg mb-2">Generative Gemini Cases</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every case is dynamically authored with airtight forensic logic, flawed alibis, and interwoven clues tailored to your chosen premise.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-noir-800 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-cyanGlow-500/10 border border-cyanGlow-500/20 flex items-center justify-center text-cyanGlow-400 mb-5 group-hover:scale-110 transition-transform">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-slate-100 text-lg mb-2">Sealed Backend Security</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No client-side spoilers. The culprit identity and solution explanation remain securely locked on the server until your verdict is submitted.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-noir-800 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-5 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-slate-100 text-lg mb-2">Forensic Scoring System</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Earn bonus points (+5) for each piece of evidence uncovered. Beware: relying on emergency hints imposes a 10-point detective penalty!
          </p>
        </div>

      </div>

      {/* Difficulty Breakdown Section */}
      <div id="difficulty-section" className="mb-24 pt-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-amberGold-400">Tactical Specifications</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-100 mt-1">Investigation Difficulty Tiers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Easy */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 relative">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                EASY
              </span>
              <span className="text-xs font-mono text-slate-400">100 Base Pts</span>
            </div>
            <h4 className="font-display font-bold text-slate-100 text-lg mb-2">Amateur Sleuth</h4>
            <ul className="space-y-2 text-xs font-mono text-slate-300 mb-6">
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Suspects in Lineup:</span>
                <span className="font-bold text-slate-100">3 Suspects</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Hidden Clues:</span>
                <span className="font-bold text-slate-100">5 Clues</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Available Hints:</span>
                <span className="font-bold text-slate-100">2 Hints</span>
              </li>
            </ul>
            <Link
              to="/create?difficulty=easy"
              className="block text-center w-full py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold text-xs transition-colors"
            >
              Select Easy Tier
            </Link>
          </div>

          {/* Medium */}
          <div className="glass-card rounded-2xl p-6 border border-amberGold-500/40 relative ring-1 ring-amberGold-500/20">
            <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-amberGold-500 text-noir-950 text-[10px] font-mono font-bold uppercase tracking-wider">
              Standard
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amberGold-500/10 text-amberGold-400 border border-amberGold-500/30">
                MEDIUM
              </span>
              <span className="text-xs font-mono text-slate-400">150 Base Pts</span>
            </div>
            <h4 className="font-display font-bold text-slate-100 text-lg mb-2">Lead Inspector</h4>
            <ul className="space-y-2 text-xs font-mono text-slate-300 mb-6">
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Suspects in Lineup:</span>
                <span className="font-bold text-slate-100">4 Suspects</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Hidden Clues:</span>
                <span className="font-bold text-slate-100">7 Clues</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Available Hints:</span>
                <span className="font-bold text-slate-100">3 Hints</span>
              </li>
            </ul>
            <Link
              to="/create?difficulty=medium"
              className="block text-center w-full py-2.5 rounded-lg bg-amberGold-500 hover:bg-amberGold-400 text-noir-950 font-bold text-xs transition-colors shadow-md shadow-amberGold-500/20"
            >
              Select Medium Tier
            </Link>
          </div>

          {/* Hard */}
          <div className="glass-card rounded-2xl p-6 border border-rose-500/30 relative">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                HARD
              </span>
              <span className="text-xs font-mono text-slate-400">200 Base Pts</span>
            </div>
            <h4 className="font-display font-bold text-slate-100 text-lg mb-2">Chief Detective</h4>
            <ul className="space-y-2 text-xs font-mono text-slate-300 mb-6">
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Suspects in Lineup:</span>
                <span className="font-bold text-slate-100">5 Suspects</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Hidden Clues:</span>
                <span className="font-bold text-slate-100">9 Clues</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Available Hints:</span>
                <span className="font-bold text-slate-100">3 Hints</span>
              </li>
            </ul>
            <Link
              to="/create?difficulty=hard"
              className="block text-center w-full py-2.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold text-xs transition-colors"
            >
              Select Hard Tier
            </Link>
          </div>

        </div>
      </div>

      {/* Recent Cases Section */}
      {recentCases.length > 0 && (
        <div className="border-t border-noir-800 pt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-amberGold-400" />
              <h3 className="font-display font-bold text-xl text-slate-100">Active Case Archives</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">{recentCases.length} Cases On Record</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentCases.slice(0, 6).map((c) => (
              <Link
                key={c.id || c._id}
                to={`/case/${c.id || c._id}`}
                className="glass-card rounded-xl p-5 border border-noir-800 hover:border-amberGold-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-noir-800 text-amberGold-400 border border-noir-700">
                      {c.difficulty}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {c.playerProgress?.completed ? 'Closed' : 'Active'}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-slate-100 text-base mb-1.5 group-hover:text-amberGold-300 transition-colors line-clamp-1">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {c.story?.synopsis}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-noir-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{c.clues?.filter(clue => clue.discovered).length || 0} / {c.clues?.length || 0} Clues</span>
                  <span className="text-amberGold-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Investigate &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
