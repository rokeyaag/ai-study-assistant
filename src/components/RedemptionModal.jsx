import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, CheckCircle2, Zap, ShieldCheck, BookOpenCheck } from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const RedemptionModal = () => {
  const { isRedemptionSuccessModalOpen, setIsRedemptionSuccessModalOpen, user } = useApp();

  if (!isRedemptionSuccessModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-amber-300 w-full max-w-sm rounded-3xl p-6 shadow-2xl shadow-amber-500/10 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-amber-400/15 rounded-full blur-2xl"></div>

        {/* Badge icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 shadow-md shadow-rose-600/20 mb-4 flex items-center justify-center animate-bounce">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center border border-amber-100">
            <Sparkles className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider border border-amber-200">
          PRO SCHOLAR UNLOCKED
        </span>

        <h2 className="text-xl font-black text-slate-900 mt-3 mb-1">
          Congratulations {user.name.split(' ')[0]}! 🎓
        </h2>
        <p className="text-xs text-slate-600 mb-5 leading-relaxed">
          Your 100 reward points have successfully activated <span className="text-amber-700 font-bold">1 Month of Pro Scholar Membership</span>.
        </p>

        {/* Benefits list */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2.5 mb-6 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Unlimited AI textbook page scanning & solutions</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>24/7 interactive Socratic voice tutor access</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>1-Click printable cheat sheets & audio recap exports</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>Special competitive & board exam question banks</span>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            setIsRedemptionSuccessModalOpen(false);
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-sm shadow-md shadow-rose-600/30 active:scale-95 transition-all"
        >
          Awesome! Start Studying 🚀
        </button>
      </div>
    </div>
  );
};
