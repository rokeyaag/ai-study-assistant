import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, Search, Plus, Headphones, FileText, Trash2, 
  Sparkles, Zap, Tag, Clock, Check, ArrowRight, X 
} from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const KnowledgeVaultView = () => {
  const { 
    vaultNotes, deleteNoteFromVault, addNoteToVault, 
    setActivePodcastNote, setCheatSheetNote, setActiveTab 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);

  // New Note Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Important, Formula');

  const filteredNotes = vaultNotes.filter((note) => {
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    const matchesQuery = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesQuery;
  });

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    const note = {
      id: `note-${Date.now()}`,
      title: newTitle,
      subject: newSubject,
      date: 'Today',
      summary: newSummary,
      tags: newTags.split(',').map(t => t.trim()),
      readTime: '2 min',
      hasPodcast: true,
      podcastDuration: '2:30 min',
      fullContent: newContent || newSummary
    };

    addNoteToVault(note);
    setIsAddNoteModalOpen(false);
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      {/* View Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-base sm:text-lg text-slate-900">Knowledge Vault</h2>
                <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                  {vaultNotes.length} Notes Saved
                </span>
              </div>
              <p className="text-xs text-slate-500">Your curated formulas, AI scans, audio summaries, and revision sheets</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              setIsAddNoteModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Note</span>
          </button>
        </div>

        {/* Search Bar & Subject Filter Chips */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes by keyword, topic, or formula..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {['All', 'Physics', 'Higher Math', 'Chemistry', 'Biology'].map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedSubject(sub);
                }}
                className={`px-3 py-1 rounded-xl text-[11px] font-black transition-all ${
                  selectedSubject === sub
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white border border-slate-200 hover:border-amber-400 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:shadow-amber-500/15 hover:-translate-y-1.5 hover:bg-gradient-to-br hover:from-white hover:to-amber-50/20 flex flex-col justify-between transition-all duration-300 ease-out group"
            >
              <div>
                {/* Subject Badge & Action Bar */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="px-2.5 py-0.5 text-[10px] font-black rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                    {note.subject}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {note.readTime || '2 min'}
                    </span>
                    <span>•</span>
                    <span>{note.date}</span>
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        deleteNoteFromVault(note.id);
                      }}
                      title="Delete note"
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                  {note.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {note.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {note.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[9px] font-medium rounded-md bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: 3-Min Podcast & Cheat Sheet */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                {note.hasPodcast && (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActivePodcastNote(note);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span>Listen Podcast</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    soundManager.playClick();
                    setCheatSheetNote(note);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Cheat Sheet</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700 text-sm">No Notes Found</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Try adjusting your search keywords or upload a new textbook scan from the AI Tutor tab.
          </p>
        </div>
      )}

      {/* Add New Note Modal */}
      {isAddNoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-base">Create Knowledge Note</h3>
              <button
                onClick={() => setIsAddNoteModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Subject Stream:
                </label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                >
                  <option value="Physics">Physics</option>
                  <option value="Higher Math">Higher Math</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Note Title:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Electromagnetic Induction & Faraday's Law"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Core Summary / Formulas:
                </label>
                <textarea
                  required
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="e.g., ε = -dΦ/dt = -N(ΔΦ/Δt)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Detailed Lecture Notes:
                </label>
                <textarea
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Detailed principles, derivations, and exam problem strategies..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Tags (comma separated):
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Electromagnetism, Induction, Physics"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddNoteModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-sm transition-all active:scale-95"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
