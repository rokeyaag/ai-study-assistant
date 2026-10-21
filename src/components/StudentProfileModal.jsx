import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, User, GraduationCap, BookOpen, Target, Clock, 
  Sparkles, Flame, Coins, Check, Camera, ShieldCheck, Award,
  Building, Mail, Lock, UserPlus, QrCode, CreditCard, ChevronRight,
  CheckCircle2, RefreshCw, Upload, ImagePlus, Loader2, Plus, Tag
} from 'lucide-react';
import { soundManager } from '../utils/audioEffects';
import { processImageFile } from '../utils/imageHelper';

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

export const StudentProfileModal = () => {
  const { 
    user, 
    updateUserProfile, 
    registerNewStudent,
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    vaultNotes,
    notify,
    setActiveTab 
  } = useApp();

  const [activeModalTab, setActiveModalTab] = useState('profile'); // 'profile' | 'register'
  const [isUploading, setIsUploading] = useState(false);

  // File and input refs
  const profileFileInputRef = useRef(null);
  const regFileInputRef = useRef(null);
  const subjectInputRef = useRef(null);
  const regSubjectInputRef = useRef(null);

  // Profile Edit State
  const [name, setName] = useState(user.name);
  const [institution, setInstitution] = useState(user.institution || "Dhaka Science College");
  const [grade, setGrade] = useState(user.grade);
  const [subjectStream, setSubjectStream] = useState(user.subjectStream);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [targetExam, setTargetExam] = useState(user.targetExam || "HSC / Board Exam 2026");
  const [dailyGoal, setDailyGoal] = useState(user.dailyGoal || "2 Hours / Day (Focused Study)");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // New Student Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regInstitution, setRegInstitution] = useState('');
  const [regGrade, setRegGrade] = useState(GRADE_OPTIONS[2]);
  const [regStream, setRegStream] = useState(STREAM_OPTIONS[0]);
  const [regTargetExam, setRegTargetExam] = useState('HSC 2026 GPA 5.0 / Admission');
  const [regDailyGoal, setRegDailyGoal] = useState(DAILY_GOAL_OPTIONS[1]);
  const [regAvatar, setRegAvatar] = useState(PRESET_AVATARS[0]);
  const [regPassword, setRegPassword] = useState('');

  // Handle Custom Picture Upload via File System
  const handleImageUpload = async (e, isRegistration = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const dataUrl = await processImageFile(file);
      soundManager.playReward();

      if (isRegistration) {
        setRegAvatar(dataUrl);
        notify('📸 Custom Photo Uploaded!', 'Student registration photo selected.', 'success');
      } else {
        setSelectedAvatar(dataUrl);
        notify('📸 Photo Uploaded Successfully!', 'New profile picture set. Click "Save Profile Changes" to finish.', 'success');
      }
    } catch (err) {
      notify('Upload Error', err.message || 'Could not process photo', 'error');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Subjects State for Edit Profile
  const [subjectsList, setSubjectsList] = useState(
    user.subjects && Array.isArray(user.subjects) 
      ? user.subjects 
      : ["Physics", "Chemistry", "Higher Mathematics", "Biology", "ICT & Computer Science"]
  );
  const [newSubjectInput, setNewSubjectInput] = useState('');

  // Subjects State for Registration Form
  const [regSubjectsList, setRegSubjectsList] = useState([
    "Physics", "Chemistry", "Higher Mathematics", "Biology", "ICT & Computer Science"
  ]);
  const [newRegSubjectInput, setNewRegSubjectInput] = useState('');

  // Sync state whenever modal opens
  useEffect(() => {
    if (isProfileModalOpen) {
      setName(user.name);
      setInstitution(user.institution || "Dhaka Science College");
      setGrade(user.grade);
      setSubjectStream(user.subjectStream);
      setSelectedAvatar(user.avatar);
      setTargetExam(user.targetExam || "HSC / Board Exam 2026");
      setDailyGoal(user.dailyGoal || "2 Hours / Day (Focused Study)");
      if (user.subjects && Array.isArray(user.subjects)) {
        setSubjectsList(user.subjects);
      }
    }
  }, [isProfileModalOpen, user]);

  if (!isProfileModalOpen) return null;

  const handleAddSubject = (e) => {
    if (e) e.preventDefault();
    if (!newSubjectInput.trim()) return;
    const clean = newSubjectInput.trim();
    if (subjectsList.some(s => s.toLowerCase() === clean.toLowerCase())) {
      notify('Subject Exists', `"${clean}" is already in your subjects list.`, 'info');
      return;
    }
    setSubjectsList(prev => [...prev, clean]);
    setNewSubjectInput('');
    soundManager.playReward();
    notify('📚 Subject Added!', `"${clean}" added. Click "Save Profile Changes" to save.`, 'success');
  };

  const handleRemoveSubject = (subjectToRemove) => {
    setSubjectsList(prev => prev.filter(s => s.toLowerCase() !== subjectToRemove.toLowerCase()));
    soundManager.playClick();
  };

  const handleQuickAddSubject = (subject) => {
    if (subjectsList.some(s => s.toLowerCase() === subject.toLowerCase())) return;
    setSubjectsList(prev => [...prev, subject]);
    soundManager.playReward();
  };

  const handleAddRegSubject = (e) => {
    if (e) e.preventDefault();
    if (!newRegSubjectInput.trim()) return;
    const clean = newRegSubjectInput.trim();
    if (regSubjectsList.some(s => s.toLowerCase() === clean.toLowerCase())) {
      notify('Subject Exists', `"${clean}" is already added.`, 'info');
      return;
    }
    setRegSubjectsList(prev => [...prev, clean]);
    setNewRegSubjectInput('');
    soundManager.playReward();
  };

  const handleRemoveRegSubject = (subjectToRemove) => {
    setRegSubjectsList(prev => prev.filter(s => s.toLowerCase() !== subjectToRemove.toLowerCase()));
    soundManager.playClick();
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim() || user.name,
      institution: institution.trim() || "Science College",
      grade,
      subjectStream,
      subjects: subjectsList,
      avatar: selectedAvatar,
      targetExam,
      dailyGoal
    });
    setIsProfileModalOpen(false);
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
      subjects: regSubjectsList,
      targetExam: regTargetExam,
      dailyGoal: regDailyGoal,
      avatar: regAvatar
    });

    // Reset registration form and switch to profile view
    setRegName('');
    setRegEmail('');
    setRegInstitution('');
    setRegPassword('');
    setActiveModalTab('profile');
  };

  const isPro = user?.subscription?.tier === 'pro';
  const studentIdNumber = user.id ? user.id.replace('student_', '').slice(-6) : '829410';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Top Header with ambient styling */}
        <div className="relative bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-amber-500/10 p-4 sm:p-5 border-b border-slate-200/80 shrink-0">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white border border-amber-300 text-amber-600 shadow-sm shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  Student Scholar Hub
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
                <p className="text-xs text-slate-500">Student profile, digital ID card & account registration</p>
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

          {/* Dual-Mode Navigation Tabs: Student Profile & Registration Form */}
          <div className="flex items-center gap-2 mt-4 p-1 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setActiveModalTab('profile');
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeModalTab === 'profile'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Student Profile</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setActiveModalTab('register');
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeModalTab === 'register'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-md shadow-rose-500/20'
                  : 'text-rose-700 hover:bg-rose-50/70'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Registration Form</span>
              <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded-full text-[9px] font-black">
                +50 Pts
              </span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {activeModalTab === 'profile' ? (
            /* TAB 1: STUDENT PROFILE & DIGITAL ID CARD */
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Digital Student Holographic ID Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-5 sm:p-6 border border-amber-400/40 shadow-xl">
                {/* Holographic Ambient Glow Lines */}
                <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col justify-between space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-amber-400" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                        AI Study Assistant Scholar ID
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-white/10 border border-white/20 text-slate-200">
                      ID: #{studentIdNumber}
                    </span>
                  </div>

                  {/* Student Details */}
                  <div className="flex items-center gap-4">
                    <div 
                      onClick={() => profileFileInputRef.current?.click()}
                      title="Click to upload custom picture"
                      className="relative shrink-0 group cursor-pointer"
                    >
                      <img
                        src={selectedAvatar}
                        alt="Student"
                        className="w-16 h-16 rounded-2xl border-2 border-amber-400 object-cover shadow-lg shrink-0 group-hover:brightness-90 transition-all"
                      />
                      <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-amber-500 text-slate-950 shadow-md border-2 border-slate-900 group-hover:scale-110 transition-transform flex items-center justify-center">
                        {isUploading ? (
                          <Loader2 className="w-3 h-3 animate-spin text-white" />
                        ) : (
                          <Camera className="w-3 h-3 text-slate-950" />
                        )}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-lg font-black text-white truncate">{name}</h4>
                      <p className="text-xs text-amber-300 font-bold">{grade}</p>
                      <p className="text-xs text-slate-300 font-medium truncate">{institution}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Target: {targetExam}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer Gamified Stats */}
                  <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Streak</span>
                      <span className="font-black text-amber-400 flex items-center justify-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> {user.streak} Days
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Points</span>
                      <span className="font-black text-amber-300 flex items-center justify-center gap-1">
                        <Coins className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {user.points} Pts
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Tier</span>
                      <span className="font-black text-rose-300 uppercase text-[10px]">
                        {isPro ? "Pro Scholar" : "Free Trial"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hidden file input for custom photo upload */}
              <input
                type="file"
                ref={profileFileInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, false)}
              />

              {/* Avatar Selector Drawer */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-700">Scholar Avatar / Photo:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => profileFileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1 shadow-xs cursor-pointer"
                      title="Upload picture from your device"
                    >
                      {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                      <span>Upload Picture</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                    >
                      {showAvatarPicker ? "Close Presets" : "Choose Presets"}
                    </button>
                  </div>
                </div>

                {showAvatarPicker && (
                  <div className="flex items-center gap-2 overflow-x-auto py-1 animate-in fade-in duration-200">
                    {/* Upload Custom Tile */}
                    <button
                      type="button"
                      onClick={() => profileFileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center w-12 h-11 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-800 transition-all shrink-0 cursor-pointer group"
                      title="Upload photo from your phone or PC"
                    >
                      <ImagePlus className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
                      <span className="text-[7.5px] font-black uppercase mt-0.5">Upload</span>
                    </button>

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
                )}
              </div>

              {/* Edit Profile Form */}
              <form id="profile-edit-form" onSubmit={handleSaveProfile} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-600" /> Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-900 text-xs sm:text-sm font-bold bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-rose-600" /> School / College
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Science College"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-900 text-xs sm:text-sm font-bold bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-rose-600" /> Academic Grade
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-400 text-slate-900 text-xs font-medium bg-white"
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
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-400 text-slate-900 text-xs font-medium bg-white"
                    >
                      {STREAM_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Enrolled Study Subjects */}
                <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/90 space-y-2.5 shadow-xs">
                  <div className="border-b border-amber-200/70 pb-2.5">
                    <label className="block text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                      <span>Enrolled Study Subjects ({subjectsList.length})</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-medium">Add curriculum subjects you want to prepare</span>
                  </div>

                  {/* Input row with Right-Side ADD Button */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        ref={subjectInputRef}
                        type="text"
                        value={newSubjectInput}
                        onChange={(e) => setNewSubjectInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSubject();
                          }
                        }}
                        placeholder="Type subject name (e.g. Higher Math, Chemistry, ICT, English)..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-900 text-xs font-bold bg-white shadow-xs"
                      />
                    </div>

                    {/* RIGHT-SIDE ADD BUTTON */}
                    <button
                      type="button"
                      onClick={handleAddSubject}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs shadow-md shadow-amber-500/25 flex items-center gap-1 shrink-0 cursor-pointer transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Add Subject</span>
                    </button>
                  </div>

                  {/* Quick Add Suggestions */}
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    {["Physics", "Chemistry", "Higher Mathematics", "Biology", "ICT", "English"].map((suggest) => {
                      const isAdded = subjectsList.some(s => s.toLowerCase() === suggest.toLowerCase());
                      if (isAdded) return null;
                      return (
                        <button
                          key={suggest}
                          type="button"
                          onClick={() => handleQuickAddSubject(suggest)}
                          className="px-2 py-0.5 rounded-lg text-[9.5px] font-bold bg-white hover:bg-amber-100 text-slate-600 hover:text-amber-900 border border-slate-200 hover:border-amber-300 transition-all flex items-center gap-0.5 cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5 text-amber-600" />
                          <span>{suggest}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Subjects Chips List */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {subjectsList.map((subj, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-white border border-amber-300 text-slate-900 text-[11px] font-bold shadow-xs flex items-center gap-1.5 group hover:border-amber-500 transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        <span>{subj}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubject(subj)}
                          className="w-3.5 h-3.5 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-400 flex items-center justify-center transition-colors cursor-pointer text-[9px]"
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-rose-600" /> Target Exam
                    </label>
                    <input
                      type="text"
                      value={targetExam}
                      onChange={(e) => setTargetExam(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-400 text-slate-900 text-xs font-medium bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> Daily Target
                    </label>
                    <select
                      value={dailyGoal}
                      onChange={(e) => setDailyGoal(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-400 text-slate-900 text-xs font-medium bg-white"
                    >
                      {DAILY_GOAL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-black text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </form>
            </div>
          ) : (
            /* TAB 2: STUDENT REGISTRATION FORM */
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Registration Welcome Reward Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 border border-amber-300 flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-amber-400 text-slate-950 shadow-sm shrink-0">
                  <Coins className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">
                    New Student Enrollment Bonus! 🎁
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Complete your registration today to claim <strong className="text-amber-800 font-black">+50 Instant Reward Points</strong> and start your revision journey!
                  </p>
                </div>
              </div>

              {/* Student Registration Form */}
              <form onSubmit={handleRegisterNewStudent} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-rose-600" /> Student Full Name *
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Tanvir Rahman"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-xs sm:text-sm font-bold bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-amber-600" /> Email / Student Phone *
                    </label>
                    <input
                      type="text"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-xs sm:text-sm font-bold bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-amber-600" /> School / College Name
                    </label>
                    <input
                      type="text"
                      value={regInstitution}
                      onChange={(e) => setRegInstitution(e.target.value)}
                      placeholder="e.g. Notre Dame College"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
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
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-rose-600" /> Academic Class
                    </label>
                    <select
                      value={regGrade}
                      onChange={(e) => setRegGrade(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
                    >
                      {GRADE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Major Subject Stream
                    </label>
                    <select
                      value={regStream}
                      onChange={(e) => setRegStream(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
                    >
                      {STREAM_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Registration Enrolled Subjects */}
                <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200/90 space-y-2.5">
                  <div className="border-b border-rose-200/70 pb-2.5">
                    <label className="block text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                      <span>Enrolled Study Subjects ({regSubjectsList.length})</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-medium">Add curriculum subjects you want to prepare</span>
                  </div>

                  {/* Input row with Right-Side ADD Button */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        ref={regSubjectInputRef}
                        type="text"
                        value={newRegSubjectInput}
                        onChange={(e) => setNewRegSubjectInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddRegSubject();
                          }
                        }}
                        placeholder="Type subject name (e.g. Higher Math, Chemistry, ICT, English)..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-900 text-xs font-bold bg-white shadow-xs"
                      />
                    </div>

                    {/* RIGHT-SIDE ADD BUTTON */}
                    <button
                      type="button"
                      onClick={handleAddRegSubject}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs shadow-md shadow-rose-500/25 flex items-center gap-1 shrink-0 cursor-pointer transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Add Subject</span>
                    </button>
                  </div>

                  {/* Quick Add Suggestions */}
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    {["Physics", "Chemistry", "Higher Mathematics", "Biology", "ICT", "English"].map((suggest) => {
                      const isAdded = regSubjectsList.some(s => s.toLowerCase() === suggest.toLowerCase());
                      if (isAdded) return null;
                      return (
                        <button
                          key={suggest}
                          type="button"
                          onClick={() => {
                            setRegSubjectsList(prev => [...prev, suggest]);
                            soundManager.playReward();
                          }}
                          className="px-2 py-0.5 rounded-lg text-[9.5px] font-bold bg-white hover:bg-rose-100 text-slate-600 hover:text-rose-900 border border-slate-200 hover:border-rose-300 transition-all flex items-center gap-0.5 cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5 text-rose-600" />
                          <span>{suggest}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Subjects Chips List */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {regSubjectsList.map((subj, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-white border border-rose-300 text-slate-900 text-[11px] font-bold shadow-xs flex items-center gap-1.5 group hover:border-rose-500 transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        <span>{subj}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveRegSubject(subj)}
                          className="w-3.5 h-3.5 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-400 flex items-center justify-center transition-colors cursor-pointer text-[9px]"
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-rose-600" /> Academic Target / Goal
                    </label>
                    <input
                      type="text"
                      value={regTargetExam}
                      onChange={(e) => setRegTargetExam(e.target.value)}
                      placeholder="e.g. HSC 2026 GPA 5.0"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> Daily Revision Commitment
                    </label>
                    <select
                      value={regDailyGoal}
                      onChange={(e) => setRegDailyGoal(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-rose-500 text-xs font-medium bg-white"
                    >
                      {DAILY_GOAL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Hidden file input for registration photo */}
                <input
                  type="file"
                  ref={regFileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, true)}
                />

                {/* Avatar & Photo Chooser */}
                <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-xs font-black text-slate-800">
                        Pick Avatar or Upload Picture:
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">Use personal photo or scholar avatar</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => regFileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white flex items-center gap-1 shadow-xs cursor-pointer disabled:opacity-50"
                      title="Upload picture from your phone or PC"
                    >
                      {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                      <span>Upload Picture</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {/* Upload Custom Tile */}
                    <button
                      type="button"
                      onClick={() => regFileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center w-12 h-10 rounded-xl border-2 border-dashed border-rose-300 bg-white hover:bg-rose-100/60 text-rose-700 transition-all shrink-0 cursor-pointer group"
                      title="Upload photo from your phone or PC"
                    >
                      <ImagePlus className="w-3.5 h-3.5 text-rose-600 group-hover:scale-110 transition-transform" />
                      <span className="text-[7.5px] font-black uppercase mt-0.5">Upload</span>
                    </button>

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
                        <img src={av} alt="Avatar" className="w-10 h-10 rounded-lg object-cover" />
                        {regAvatar === av && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[9px]">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Registration Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 cursor-pointer mt-3 active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Complete Registration & Claim +50 Points!</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
