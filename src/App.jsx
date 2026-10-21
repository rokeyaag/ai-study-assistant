import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { NotificationToast } from './components/NotificationToast';
import { AudioPodcastModal } from './components/AudioPodcastModal';
import { CheatSheetModal } from './components/CheatSheetModal';
import { RedemptionModal } from './components/RedemptionModal';
import { StudentProfileModal } from './components/StudentProfileModal';

import { DashboardView } from './views/DashboardView';
import { AITutorView } from './views/AITutorView';
import { QuizArenaView } from './views/QuizArenaView';
import { KnowledgeVaultView } from './views/KnowledgeVaultView';
import { SubscriptionStoreView } from './views/SubscriptionStoreView';

const MainLayout = () => {
  const { activeTab, isMobileFrame, setIsMobileFrame } = useApp();

  return (
    <div className={`min-h-screen relative overflow-x-hidden bg-[#0a0f1d] text-slate-900 flex flex-col justify-between transition-all ${
      isMobileFrame ? 'py-4 md:py-8' : ''
    }`}>
      {/* Dynamic Animated Ambient Background Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Tech Dot Matrix Pattern */}
        <div className="absolute inset-0 bg-tech-dots opacity-40"></div>

        {/* Floating Glowing Aura 1: Dynamic Amber Gold */}
        <div className="absolute -top-32 -left-20 w-96 h-96 sm:w-[540px] sm:h-[540px] bg-amber-500/30 rounded-full blur-[100px] animate-float-active-1"></div>

        {/* Floating Glowing Aura 2: Dynamic Rose / Crimson */}
        <div className="absolute top-1/3 -right-32 w-96 h-96 sm:w-[520px] sm:h-[520px] bg-rose-500/30 rounded-full blur-[110px] animate-float-active-2"></div>

        {/* Floating Glowing Aura 3: Dynamic Coral / Gold Bottom */}
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 sm:w-[560px] sm:h-[560px] bg-orange-400/25 rounded-full blur-[120px] animate-float-active-3"></div>

        {/* Ambient Subtle Star Particles */}
        <div className="absolute top-1/4 left-12 w-2 h-2 rounded-full bg-amber-400/70 animate-ping"></div>
        <div className="absolute top-20 right-1/4 w-2 h-2 rounded-full bg-rose-400/70 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-12 w-2.5 h-2.5 rounded-full bg-amber-300/60 animate-pulse"></div>
      </div>

      <div className={`w-full mx-auto flex flex-col relative z-10 ${
        isMobileFrame 
          ? 'mobile-device-shell bg-white/95 backdrop-blur-2xl border border-white/20 shadow-2xl h-[94vh] max-h-[880px] overflow-hidden' 
          : 'max-w-4xl bg-white/95 backdrop-blur-2xl shadow-2xl border-x border-slate-200/80 h-screen max-h-screen overflow-hidden'
      }`}>
        {/* Top Header: Frozen at Top */}
        <div className="shrink-0 z-30">
          <Header isMobileFrame={isMobileFrame} setIsMobileFrame={setIsMobileFrame} />
        </div>

        {/* Dynamic View Router: Smooth Middle Scroll */}
        <main className="flex-1 overflow-y-auto px-4 py-5 bg-animated-aurora-active relative overflow-x-hidden">
          {/* Vivid Floating Ambient Orbs inside main view with active multi-directional motion */}
          <div className="absolute -top-12 -right-12 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-br from-amber-400/25 via-amber-300/20 to-orange-400/20 rounded-full blur-2xl pointer-events-none animate-float-active-1"></div>
          <div className="absolute top-1/3 -left-16 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-tr from-rose-500/25 via-pink-400/20 to-rose-400/20 rounded-full blur-2xl pointer-events-none animate-float-active-2"></div>
          <div className="absolute -bottom-12 right-1/4 w-96 h-96 sm:w-[420px] sm:h-[420px] bg-gradient-to-tl from-amber-500/20 via-orange-400/20 to-rose-500/15 rounded-full blur-2xl pointer-events-none animate-float-active-3"></div>
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'tutor' && <AITutorView />}
          {activeTab === 'quiz' && <QuizArenaView />}
          {activeTab === 'vault' && <KnowledgeVaultView />}
          {activeTab === 'store' && <SubscriptionStoreView />}
        </main>

        {/* Bottom Tab Navigation: Frozen at Bottom */}
        <div className="shrink-0 z-30">
          <BottomNavigation />
        </div>
      </div>

      {/* Global Modals & Notifications */}
      <NotificationToast />
      <AudioPodcastModal />
      <CheatSheetModal />
      <RedemptionModal />
      <StudentProfileModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
