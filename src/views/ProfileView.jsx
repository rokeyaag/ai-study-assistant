import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, GraduationCap, BookOpen, Target, Clock, 
  Sparkles, Flame, Coins, Check, Camera, ShieldCheck, Award,
  Building, Mail, Lock, UserPlus, CreditCard, ChevronRight,
  CheckCircle2, Gem, ArrowRight
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
  "Engineering & Medical Admission Prep"
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

export const ProfileView = () => {
  const { 
    user, 
    updateUserProfile, 
    registerNewStudent,
    vaultNotes,
    setActiveTab,
    isCompact 
  } = useApp();

  const [activeSection, setActiveSection] = useState('profile'); // 'profile' | 'register'

  // Edit Profile State
  const [name, setName] = useState(user.name);
  const [institution, setInstitution] = useState(user.institution || "Dhaka Science College");
  const [grade, setGrade] = useState(user.grade);
  const [subjectStream, setSubjectStream] = useState(user.subjectStream);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [targetExam, setTargetExam] = useState(user.targetExam || "HSC / Board Exam 2026");
  const [dailyGoal, setDailyGoal] = useState(user.dailyGoal || "2 Hours / Day (Focused Study)");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // New Student Registration State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regInstitution, setRegInstitution] = useState('');
  const [regGrade, setRegGrade] = useState(GRADE_OPTIONS[2]);
  const [regStream, setRegStream] = useState(STREAM_OPTIONS[0]);
  const [regTargetExam, setRegTargetExam] = useState('HSC 2026 GPA 5.0 / Admission');
  const [regDailyGoal, setRegDailyGoal] = useState(DAILY_GOAL_OPTIONS[1]);
  const [regAvatar, setRegAvatar] = useState(PRESET_AVATARS[0]);
  const [regPassword, setRegPassword] = useState('');

  // Sync state whenever user changes
  useEffect(() => {
    setName(user.name);
    setInstitution(user.institution || "Dhaka Science College");
    setGrade(user.grade);
    setSubjectStream(user.subjectStream);
    setSelectedAvatar(user.avatar);
    setTargetExam(user.targetExam || "HSC / Board Exam 2026");
    setDailyGoal(user.dailyGoal || "2 Hours / Day (Focused Study)");
  }, [user]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim() || user.name,
      institution: institution.trim() || "Science College",
      grade,
      subjectStream,
      avatar: selectedAvatar,
      targetExam,
      dailyGoal
    });
  };

  const handleRegisterNewStudent = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;

    registerNewStudent({
      name: regName.trim(),
      email: regEmail.trim(),
      institution: regInstitution.trim() || "National Science Academy",
      grade: regGrade,
      subjectStream: regStream,
      targetExam: regTargetExam,
      dailyGoal: regDailyGoal,
      avatar: regAvatar
    });

    setRegName('');
    setRegEmail('');
    setRegInstitution('');
    setRegPassword('');
    setActiveSection('profile');
  };

  const isPro = user.subscription.tier === 'pro';
  const studentIdNumber = user.id ? user.id.replace('student_', '').slice(-6) : '829410';

  return (
    <div className="space-y-6 pb-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-sm shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-base sm:text-lg text-slate-900">
                  Student Scholar Profile
                </h2>
                {isPro ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-xs flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> PRO
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                    TRIAL
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Manage your academic identity, target exams, and student registration
              </p>
            </div>
          </div>

          {/* Section Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 w-full sm:w-auto">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveSection('profile');
              }}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeSection === 'profile'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-teal-600" />
              <span>My Profile & ID</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveSection('register');
              }}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeSection === 'register'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-sm'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Registration Form</span>
              <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded-full text-[9px] font-black">
                +50
              </span>
            </button>
          </div>
        </div>
      </div>

      {activeSection === 'profile' ? (
        /* SECTION 1: MY SCHOLAR PROFILE & DIGITAL ID CARD */
        <div className="space-y-6">
          {/* Holographic Digital Student ID Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-7 border border-amber-400/40 shadow-xl">
            {/* Glowing Ambient Light Orbs */}
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-5">
              {/* Card Top Brand & ID Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                    AI Study Assistant • Scholar Pass
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-white/10 border border-white/20 text-slate-200">
                  ID: #{studentIdNumber}
                </span>
              </div>

              {/* Student Identity Information */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={selectedAvatar}
                    alt="Student Avatar"
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl border-2 border-amber-400 object-cover shadow-lg"
                  />
                  {isPro && (
                    <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 text-white text-[9px] font-black shadow-xs">
                      PRO
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">
                    {name}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-300 font-bold">{grade}</p>
                  <p className="text-xs text-slate-300 font-medium truncate mt-0.5">{institution}</p>
                  
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      🎯 Target: {targetExam}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      📚 {subjectStream}
                    </span>
                  </div>
                </div>
              </div>

              {/* Gamified Achievements Strip */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Study Streak</span>
                  <span className="font-black text-amber-400 text-sm sm:text-base flex items-center justify-center gap-1 mt-0.5">
                    <Flame className="w-4 h-4 fill-rose-500 text-rose-500" /> {user.streak} Days
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('store')}
                  className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/60 transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Wallet Points</span>
                  <span className="font-black text-amber-300 text-sm sm:text-base flex items-center justify-center gap-1 mt-0.5">
                    <Coins className="w-4 h-4 fill-amber-400 text-amber-400" /> {user.points} Pts
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('vault')}
                  className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/60 transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Vault Notes</span>
                  <span className="font-black text-indigo-300 text-sm sm:text-base flex items-center justify-center gap-1 mt-0.5">
                    <BookOpen className="w-4 h-4" /> {vaultNotes.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Pro Store Card Shortcut */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-600 text-white shadow-md">
                <Gem className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm sm:text-base">
                  {isPro ? "Pro Scholar Membership Active" : "Unlock Pro Scholar Access for 1 Month"}
                </h4>
                <p className="text-xs text-slate-600">
                  {isPro ? "Unlimited AI textbook scans & 24/7 Socratic tutor unlocked." : "Redeem every 100 points for unlimited scans & audio podcasts."}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('store')}
              className="px-5 py-2.5 rounded-xl font-black text-xs bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
            >
              <span>{isPro ? "Manage Pro Privileges" : "Go to Pro Store"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Edit Profile Information Form */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">Edit Scholar Profile</h3>
                <p className="text-xs text-slate-500">Update your student name, school, class level, and revision goals</p>
              </div>

              <button
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
              >
                {showAvatarPicker ? "Close Avatars" : "Change Avatar"}
              </button>
            </div>

            {/* Avatar Selector Drawer */}
            {showAvatarPicker && (
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 animate-in fade-in duration-200">
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
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={av} alt="Avatar" className="w-11 h-11 rounded-lg object-cover" />
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

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-600" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-900 text-xs sm:text-sm font-bold bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-rose-600" /> School / College / Academy
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Science College"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-900 text-xs sm:text-sm font-bold bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-rose-600" /> Academic Class / Grade
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 text-slate-900 text-xs font-medium bg-white"
                  >
                    {GRADE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Focus Subject Stream
                  </label>
                  <select
                    value={subjectStream}
                    onChange={(e) => setSubjectStream(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 text-slate-900 text-xs font-medium bg-white"
                  >
                    {STREAM_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-rose-600" /> Target Exam / Ambition
                  </label>
                  <input
                    type="text"
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 text-slate-900 text-xs font-medium bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> Daily Revision Commitment
                  </label>
                  <select
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 text-slate-900 text-xs font-medium bg-white"
                  >
                    {DAILY_GOAL_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl font-black text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* SECTION 2: NEW STUDENT REGISTRATION FORM */
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
          {/* Welcome Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 border border-amber-300 flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-400 text-slate-950 shadow-sm shrink-0">
              <Coins className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm sm:text-base">
                New Student Enrollment (+50 Bonus Points!) 🎁
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Register a new student account to unlock personalized Socratic AI tutoring and receive <strong className="text-amber-800 font-black">+50 Instant Reward Points</strong>!
              </p>
            </div>
          </div>

          <form onSubmit={handleRegisterNewStudent} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-rose-600" /> Student Full Name *
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Tanvir Rahman"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-xs sm:text-sm font-bold bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-amber-600" /> Student Email or Phone *
                </label>
                <input
                  type="text"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-xs sm:text-sm font-bold bg-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-amber-600" /> School / College / Academy
                </label>
                <input
                  type="text"
                  value={regInstitution}
                  onChange={(e) => setRegInstitution(e.target.value)}
                  placeholder="e.g. Notre Dame College"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-rose-600" /> Password / Secret PIN *
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-rose-600" /> Academic Class / Level
                </label>
                <select
                  value={regGrade}
                  onChange={(e) => setRegGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
                >
                  {GRADE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Focus Subject Stream
                </label>
                <select
                  value={regStream}
                  onChange={(e) => setRegStream(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
                >
                  {STREAM_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-rose-600" /> Target Exam / Ambition
                </label>
                <input
                  type="text"
                  value={regTargetExam}
                  onChange={(e) => setRegTargetExam(e.target.value)}
                  placeholder="e.g. HSC 2026 GPA 5.0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Daily Study Commitment
                </label>
                <select
                  value={regDailyGoal}
                  onChange={(e) => setRegDailyGoal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
                >
                  {DAILY_GOAL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Avatar Selection */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Pick Student Avatar:
              </label>
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {PRESET_AVATARS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setRegAvatar(av);
                    }}
                    className={`relative rounded-xl p-0.5 border-2 transition-all shrink-0 cursor-pointer ${
                      regAvatar === av
                        ? "border-rose-500 scale-105 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={av} alt="Avatar" className="w-11 h-11 rounded-lg object-cover" />
                    {regAvatar === av && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[9px]">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 cursor-pointer mt-3 active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Complete Registration & Claim +50 Points!</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
