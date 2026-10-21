import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Sparkles, Trophy, BookOpen, Gem } from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const BottomNavigation = () => {
  const { activeTab, setActiveTab, user, vaultNotes } = useApp();

  const tabs = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: LayoutDashboard
    },
    {
      id: 'tutor',
      label: 'AI Tutor',
      icon: Sparkles,
      highlight: true
    },
    {
      id: 'quiz',
      label: 'Quiz Arena',
      icon: Trophy,
      badge: '+15'
    },
    {
      id: 'vault',
      label: 'Vault',
      icon: BookOpen,
      count: vaultNotes.length
    },
    {
      id: 'store',
      label: 'Pro Store',
      icon: Gem,
      isPro: user.subscription.tier === 'pro'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-3 py-1.5 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      <div className="max-w-md mx-auto flex items-end justify-around pb-0.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.highlight) {
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.id);
                }}
                className="relative -top-4 flex flex-col items-center group focus:outline-none px-2"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-500 to-amber-400 p-0.5 shadow-xl shadow-rose-500/30 group-hover:scale-105 transition-all duration-300 ${
                  isActive ? 'ring-4 ring-amber-400/40 scale-105' : ''
                }`}>
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-400 animate-pulse" />
                  </div>
                </div>
                <span className={`text-[10px] tracking-tight mt-1 font-bold transition-colors ${
                  isActive ? 'text-amber-600 font-black' : 'text-slate-600 group-hover:text-slate-900'
                }`}>
                  {tab.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-0.5 shadow-sm"></span>
                )}
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-amber-600 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5] text-amber-600 scale-110' : 'stroke-2'}`} />
                
                {/* Badge count for Vault */}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 text-[9px] font-black rounded-full bg-rose-600 text-white min-w-[15px] text-center shadow-sm">
                    {tab.count}
                  </span>
                )}

                {/* Badge reward for Quiz */}
                {tab.badge && (
                  <span className="absolute -top-2 -right-3.5 px-1.5 py-0.2 text-[8px] font-extrabold rounded-full bg-amber-400 text-slate-950 shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className="text-[11px] mt-1 tracking-tight">
                {tab.label}
              </span>

              {/* Active Indicator dot */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-0.5 shadow-sm"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
