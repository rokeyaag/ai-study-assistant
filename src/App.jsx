import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { NotificationToast } from './components/NotificationToast';
import { AudioPodcastModal } from './components/AudioPodcastModal';
import { CheatSheetModal } from './components/CheatSheetModal';
import { RedemptionModal } from './components/RedemptionModal';

import { DashboardView } from './views/DashboardView';
import { AITutorView } from './views/AITutorView';
import { QuizArenaView } from './views/QuizArenaView';
import { KnowledgeVaultView } from './views/KnowledgeVaultView';
import { SubscriptionStoreView } from './views/SubscriptionStoreView';

const MainLayout = () => {
  const { activeTab } = useApp();
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  return (
    <div className={`min-h-screen relative overflow-x-hidden bg-[#0a0f1d] text-slate-900 flex flex-col justify-between transition-all ${
      isMobileFrame ? 'py-4 md:py-8' : ''
    }`}>
      {/* Dynamic Animated Ambient Background Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Tech Dot Matrix Pattern */}
        <div className="absolute inset-0 bg-tech-dots opacity-40"></div>

        {/* Floating Glowing Aura 1: Amber Gold */}
        <div className="absolute -top-32 -left-20 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-amber-500/20 rounded-full blur-[110px] animate-float-1"></div>

        {/* Floating Glowing Aura 2: Rose Red */}
        <div className="absolute top-1/3 -right-32 w-96 h-96 sm:w-[480px] sm:h-[480px] bg-rose-500/20 rounded-full blur-[120px] animate-float-2"></div>

        {/* Floating Glowing Aura 3: Warm Orange / Gold Bottom */}
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 sm:w-[520px] sm:h-[520px] bg-amber-400/15 rounded-full blur-[130px] animate-float-3"></div>

        {/* Ambient Subtle Star Particles */}
        <div className="absolute top-1/4 left-12 w-2 h-2 rounded-full bg-amber-400/70 animate-ping"></div>
        <div className="absolute top-20 right-1/4 w-2 h-2 rounded-full bg-rose-400/70 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-12 w-2.5 h-2.5 rounded-full bg-amber-300/60 animate-pulse"></div>
      </div>

      <div className={`w-full mx-auto flex flex-col flex-1 relative z-10 ${
        isMobileFrame 
          ? 'mobile-device-shell bg-white/95 backdrop-blur-2xl border border-white/20 shadow-2xl' 
          : 'max-w-4xl bg-white/95 backdrop-blur-2xl shadow-2xl border-x border-slate-200/80 min-h-screen'
      }`}>
        {/* Top Header */}
        <Header isMobileFrame={isMobileFrame} setIsMobileFrame={setIsMobileFrame} />

        {/* Dynamic View Router with Ambient Mesh Animation */}
        <main className="flex-1 px-4 py-5 overflow-y-auto bg-animated-mesh relative">
          {/* Subtle Floating Ambient Orbs inside main view */}
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none animate-float-1"></div>
          <div className="absolute top-1/2 -left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none animate-float-2"></div>
          <div className="absolute -bottom-10 right-1/3 w-80 h-80 bg-amber-300/10 rounded-full blur-3xl pointer-events-none animate-float-3"></div>
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'tutor' && <AITutorView />}
          {activeTab === 'quiz' && <QuizArenaView />}
          {activeTab === 'vault' && <KnowledgeVaultView />}
          {activeTab === 'store' && <SubscriptionStoreView />}
        </main>

        {/* Bottom Tab Navigation */}
        <BottomNavigation />
      </div>

      {/* Global Modals & Notifications */}
      <NotificationToast />
      <AudioPodcastModal />
      <CheatSheetModal />
      <RedemptionModal />
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
