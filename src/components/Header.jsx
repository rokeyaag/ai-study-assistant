import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Coins, Sparkles, Volume2, VolumeX, Smartphone, Monitor } from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const Header = ({ isMobileFrame, setIsMobileFrame }) => {
  const { user, soundEnabled, toggleAudioSound, setActiveTab } = useApp();

  const isPro = user.subscription.tier === 'pro';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-2xl border-b border-slate-200/80 px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
      {/* Ambient Animated Flowing Header Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50/40 via-amber-50/50 via-white to-rose-50/30 bg-[length:200%_200%] animate-gradient-shift pointer-events-none"></div>
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl animate-float-1 pointer-events-none"></div>
      <div className="absolute -top-12 right-1/4 w-48 h-48 bg-rose-500/15 rounded-full blur-2xl animate-float-2 pointer-events-none"></div>

      {/* Running High-Tech Horizontal Energy Beam */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden bg-slate-200/50 z-20 pointer-events-none">
        {/* Subtle Ambient Underlying Gradient Track */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-amber-400/25 to-rose-500/20"></div>

        {/* Running Glowing Neon Laser Beam */}
        <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-amber-400 to-rose-500 animate-run-line shadow-[0_0_12px_#f59e0b,0_0_6px_#f43f5e]"></div>

        {/* Running White Spark Core */}
        <div className="absolute top-0 bottom-0 w-1/6 bg-gradient-to-r from-transparent via-white to-transparent animate-run-spark"></div>
      </div>

      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 relative z-10">
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            soundManager.playClick();
            setActiveTab('dashboard');
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* Logo Icon with Glowing Accent Ring */}
          <div className="relative group-hover:scale-105 transition-transform flex-shrink-0">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 opacity-60 blur-xs group-hover:opacity-100 transition duration-300"></div>
            <img 
              src="/logo.png" 
              alt="AI Study Assistant Logo" 
              className="relative w-11 h-11 rounded-xl object-contain shadow-md shadow-rose-500/20 bg-slate-900/5 p-0.5 border border-amber-400/70"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-1">
                AI Study <span className="text-amber-600 font-extrabold">Assistant</span>
              </h1>
              {isPro ? (
                <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded-md bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-sm flex items-center gap-0.5 animate-pulse-soft">
                  <Sparkles className="w-2.5 h-2.5" /> PRO
                </span>
              ) : (
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-amber-50 text-amber-700 border border-amber-300 shadow-xs">
                  TRIAL
                </span>
              )}
            </div>

            {/* Head Caption with Animated Shimmer Background Pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-0.5 rounded-full bg-gradient-to-r from-amber-100/80 via-rose-50/90 to-amber-100/70 border border-amber-200/80 shadow-xs relative overflow-hidden group/caption animate-pulse-soft">
              {/* Shimmer Light Sweeping across the Caption BG */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-shimmer-sweep pointer-events-none"></div>

              {/* Glowing AI Live Status Dot */}
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
              </span>

              <span className="text-[10px] font-bold bg-gradient-to-r from-slate-800 via-rose-700 to-amber-800 bg-clip-text text-transparent tracking-tight">
                Intelligent STEM Learning & Revision Engine
              </span>
            </div>
          </div>
        </div>

        {/* Gamified Status Badges: Red Flame, Amber Coins */}
        <div className="flex items-center gap-2">
          {/* Daily Streak Badge */}
          <div 
            title="Daily Study Streak"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold shadow-sm"
          >
            <Flame className="w-4 h-4 text-rose-600 animate-pulse fill-rose-500" />
            <span className="text-slate-900 font-extrabold">{user.streak} <span className="hidden sm:inline font-semibold text-rose-700">Days</span></span>
          </div>

          {/* Points Wallet */}
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('store');
            }}
            title="Reward Points Wallet (Click to Redeem Pro)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-extrabold hover:scale-105 transition-all shadow-sm"
          >
            <Coins className="w-4 h-4 text-amber-600 fill-amber-400 animate-spin-slow" />
            <span className="text-slate-900">{user.points} <span className="hidden sm:inline font-bold text-amber-700">Pts</span></span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudioSound}
            title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile Frame Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsMobileFrame(!isMobileFrame);
            }}
            title={isMobileFrame ? "Switch to Wide Screen View" : "Switch to Mobile Device View"}
            className="hidden md:flex p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-300 transition-all items-center gap-1 text-xs font-medium"
          >
            {isMobileFrame ? <Monitor className="w-4 h-4 text-rose-600" /> : <Smartphone className="w-4 h-4 text-amber-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
