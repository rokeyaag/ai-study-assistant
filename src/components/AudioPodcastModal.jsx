import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Play, Pause, RotateCcw, Volume2, Sparkles, Mic, Headphones } from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const AudioPodcastModal = () => {
  const { activePodcastNote, setActivePodcastNote, addPoints } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [voice, setVoice] = useState('academic_mentor'); // 'academic_mentor' | 'exam_coach' | 'fast_recap'
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            addPoints(5, 'completing 3-minute Audio Podcast lesson');
            return 100;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  if (!activePodcastNote) return null;

  const togglePlay = () => {
    soundManager.playClick();
    if (progress >= 100) {
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    soundManager.playClick();
    setIsPlaying(false);
    setActivePodcastNote(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl p-6 shadow-2xl text-slate-900 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-black text-amber-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-600" /> AI 3-Min Audio Podcast
              </span>
              <h2 className="text-sm font-bold text-slate-900 line-clamp-1">{activePodcastNote.subject}</h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note Cover / Visualizer */}
        <div className="my-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-500 to-amber-400 p-0.5 shadow-md shadow-rose-500/20 mb-4 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center p-2">
              <Mic className="w-8 h-8 text-amber-600 mb-1" />
              <span className="text-[9px] font-extrabold text-slate-800">AI Audio Lab</span>
            </div>
          </div>
          <h2 className="font-extrabold text-base sm:text-lg text-slate-900 mb-1 leading-snug">
            {activePodcastNote.title}
          </h2>
          <p className="text-xs text-slate-600 px-4 line-clamp-2">
            {activePodcastNote.summary}
          </p>

          {/* Animated Waveform Visualizer in Rose & Amber */}
          <div className="flex items-center justify-center gap-1.5 h-12 my-4 px-6">
            {[40, 75, 25, 90, 60, 100, 45, 80, 30, 95, 70, 50, 85, 35, 65].map((height, i) => (
              <div
                key={i}
                className="w-1.5 bg-gradient-to-t from-rose-600 to-amber-500 rounded-full transition-all duration-200"
                style={{
                  height: isPlaying ? `${Math.max(15, (height * (Math.sin(Date.now() / 200 + i) + 1.2)) / 2.2)}%` : '20%',
                  opacity: isPlaying ? 0.95 : 0.4
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-[11px] text-slate-500 font-mono mb-1">
            <span className="text-amber-600 font-bold">{Math.floor(progress / 100 * 3)}:{String(Math.floor((progress / 100 * 180) % 60)).padStart(2, '0')}</span>
            <span>{activePodcastNote.podcastDuration || '3:00 min'}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden cursor-pointer relative border border-slate-200">
            <div
              className="bg-gradient-to-r from-rose-600 to-amber-500 h-full rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Voice Selector */}
        <div className="flex items-center justify-center gap-2 mb-6 text-xs">
          <span className="text-slate-500 text-[11px] font-semibold">AI Voice:</span>
          {[
            { id: 'academic_mentor', label: '👨‍🏫 Academic Mentor' },
            { id: 'exam_coach', label: '⚡ Exam Coach' },
            { id: 'fast_recap', label: '🚀 Rapid Recap' }
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => {
                soundManager.playClick();
                setVoice(v.id);
              }}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                voice === v.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => {
              soundManager.playClick();
              setProgress(0);
            }}
            className="p-2.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            title="Restart from beginning"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 ml-1 fill-white" />}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setPlaybackSpeed(prev => prev === 1.0 ? 1.25 : prev === 1.25 ? 1.5 : 1.0);
            }}
            className="px-2.5 py-1.5 text-xs font-mono font-black text-amber-700 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors"
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>
    </div>
  );
};
