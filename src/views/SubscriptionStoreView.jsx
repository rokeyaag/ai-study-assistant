import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Gem, Coins, Sparkles, CheckCircle2, Gift, Share2, 
  Copy, Check, ArrowRight, ShieldCheck, Zap, Award 
} from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const SubscriptionStoreView = () => {
  const { user, redeemPointsForPro, addPoints, notify } = useApp();
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [dailyClaimed, setDailyClaimed] = useState(false);

  const isPro = user.subscription.tier === 'pro';
  const progressPercent = Math.min(100, Math.round((user.points / 100) * 100));

  const handleCopyReferral = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(`https://aistudyassistant.app/invite?code=RAFI-STUDY-2026`);
    setCopiedReferral(true);
    notify('🔗 Invite Link Copied!', 'Share with friends to earn +25 points on signup.', 'success');
    setTimeout(() => setCopiedReferral(false), 2500);
  };

  const handleClaimDailyBonus = () => {
    if (dailyClaimed) return;
    setDailyClaimed(true);
    addPoints(10, 'daily login attendance');
  };

  return (
    <div className="space-y-6 pb-6 animate-in fade-in duration-300">
      {/* Hero Points Wallet & Pro Status Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-rose-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-black uppercase tracking-wider border border-amber-200 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-600" /> Reward Points Wallet
              </span>
              {isPro && (
                <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-black border border-rose-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" /> PRO ACTIVE
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {user.points}
              </h2>
              <span className="text-sm font-bold text-amber-700">Reward Points</span>
            </div>

            <p className="text-xs text-slate-600 mt-2 max-w-sm leading-relaxed">
              Study continuously, win daily MCQ challenges, and redeem every 100 points for <strong className="text-slate-900 font-bold">1 Month of Full Pro Scholar Access</strong>!
            </p>
          </div>

          {/* Redeem CTA Button */}
          <div className="w-full md:w-auto flex flex-col gap-2">
            <button
              onClick={redeemPointsForPro}
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-sm ${
                user.points >= 100
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:scale-105 shadow-amber-400/20 cursor-pointer active:scale-95'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <Gem className="w-4 h-4 text-slate-950 fill-slate-950" />
              <span>Redeem 100 Points for 1 Month Pro</span>
            </button>

            {/* Progress to next 100 points */}
            <div className="text-center">
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200 my-1">
                <div
                  className="bg-gradient-to-r from-rose-500 to-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-500 font-bold">
                {user.points >= 100 ? '✅ Ready to redeem now!' : `${100 - user.points} points needed (${progressPercent}% progress)`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Claim & Invite Bonus Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Daily Login Reward */}
        <div className="bg-white border border-slate-200 hover:border-rose-400 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:shadow-rose-500/15 hover:-translate-y-1.5 hover:bg-gradient-to-br hover:from-white hover:to-rose-50/20 transition-all duration-300 ease-out flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200">
                <Gift className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black border border-rose-200">
                +10 Pts Daily
              </span>
            </div>
            <h4 className="font-black text-slate-900 text-sm sm:text-base">Daily Attendance Bonus</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Open the app every day to claim 10 free reward points and maintain your study streak.
            </p>
          </div>

          <button
            onClick={handleClaimDailyBonus}
            disabled={dailyClaimed}
            className={`mt-4 w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
              dailyClaimed
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm active:scale-95'
            }`}
          >
            {dailyClaimed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Sparkles className="w-4 h-4" />}
            <span>{dailyClaimed ? 'Claimed for Today' : 'Claim Daily Bonus (+10 Pts)'}</span>
          </button>
        </div>

        {/* Refer a Friend */}
        <div className="bg-white border border-slate-200 hover:border-amber-400 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:shadow-amber-500/15 hover:-translate-y-1.5 hover:bg-gradient-to-br hover:from-white hover:to-amber-50/20 transition-all duration-300 ease-out flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-black border border-amber-200">
                +25 Pts Referral
              </span>
            </div>
            <h4 className="font-black text-slate-900 text-sm sm:text-base">Invite a Classmate</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Earn 25 reward points instantly whenever a friend signs up with your personal study link.
            </p>
          </div>

          <button
            onClick={handleCopyReferral}
            className="mt-4 w-full py-2.5 rounded-xl text-xs font-black bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            {copiedReferral ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedReferral ? 'Link Copied to Clipboard!' : 'Copy Invite Link (+25 Pts)'}</span>
          </button>
        </div>
      </div>

      {/* Pro Scholar Perks Comparison Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black text-slate-900">Pro Scholar Privileges</h3>
            <p className="text-xs text-slate-500">Compare standard access with Pro Scholar perks</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
            100 Points / Month
          </span>
        </div>

        <div className="space-y-3">
          {[
            {
              title: "Unlimited AI Multimodal Book Scans",
              desc: "Instant camera captures with full equation derivations & diagrams.",
              badge: "Pro Unlimited"
            },
            {
              title: "24/7 Socratic Voice & Text Tutor",
              desc: "Interactive guided reasoning with custom mentor personas.",
              badge: "Full Access"
            },
            {
              title: "1-Click Printable Cheat Sheets & PDFs",
              desc: "Clean formula summaries formatted for printer and PDF export.",
              badge: "All Subjects"
            },
            {
              title: "3-Minute Audio Podcast Generator",
              desc: "Listen to rapid auditory recaps on the go before class.",
              badge: "Multi-Voice"
            }
          ].map((perk, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">{perk.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{perk.desc}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-white text-slate-700 text-[10px] font-bold border border-slate-200 whitespace-nowrap shadow-xs">
                {perk.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
