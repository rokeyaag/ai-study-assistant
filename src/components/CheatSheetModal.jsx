import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Printer, Copy, Check, Sparkles, FileText, Download } from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const CheatSheetModal = () => {
  const { cheatSheetNote, setCheatSheetNote, notify } = useApp();
  const [copied, setCopied] = useState(false);

  if (!cheatSheetNote) return null;

  const handleCopy = () => {
    soundManager.playSuccess();
    const textToCopy = `${cheatSheetNote.title}\n\nSubject: ${cheatSheetNote.subject}\nDate: ${cheatSheetNote.date}\n\n[Core Concepts & Formulas]\n${cheatSheetNote.summary}\n\n[Detailed Notes & Mechanism]\n${cheatSheetNote.fullContent}\n\nGenerated via AI Study Assistant`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    notify('📋 Copied to Clipboard!', 'Cheat sheet content successfully copied.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    soundManager.playSuccess();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 w-full max-w-lg max-h-[90vh] rounded-3xl p-6 shadow-2xl flex flex-col text-slate-900 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-amber-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-600" /> Printable Study Cheat Sheet
              </span>
              <h2 className="text-sm font-bold text-slate-900">{cheatSheetNote.subject}</h2>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              setCheatSheetNote(null);
            }}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Card Preview */}
        <div className="flex-1 overflow-y-auto my-4 pr-1 space-y-4 print:bg-white print:text-black">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-inner">
            <div className="flex items-center justify-between text-xs text-amber-700 font-semibold mb-2">
              <span className="font-bold">{cheatSheetNote.subject}</span>
              <span className="text-slate-500">{cheatSheetNote.date}</span>
            </div>
            <h2 className="text-lg font-black text-slate-900 mb-2 leading-snug">
              {cheatSheetNote.title}
            </h2>

            {/* Quick Summary / Key Formula Box */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 my-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                ⚡ Core Formulas & Key Summary:
              </span>
              <p className="text-xs text-slate-800 font-mono mt-1 whitespace-pre-line leading-relaxed">
                {cheatSheetNote.summary}
              </p>
            </div>

            {/* Full Notes Body */}
            <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line mt-3 border-t border-slate-200 pt-3">
              {cheatSheetNote.fullContent}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {cheatSheetNote.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-lg bg-white text-slate-700 border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 border border-slate-300 transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-600/20 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
