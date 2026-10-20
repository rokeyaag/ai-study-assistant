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
    <div className={`min-h-screen bg-slate-100/70 text-slate-900 flex flex-col justify-between transition-all ${
      isMobileFrame ? 'py-4 md:py-8 bg-slate-200' : ''
    }`}>
      <div className={`w-full mx-auto flex flex-col flex-1 ${
        isMobileFrame 
          ? 'mobile-device-shell bg-white border border-slate-300 shadow-2xl' 
          : 'max-w-4xl bg-white shadow-sm border-x border-slate-200 min-h-screen'
      }`}>
        {/* Top Header */}
        <Header isMobileFrame={isMobileFrame} setIsMobileFrame={setIsMobileFrame} />

        {/* Dynamic View Router */}
        <main className="flex-1 px-4 py-5 overflow-y-auto bg-slate-50/50">
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
