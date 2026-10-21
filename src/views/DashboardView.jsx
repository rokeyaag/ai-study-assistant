import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, Camera, Trophy, BookOpen, Clock, Play, Pause, 
  RotateCcw, ArrowRight, TrendingUp, AlertCircle, CheckCircle2, 
  Flame, Zap, BookMarked, HelpCircle, UserCheck, Volume2, VolumeX, Plus
} from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const DashboardView = () => {
  const { user, setActiveTab, addPoints, vaultNotes, setIsProfileModalOpen } = useApp();

  // Pomodoro Focus Timer State
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('focus'); // 'focus' | 'break'
  const [isTickingSoundOn, setIsTickingSoundOn] = useState(true);

  useEffect(() => {
    let interval;
    if (isTimerRunning && pomodoroSeconds > 0) {
      interval = setInterval(() => {
        setPomodoroSeconds(prev => {
          if (prev <= 1) return 0;
          if (isTickingSoundOn) {
            soundManager.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else if (pomodoroSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      soundManager.playTimerComplete();
      if (timerMode === 'focus') {
        addPoints(20, 'completing a 25-minute Pomodoro study block');
        setTimerMode('break');
        setPomodoroSeconds(5 * 60);
      } else {
        setTimerMode('focus');
        setPomodoroSeconds(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, pomodoroSeconds, timerMode, isTickingSoundOn]);

  const toggleTimer = () => {
    if (!isTimerRunning) {
      soundManager.playStartFocus();
      setIsTimerRunning(true);
    } else {
      soundManager.playPauseFocus();
      setIsTimerRunning(false);
    }
  };

  const resetTimer = () => {
    soundManager.playClick();
    setIsTimerRunning(false);
    setPomodoroSeconds(timerMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-5 pb-6 animate-in fade-in duration-300">
      {/* Student Welcome Banner: Click to open & edit Profile */}
      <div 
        onClick={() => {
          soundManager.playClick();
          setActiveTab('profile');
        }}
        title="Click to view & edit student profile"
        className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 hover:border-amber-300/80 p-5 shadow-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
      >
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-12 h-12 rounded-2xl border-2 border-amber-400 object-cover shadow-sm group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-amber-500 text-white text-[9px] font-black">
                ✏️
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-amber-800 transition-colors">
                  Welcome back, {user.name.split(' ')[0]}! 👋
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-bold rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:border-amber-300">
                  Edit Profile
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{user.grade} • {user.subjectStream}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Today's Target</span>
            <div className="flex items-center gap-1 text-xs font-black text-amber-700 justify-end">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{user.dailyGoalProgress}% Completed</span>
            </div>
          </div>
        </div>

        {/* Daily Goal Bar with Running Shimmer */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 mt-4 overflow-hidden border border-slate-200 relative">
          <div
            className="bg-gradient-to-r from-rose-500 via-amber-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-sm relative overflow-hidden"
            style={{ width: `${user.dailyGoalProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer-sweep pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Hero Quick Action: AI Book Page Scanner */}
      <div 
        onClick={() => {
          soundManager.playClick();
          setActiveTab('tutor');
        }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-amber-50/20 to-rose-50/30 p-6 shadow-sm border border-slate-200 hover:border-rose-400 cursor-pointer group hover:shadow-xl hover:shadow-rose-500/15 hover:-translate-y-1.5 transition-all duration-300 ease-out hover:bg-gradient-to-br hover:from-white hover:via-amber-50/50 hover:to-rose-50/60"
      >
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 group-hover:scale-110 transition-transform">
          <Camera className="w-40 h-40 text-slate-900" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[11px] font-black text-rose-700 mb-2.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" /> AI Textbook Scanner & Solver
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Capture or Upload a Textbook Page
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-sm leading-relaxed">
              Instant OCR transcription, step-by-step mathematical reasoning, key exam tips, and automatic note saving.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <img 
              src="/logo.png" 
              alt="AI Study Assistant Mascot" 
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
            />
            <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-rose-600/20 group-hover:scale-105 transition-all">
              <Camera className="w-4 h-4 text-white" />
              <span>Launch Scanner</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: 2-Column Core Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Daily MCQ Challenge Card */}
        <div 
          onClick={() => {
            soundManager.playClick();
            setActiveTab('quiz');
          }}
          className="bg-white border border-slate-200 hover:border-amber-400 rounded-3xl p-5 cursor-pointer transition-all duration-300 ease-out group flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1.5 hover:bg-gradient-to-br hover:from-white hover:to-amber-50/40"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow-sm">
                +15 Points
              </span>
            </div>
            <h4 className="font-black text-slate-900 text-base group-hover:text-amber-700 transition-colors">
              Daily MCQ Arena
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Sharpen your speed on high-frequency questions across Physics, Calculus, and Chemistry to earn bonus rewards.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-700">
            <span>Play Quiz</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Knowledge Vault Card */}
        <div 
          onClick={() => {
            soundManager.playClick();
            setActiveTab('vault');
          }}
          className="bg-white border border-slate-200 hover:border-rose-400 rounded-3xl p-5 cursor-pointer transition-all duration-300 ease-out group flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-1.5 hover:bg-gradient-to-br hover:from-white hover:to-rose-50/40"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                {vaultNotes.length} Notes Saved
              </span>
            </div>
            <h4 className="font-black text-slate-900 text-base group-hover:text-rose-600 transition-colors">
              Knowledge Vault
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Review your saved formulas, lecture notes, 3-minute audio podcasts, and 1-click printable cheat sheets.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-rose-600">
            <span>Open Vault</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Pomodoro Focus Timer Card (Clean Light Theme with Red/Amber Glow) */}
      <div className="bg-white border border-slate-200 hover:border-rose-300 rounded-3xl p-5 shadow-sm hover:shadow-lg hover:shadow-rose-500/15 hover:-translate-y-1 transition-all duration-300 ease-out relative overflow-hidden hover:bg-gradient-to-r hover:from-white hover:to-rose-50/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-black text-slate-900 text-sm sm:text-base">Pomodoro Focus Timer</h4>
                <span className={`px-2 py-0.5 text-[10px] font-black rounded-full uppercase ${
                  timerMode === 'focus'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {timerMode === 'focus' ? '🎯 Focus 25m' : '☕ Break 5m'}
                </span>
              </div>
              <p className="text-xs text-slate-500">Complete a 25-minute uninterrupted study block to earn 20 points</p>
            </div>
          </div>

          {/* Digital Timer Clock Display */}
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200">
            <span className="font-mono text-2xl font-black text-slate-900 tracking-wider">
              {formatTimer(pomodoroSeconds)}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTimer}
                title={isTimerRunning ? "Pause Timer" : "Start Pomodoro Focus"}
                className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-md shadow-rose-600/30 active:scale-95"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsTickingSoundOn(!isTickingSoundOn);
                }}
                title={isTickingSoundOn ? "Focus Ticking Sound On" : "Focus Ticking Sound Muted"}
                className={`p-2.5 rounded-xl border transition-all ${
                  isTickingSoundOn
                    ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                }`}
              >
                {isTickingSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={resetTimer}
                title="Reset Timer"
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200 shadow-sm active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Performance & Weakness Analytics */}
      <div className="bg-white border border-slate-200 hover:border-amber-300/80 rounded-3xl p-5 shadow-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <h4 className="font-black text-slate-900 text-sm sm:text-base">
              AI Subject Proficiency & Weakness Analytics
            </h4>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-block text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
              Weekly Diagnostics
            </span>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('profile');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-black text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 shrink-0 cursor-pointer transition-all hover:scale-105 active:scale-95"
              title="Add or manage subjects in your profile"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
              <span>+ Add a New Subject</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {user.weaknessAreas.map((area, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50 hover:bg-gradient-to-r hover:from-amber-50/40 hover:to-rose-50/30 p-3 rounded-2xl border border-slate-200/80 hover:border-amber-300/70 transition-all duration-200 hover:scale-[1.01]"
            >
              <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                <span className="text-slate-800">{area.subject}</span>
                <span className={
                  area.score >= 90 ? 'text-emerald-600' :
                  area.score >= 75 ? 'text-amber-700' : 'text-rose-600'
                }>
                  {area.score}% {area.score < 70 ? '⚠️ Needs Review' : area.score >= 90 ? '🏆 Mastered' : '📈 Steady Progress'}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    area.score >= 90 ? 'bg-emerald-500' :
                    area.score >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${area.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
