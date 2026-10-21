import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, INITIAL_VAULT_NOTES, SCAN_PRESETS, MOCK_QUIZ_QUESTIONS } from '../data/mockData';
import { soundManager } from '../utils/audioEffects';
import confetti from 'canvas-confetti';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aistudy_user_v2');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [vaultNotes, setVaultNotes] = useState(() => {
    const saved = localStorage.getItem('aistudy_vault_v2');
    return saved ? JSON.parse(saved) : INITIAL_VAULT_NOTES;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notification, setNotification] = useState(null);
  const [activePodcastNote, setActivePodcastNote] = useState(null);
  const [cheatSheetNote, setCheatSheetNote] = useState(null);
  const [isRedemptionSuccessModalOpen, setIsRedemptionSuccessModalOpen] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isCompact = isMobileFrame || isSmallScreen;

  // Persist changes to localStorage (using v2 key to refresh default state to English)
  useEffect(() => {
    localStorage.setItem('aistudy_user_v2', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('aistudy_vault_v2', JSON.stringify(vaultNotes));
  }, [vaultNotes]);

  const notify = (title, message, type = 'success') => {
    setNotification({ title, message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const toggleAudioSound = () => {
    const state = soundManager.toggleSound();
    setSoundEnabled(state);
    notify(
      state ? '🔊 Audio Sound On' : '🔇 Audio Sound Off',
      state ? 'Interactive sound effects have been enabled.' : 'Interactive sound effects have been muted.',
      'info'
    );
  };

  const addPoints = (amount, reason = 'Task Completed') => {
    soundManager.playReward();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 }
    });

    setUser(prev => ({
      ...prev,
      points: prev.points + amount
    }));

    notify(`+${amount} Points Earned! 🎉`, `Reward added for ${reason}.`, 'success');
  };

  const redeemPointsForPro = () => {
    if (user.points < 100) {
      soundManager.playError();
      notify('⚠️ Insufficient Points', 'You need at least 100 points to unlock 1 month of Pro Membership.', 'error');
      return false;
    }

    soundManager.playSuccess();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });

    setUser(prev => ({
      ...prev,
      points: prev.points - 100,
      subscription: {
        tier: 'pro',
        trialDaysLeft: 30,
        proExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    }));

    setIsRedemptionSuccessModalOpen(true);
    notify('💎 Pro Membership Unlocked!', 'Congratulations! 1 month of Pro Scholar Access is now active.', 'success');
    return true;
  };

  const addNoteToVault = (newNote) => {
    soundManager.playSuccess();
    setVaultNotes(prev => [newNote, ...prev]);
    addPoints(10, 'saving note to Knowledge Vault');
    notify('🗂️ Saved to Knowledge Vault', `"${newNote.title}" was saved to your digital notes (+10 pts).`, 'success');
  };

  const deleteNoteFromVault = (noteId) => {
    setVaultNotes(prev => prev.filter(n => n.id !== noteId));
    notify('🗑️ Note Deleted', 'The selected note was removed from your vault.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        vaultNotes,
        activeTab,
        setActiveTab,
        soundEnabled,
        toggleAudioSound,
        notification,
        notify,
        addPoints,
        redeemPointsForPro,
        addNoteToVault,
        deleteNoteFromVault,
        activePodcastNote,
        setActivePodcastNote,
        cheatSheetNote,
        setCheatSheetNote,
        isRedemptionSuccessModalOpen,
        setIsRedemptionSuccessModalOpen,
        isMobileFrame,
        setIsMobileFrame,
        isCompact,
        isSmallScreen,
        SCAN_PRESETS,
        MOCK_QUIZ_QUESTIONS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
