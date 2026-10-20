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
      badge: '+15 Pts'
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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-amber-600 font-extrabold scale-105'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              } ${tab.highlight && !isActive ? 'text-amber-700' : ''}`}
            >
              {/* Highlighted Center AI Scanner Button (Gradient Glow) */}
              {tab.highlight && (
                <div className={`absolute -top-3.5 w-11 h-11 rounded-full bg-gradient-to-tr from-rose-600 via-amber-500 to-amber-400 p-0.5 shadow-lg shadow-rose-500/25 flex items-center justify-center ${
                  isActive ? 'ring-2 ring-amber-400 ring-offset-2 scale-110' : ''
                }`}>
                  <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-400 animate-pulse" />
                  </div>
                </div>
              )}

              {/* Regular Tab Icon */}
              {!tab.highlight && (
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5] text-amber-600' : 'stroke-2'}`} />
                  
                  {/* Badge count for Vault */}
                  {tab.count !== undefined && (
                    <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 text-[9px] font-black rounded-full bg-rose-600 text-white min-w-[14px] text-center border border-white shadow-sm">
                      {tab.count}
                    </span>
                  )}

                  {/* Badge reward for Quiz */}
                  {tab.badge && (
                    <span className="absolute -top-2 -right-3 px-1 py-0.2 text-[8px] font-black rounded-full bg-amber-400 text-slate-950 border border-white animate-bounce shadow-sm">
                      {tab.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Label */}
              <span className={`text-[11px] mt-1 tracking-tight ${tab.highlight ? 'mt-4 font-extrabold text-amber-600' : ''}`}>
                {tab.label}
              </span>

              {/* Active Indicator dot */}
              {isActive && !tab.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-0.5 shadow-sm shadow-amber-500"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
