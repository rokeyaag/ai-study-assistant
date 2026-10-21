import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Coins, Sparkles, Volume2, VolumeX, Smartphone, Monitor } from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const Header = () => {
  const { user, soundEnabled, toggleAudioSound, setActiveTab, isMobileFrame, setIsMobileFrame, isCompact, setIsProfileModalOpen } = useApp();

  const isPro = user.subscription.tier === 'pro';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 px-2 sm:px-4 py-2 sm:py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
      {/* Ambient Animated Flowing Header Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50/40 via-amber-50/50 via-white to-rose-50/30 bg-[length:200%_200%] animate-gradient-shift pointer-events-none"></div>
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl animate-float-1 pointer-events-none"></div>
      <div className="absolute -top-12 right-1/4 w-48 h-48 bg-rose-500/15 rounded-full blur-2xl animate-float-2 pointer-events-none"></div>

      {/* Running High-Tech Horizontal Energy Beam */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden bg-slate-200/50 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-amber-400/25 to-rose-500/20"></div>
        <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-amber-400 to-rose-500 animate-run-line shadow-[0_0_12px_#f59e0b,0_0_6px_#f43f5e]"></div>
        <div className="absolute top-0 bottom-0 w-1/6 bg-gradient-to-r from-transparent via-white to-transparent animate-run-spark"></div>
      </div>

      <div className="max-w-4xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3 relative z-10 w-full">
        {/* Brand / Logo Group */}
        <div 
          onClick={() => {
            soundManager.playClick();
            setActiveTab('dashboard');
          }}
          className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group min-w-0 shrink"
        >
          {/* Mascot Logo Icon with Periodic 360 Spin & Playful Move */}
          <div className="relative group-hover:scale-110 transition-transform duration-300 shrink-0 flex items-center justify-center">
            {/* Ambient Glowing Flare that lights up when spinning */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-400/50 via-rose-500/40 to-amber-300/50 blur-[5px] animate-halo-periodic pointer-events-none"></div>

            {/* Periodic Moving/Spinning Mascot Logo */}
            <img 
              src="/logo.png" 
              alt="AI Study Assistant Logo" 
              className="relative w-7 h-7 sm:w-9 sm:h-9 object-contain drop-shadow-md animate-logo-periodic will-change-transform"
            />
          </div>

          <div className="min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <h1 className="font-black text-xs sm:text-sm md:text-base tracking-tight text-slate-900 whitespace-nowrap">
                AI Study <span className="text-amber-600 font-extrabold">Assistant</span>
              </h1>
              {isPro ? (
                <span className="px-1 py-0.2 sm:px-1.5 sm:py-0.5 text-[8px] sm:text-[9px] font-black uppercase rounded bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-xs flex items-center gap-0.5 shrink-0 animate-pulse-soft">
                  <Sparkles className="w-2 h-2" /> PRO
                </span>
              ) : (
                <span className="px-1 py-0.2 sm:px-1.5 sm:py-0.5 text-[8px] sm:text-[9px] font-bold rounded bg-amber-50 text-amber-700 border border-amber-300 shadow-2xs shrink-0">
                  TRIAL
                </span>
              )}
            </div>

            {/* Subtitle Tagline Pill: Visible only on wide desktop view */}
            {!isCompact && (
              <div className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 mt-0.5 rounded-full bg-gradient-to-r from-amber-100/80 via-rose-50/90 to-amber-100/70 border border-amber-200/80 shadow-2xs relative overflow-hidden group/caption animate-pulse-soft">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-shimmer-sweep pointer-events-none"></div>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                </span>
                <span className="text-[10px] font-bold bg-gradient-to-r from-slate-800 via-rose-700 to-amber-800 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
                  Intelligent STEM Learning & Revision Engine
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Gamified Status Badges & Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Daily Streak Badge */}
          <div 
            title="Daily Study Streak"
            className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] sm:text-xs font-black shadow-2xs shrink-0"
          >
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-600 animate-pulse fill-rose-500 shrink-0" />
            <span className="text-slate-900">{user.streak}</span>
            {!isCompact && (
              <span className="hidden sm:inline font-bold text-rose-700 text-[11px]">Days</span>
            )}
          </div>

          {/* Points Wallet Badge */}
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('store');
            }}
            title="Reward Points Wallet (Click to Redeem Pro)"
            className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-[11px] sm:text-xs font-black hover:scale-105 transition-all shadow-2xs shrink-0 cursor-pointer active:scale-95"
          >
            <Coins className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 fill-amber-400 animate-spin-slow shrink-0" />
            <span className="text-slate-900">{user.points}</span>
            {!isCompact && (
              <span className="hidden sm:inline font-bold text-amber-700 text-[11px]">Pts</span>
            )}
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleAudioSound}
            title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
            className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg sm:rounded-xl border transition-all shrink-0 cursor-pointer ${
              soundEnabled
                ? 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </button>

          {/* Student Profile Avatar Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsProfileModalOpen(true);
            }}
            title={`View & Edit Profile (${user.name})`}
            className="relative rounded-full ring-2 ring-amber-400 hover:ring-rose-500 hover:scale-105 transition-all shrink-0 cursor-pointer p-0.5 active:scale-95"
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full object-cover" 
            />
            {isPro && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 ring-1 ring-white"></span>
            )}
          </button>

          {/* Device Frame Toggle (Shown ONLY on large desktop screen when NOT in compact mode) */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsMobileFrame(!isMobileFrame);
            }}
            title={isMobileFrame ? "Expand to Full Web View" : "Switch to Mobile Device View"}
            className="hidden lg:flex w-7 h-7 sm:w-8 sm:h-8 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-300 transition-all shrink-0 cursor-pointer"
          >
            {isMobileFrame ? <Monitor className="w-3.5 h-3.5 text-rose-600" /> : <Smartphone className="w-3.5 h-3.5 text-amber-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
