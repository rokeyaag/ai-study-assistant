import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Sparkles, Trophy, BookOpen, Gem, User } from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const BottomNavigation = () => {
  const { activeTab, setActiveTab, user, vaultNotes } = useApp();

  const tabs = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: LayoutDashboard,
      activeBg: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/30',
      activeText: 'text-amber-700',
      activeDot: 'bg-amber-500',
      hoverText: 'hover:text-amber-600 hover:bg-amber-50/70'
    },
    {
      id: 'tutor',
      label: 'AI Tutor',
      icon: Sparkles,
      isSpecial: true,
      activeBg: 'bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white shadow-md shadow-rose-500/30',
      activeText: 'text-rose-600',
      activeDot: 'bg-rose-500',
      hoverText: 'hover:text-rose-600 hover:bg-rose-50/70'
    },
    {
      id: 'quiz',
      label: 'Quiz Arena',
      icon: Trophy,
      badge: '+15',
      activeBg: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30',
      activeText: 'text-orange-600',
      activeDot: 'bg-orange-500',
      hoverText: 'hover:text-orange-600 hover:bg-orange-50/70'
    },
    {
      id: 'vault',
      label: 'Vault',
      icon: BookOpen,
      count: vaultNotes.length,
      activeBg: 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/30',
      activeText: 'text-indigo-600',
      activeDot: 'bg-indigo-500',
      hoverText: 'hover:text-indigo-600 hover:bg-indigo-50/70'
    },
    {
      id: 'store',
      label: 'Store',
      icon: Gem,
      isPro: user?.subscription?.tier === 'pro',
      activeBg: 'bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white shadow-md shadow-purple-600/30',
      activeText: 'text-purple-600',
      activeDot: 'bg-purple-600',
      hoverText: 'hover:text-purple-600 hover:bg-purple-50/70'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      activeBg: 'bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/30',
      activeText: 'text-teal-600',
      activeDot: 'bg-teal-500',
      hoverText: 'hover:text-teal-600 hover:bg-teal-50/70'
    }
  ];

  return (
    <nav className="w-full bg-white/95 backdrop-blur-2xl border-t border-slate-200/80 px-1 sm:px-2 py-1.5 sm:py-2 shadow-[0_-4px_25px_rgba(0,0,0,0.03)]">
      <div className="max-w-lg mx-auto grid grid-cols-6 items-center justify-items-center gap-0.5 sm:gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playWaterDrop();
                setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center w-full py-1.5 px-1 rounded-2xl transition-all duration-300 group cursor-pointer active:scale-95 ${
                isActive
                  ? `${tab.activeText}`
                  : `text-slate-400 ${tab.hoverText}`
              }`}
            >
              {/* Icon Container with vibrant active liquid pill transformation */}
              <div className={`relative flex items-center justify-center w-11 h-8 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? `${tab.activeBg} scale-105 animate-water-plop` 
                  : tab.isSpecial 
                    ? 'text-rose-500 bg-rose-50/70' 
                    : 'text-slate-500 group-hover:scale-105 group-hover:bg-slate-100/80'
              }`}>
                <Icon className={`w-5 h-5 transition-transform duration-200 ${
                  isActive 
                    ? 'stroke-[2.4] text-white' 
                    : tab.isSpecial 
                      ? 'stroke-[2.2] text-rose-500' 
                      : 'stroke-[1.8]'
                }`} />

                {/* Badge count for Vault */}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`absolute -top-1.5 -right-1 px-1.5 py-0.2 text-[9px] font-black rounded-full min-w-[15px] text-center border-2 shadow-sm transition-colors ${
                    isActive ? 'bg-white text-indigo-700 border-indigo-600' : 'bg-rose-600 text-white border-white'
                  }`}>
                    {tab.count}
                  </span>
                )}

                {/* Badge reward for Quiz */}
                {tab.badge && (
                  <span className={`absolute -top-2 -right-3.5 px-1.5 py-0.2 text-[8px] font-black rounded-full border shadow-sm transition-colors ${
                    isActive ? 'bg-white text-orange-700 border-orange-500' : 'bg-amber-400 text-slate-950 border-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label with dynamic active color */}
              <span className={`text-[10px] tracking-tight mt-1 transition-all duration-200 ${
                isActive 
                  ? `font-black ${tab.activeText} scale-105` 
                  : 'font-medium text-slate-500 group-hover:text-slate-800'
              }`}>
                {tab.label}
              </span>

              {/* Active Indicator Water Droplet Pill */}
              {isActive && (
                <span className={`w-2 h-1 rounded-full ${tab.activeDot} mt-0.5 shadow-sm animate-pulse-soft`}></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
