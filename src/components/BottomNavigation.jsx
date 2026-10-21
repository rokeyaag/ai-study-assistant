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
      isSpecial: true
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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-slate-200/80 px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-items-center">
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
              className={`relative flex flex-col items-center justify-center w-full py-1.5 px-1 rounded-2xl transition-all duration-200 group ${
                isActive
                  ? 'text-amber-600'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {/* Icon Container with subtle active pill effect */}
              <div className={`relative flex items-center justify-center w-10 h-7 rounded-full transition-all duration-200 ${
                isActive 
                  ? 'bg-amber-500/10 text-amber-600 scale-105' 
                  : tab.isSpecial 
                    ? 'text-rose-500 hover:bg-rose-50/60' 
                    : 'group-hover:scale-105'
              }`}>
                <Icon className={`w-5 h-5 transition-transform ${
                  isActive 
                    ? 'stroke-[2.5] text-amber-600' 
                    : tab.isSpecial 
                      ? 'stroke-[2.2] text-rose-500' 
                      : 'stroke-[1.8]'
                }`} />

                {/* Badge count for Vault */}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[9px] font-black rounded-full bg-rose-600 text-white min-w-[15px] text-center border-2 border-white shadow-sm">
                    {tab.count}
                  </span>
                )}

                {/* Badge reward for Quiz */}
                {tab.badge && (
                  <span className="absolute -top-2 -right-3.5 px-1.5 py-0.2 text-[8px] font-black rounded-full bg-amber-400 text-slate-950 border border-white shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] font-medium tracking-tight mt-1 transition-colors ${
                isActive 
                  ? 'font-bold text-amber-700' 
                  : 'text-slate-500 group-hover:text-slate-800'
              }`}>
                {tab.label}
              </span>

              {/* Active Indicator dot */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-0.5 shadow-sm shadow-amber-500/50"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
