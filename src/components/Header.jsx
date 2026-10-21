import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Coins, Sparkles, Volume2, VolumeX, Smartphone, Monitor } from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const Header = ({ isMobileFrame, setIsMobileFrame }) => {
  const { user, soundEnabled, toggleAudioSound, setActiveTab } = useApp();

  const isPro = user.subscription.tier === 'pro';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] relative overflow-hidden">
      {/* Animated Subtle Ambient Top Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 animate-gradient-shift"></div>
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            soundManager.playClick();
            setActiveTab('dashboard');
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* Logo Icon */}
          <div className="relative group-hover:scale-105 transition-transform flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="AI Study Assistant Logo" 
              className="w-11 h-11 rounded-xl object-contain shadow-md shadow-rose-500/20 bg-slate-900/5 p-0.5 border border-amber-400/70"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-1">
                AI Study <span className="text-amber-600 font-extrabold">Assistant</span>
              </h1>
              {isPro ? (
                <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded-md bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-sm flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> PRO
                </span>
              ) : (
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-amber-50 text-amber-700 border border-amber-300">
                  TRIAL
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Intelligent STEM Learning & Revision Engine
            </p>
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
