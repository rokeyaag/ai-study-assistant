import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, User, GraduationCap, BookOpen, Target, Clock, 
  Sparkles, Flame, Coins, Check, Camera, ShieldCheck, Award 
} from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
];

const GRADE_OPTIONS = [
  "Junior High / Grade 9-10",
  "Senior High / Grade 11",
  "Senior High / Grade 12",
  "SSC / O-Levels Candidate",
  "HSC / A-Levels Candidate",
  "College & University STEM",
  "Engineering & Medical Admission"
];

const STREAM_OPTIONS = [
  "STEM & Science Major",
  "Pure Mathematics & Physics",
  "Pre-Medical Biology & Chemistry",
  "Computer Science & Robotics",
  "General Science & Innovation"
];

const DAILY_GOAL_OPTIONS = [
  "1 Hour / Day (Casual Practice)",
  "2 Hours / Day (Focused Study)",
  "3 Hours / Day (Intensive Revision)",
  "4+ Hours / Day (Scholar Mastery)"
];

export const StudentProfileModal = () => {
  const { 
    user, 
    updateUserProfile, 
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    vaultNotes,
    setActiveTab 
  } = useApp();

  const [name, setName] = useState(user.name);
  const [grade, setGrade] = useState(user.grade);
  const [subjectStream, setSubjectStream] = useState(user.subjectStream);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [targetExam, setTargetExam] = useState(user.targetExam || "HSC / Board Exam 2026");
  const [dailyGoal, setDailyGoal] = useState(user.dailyGoal || "2 Hours / Day (Focused Study)");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Sync state whenever modal opens or user updates
  useEffect(() => {
    if (isProfileModalOpen) {
      setName(user.name);
      setGrade(user.grade);
      setSubjectStream(user.subjectStream);
      setSelectedAvatar(user.avatar);
      setTargetExam(user.targetExam || "HSC / Board Exam 2026");
      setDailyGoal(user.dailyGoal || "2 Hours / Day (Focused Study)");
    }
  }, [isProfileModalOpen, user]);

  if (!isProfileModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim() || user.name,
      grade,
      subjectStream,
      avatar: selectedAvatar,
      targetExam,
      dailyGoal
    });
    setIsProfileModalOpen(false);
  };

  const isPro = user.subscription.tier === 'pro';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Top Header with Ambient Glow */}
        <div className="relative bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-amber-500/10 p-5 sm:p-6 border-b border-slate-200/80 shrink-0">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white border border-amber-300 text-amber-600 shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  Student Profile
                  {isPro ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-xs flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> PRO
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                      TRIAL
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-500">Academic settings, target subjects, and study progress</p>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                setIsProfileModalOpen(false);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/80 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Avatar and Identity Card */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="relative group shrink-0">
              <img
                src={selectedAvatar}
                alt="Avatar"
                className="w-16 h-16 rounded-2xl border-2 border-amber-400 object-cover shadow-md"
              />
              <button
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                title="Change Avatar"
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-slate-900 text-white hover:bg-amber-500 transition-colors shadow-sm cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-center sm:text-left flex-1 min-w-0">
              <h4 className="font-black text-slate-900 text-base">{name}</h4>
              <p className="text-xs text-amber-700 font-bold">{grade}</p>
              <p className="text-xs text-slate-500">{subjectStream}</p>
            </div>

            <button
              type="button"
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white border border-slate-200 hover:border-amber-400 text-slate-700 transition-all cursor-pointer"
            >
              {showAvatarPicker ? "Close Avatars" : "Choose Avatar"}
            </button>
          </div>

          {/* Quick Avatar Chooser Drawer */}
          {showAvatarPicker && (
            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-2 animate-in fade-in duration-200">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                Select Scholar Avatar:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {PRESET_AVATARS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedAvatar(av);
                    }}
                    className={`relative rounded-xl p-0.5 border-2 transition-all shrink-0 cursor-pointer ${
                      selectedAvatar === av
                        ? "border-amber-500 scale-105 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img src={av} alt="Scholar" className="w-11 h-11 rounded-lg object-cover" />
                    {selectedAvatar === av && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px]">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Gamified Achievements Strip */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-center">
              <div className="flex items-center justify-center gap-1 text-rose-600 mb-0.5">
                <Flame className="w-4 h-4 fill-rose-500 animate-pulse" />
                <span className="font-black text-slate-900 text-sm sm:text-base">{user.streak} Days</span>
              </div>
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">Study Streak</span>
            </div>

            <div 
              onClick={() => {
                soundManager.playClick();
                setIsProfileModalOpen(false);
                setActiveTab('store');
              }}
              className="p-3 rounded-2xl bg-amber-50/80 border border-amber-300 text-center cursor-pointer hover:scale-102 transition-transform"
            >
              <div className="flex items-center justify-center gap-1 text-amber-600 mb-0.5">
                <Coins className="w-4 h-4 fill-amber-400 animate-spin-slow" />
                <span className="font-black text-slate-900 text-sm sm:text-base">{user.points} Pts</span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Wallet Balance</span>
            </div>

            <div 
              onClick={() => {
                soundManager.playClick();
                setIsProfileModalOpen(false);
                setActiveTab('vault');
              }}
              className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-center cursor-pointer hover:scale-102 transition-transform"
            >
              <div className="flex items-center justify-center gap-1 text-indigo-600 mb-0.5">
                <BookOpen className="w-4 h-4" />
                <span className="font-black text-slate-900 text-sm sm:text-base">{vaultNotes.length}</span>
              </div>
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Vault Notes</span>
            </div>
          </div>

          {/* Edit Profile Form */}
          <form id="profile-form" onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-600" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Student Name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-900 text-xs sm:text-sm font-bold bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-rose-600" /> Class / Academic Level
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-900 text-xs sm:text-sm font-medium bg-white"
                >
                  {GRADE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Focus Subject Stream
                </label>
                <select
                  value={subjectStream}
                  onChange={(e) => setSubjectStream(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-900 text-xs sm:text-sm font-medium bg-white"
                >
                  {STREAM_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-rose-600" /> Target Exam / Ambition
                </label>
                <input
                  type="text"
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  placeholder="e.g. HSC 2026 / BUET Admission"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-900 text-xs sm:text-sm font-medium bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Daily Study Commitment
                </label>
                <select
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-900 text-xs sm:text-sm font-medium bg-white"
                >
                  {DAILY_GOAL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsProfileModalOpen(false);
            }}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="profile-form"
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white shadow-md shadow-rose-500/20 transition-all hover:scale-102 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
