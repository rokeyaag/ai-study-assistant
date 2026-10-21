import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Camera, Upload, Sparkles, CheckCircle2, BookmarkPlus, Send, 
  Bot, HelpCircle, RefreshCw, Check, Lightbulb, User, Key,
  Image as ImageIcon, X, AlertCircle, FileText, ChevronRight
} from 'lucide-react';
import { soundManager } from '../utils/audioEffects';
import { 
  analyzeBookImage, 
  askSocraticTutor, 
  getStoredApiKey, 
  setStoredApiKey 
} from '../utils/aiService';

export const AITutorView = () => {
  const { SCAN_PRESETS, addNoteToVault, notify, user, isCompact } = useApp();

  const [selectedPreset, setSelectedPreset] = useState(SCAN_PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [activeSolution, setActiveSolution] = useState(SCAN_PRESETS[0].aiSolution);
  const [activeTitle, setActiveTitle] = useState(SCAN_PRESETS[0].title);
  const [activeSubject, setActiveSubject] = useState(SCAN_PRESETS[0].subject);
  const [activeOcrText, setActiveOcrText] = useState(SCAN_PRESETS[0].ocrText);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [isLiveGeminiActive, setIsLiveGeminiActive] = useState(false);

  // Gemini API Key Modal
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => getStoredApiKey());

  // Target Subject selector for uploaded image
  const [targetSubject, setTargetSubject] = useState('Physics');

  // Hidden File Inputs
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Socratic Chat State
  const [tutorPersona, setTutorPersona] = useState('mentor'); // 'mentor' | 'strict_coach' | 'curious'
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: `Hello ${user.name.split(' ')[0]}! 👋 I am your Socratic AI STEM Tutor. Snap a photo of your textbook problem, upload an assignment, or pick a sample problem below. Ask me anything if you'd like guidance on a specific step!`
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [isSavedToVault, setIsSavedToVault] = useState(false);

  // Select standard preset
  const handleSelectPreset = (preset) => {
    soundManager.playScan();
    setIsScanning(true);
    setSelectedPreset(preset);
    setUploadedImagePreview(null);
    setIsSavedToVault(false);
    setIsLiveGeminiActive(false);

    setTimeout(() => {
      setIsScanning(false);
      setActiveSolution(preset.aiSolution);
      setActiveTitle(preset.title);
      setActiveSubject(preset.subject);
      setActiveOcrText(preset.ocrText);
      soundManager.playSuccess();
      notify('📸 Problem Loaded', `Loaded sample problem for "${preset.subject}".`, 'success');
    }, 800);
  };

  // Handle Real Image Upload or Camera Capture
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      notify('Unsupported File Format', 'Please upload an image file (JPG, PNG, WebP).', 'error');
      return;
    }

    soundManager.playScan();
    setIsScanning(true);
    setIsSavedToVault(false);
    setSelectedPreset({ id: 'custom_upload' });

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result;
      setUploadedImagePreview(dataUrl);

      try {
        notify('🔍 AI OCR Scanning...', 'Extracting equations and generating logical solution...', 'info');
        const result = await analyzeBookImage(dataUrl, targetSubject);

        setIsScanning(false);
        setActiveTitle(result.title);
        setActiveSubject(result.subject);
        setActiveOcrText(result.ocrText);
        setActiveSolution(result.aiSolution);
        setIsLiveGeminiActive(Boolean(result.isLiveGemini));

        soundManager.playSuccess();
        notify(
          result.isLiveGemini ? '✨ Gemini Vision Analysis Complete' : '📸 AI Solution Ready',
          `Step-by-step breakdown generated for "${result.subject}".`,
          'success'
        );
      } catch (err) {
        setIsScanning(false);
        soundManager.playError();
        notify('Analysis Failed', 'Could not process image. Please try again.', 'error');
      }
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSaveToVault = () => {
    if (isSavedToVault) return;
    const newNote = {
      id: `note-${Date.now()}`,
      title: activeTitle,
      subject: activeSubject,
      date: 'Today',
      summary: activeSolution.formula,
      tags: activeSolution.tags || ['AI Scan', activeSubject],
      readTime: '2 min',
      hasPodcast: true,
      podcastDuration: '2:30 min',
      imagePreview: uploadedImagePreview || null,
      fullContent: `[Problem Statement]\n${activeOcrText}\n\n[Step-by-Step Derivation]\n${activeSolution.steps.map(s => `${s.step}. ${s.title}: ${s.detail}`).join('\n\n')}\n\n[Exam Strategy Tips]\n${activeSolution.examTips}`
    };

    addNoteToVault(newNote);
    setIsSavedToVault(true);
  };

  const handleSendMessage = async (textToSend = inputQuestion) => {
    if (!textToSend.trim() || isBotThinking) return;

    soundManager.playClick();
    const userMsg = { sender: 'user', text: textToSend };
    setChatMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsBotThinking(true);

    try {
      const reply = await askSocraticTutor(
        textToSend,
        {
          subject: activeSubject,
          title: activeTitle,
          formula: activeSolution.formula
        },
        tutorPersona
      );

      setIsBotThinking(false);
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      soundManager.playSuccess();
    } catch (e) {
      setIsBotThinking(false);
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Notice: Could not connect to network tutor. Review the intermediate steps above and double check all variable units!'
        }
      ]);
    }
  };

  const handleSaveApiKey = () => {
    setStoredApiKey(apiKeyInput);
    setShowApiKeyModal(false);
    notify('🔑 API Key Saved', apiKeyInput ? 'Google Gemini Vision API key active.' : 'Reverted to built-in smart solver.', 'info');
  };

  return (
    <div className="space-y-6 pb-6 animate-in fade-in duration-300">
      {/* Hidden file and camera inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleImageFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Top Banner: AI Scanner Controller */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-sm">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-base sm:text-lg text-slate-900">
                  AI Textbook Scanner & Socratic Tutor
                </h2>
                {isLiveGeminiActive && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Gemini Vision Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Capture book pages, formulas, or diagrams for step-by-step reasoning
              </p>
            </div>
          </div>

          {/* Action Buttons: Take Photo & Upload Image */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                cameraInputRef.current?.click();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>Camera</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                fileInputRef.current?.click();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-all active:scale-95"
            >
              <Upload className="w-4 h-4 text-slate-600" />
              <span>Upload</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setShowApiKeyModal(true);
              }}
              title="Configure Google Gemini API Key"
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors"
            >
              <Key className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sample Textbook Presets */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Or Try Sample Problem Scans:
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px]">Upload Subject:</span>
              <select
                value={targetSubject}
                onChange={(e) => setTargetSubject(e.target.value)}
                className="bg-slate-50 text-slate-800 text-xs py-0.5 px-2 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Physics">Physics</option>
                <option value="Higher Math">Higher Math</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>
          </div>

          <div className={`grid gap-2 ${
            isCompact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"
          }`}>
            {SCAN_PRESETS.map((preset) => {
              const isSelected = selectedPreset.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-300 shadow-sm'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <img
                    src={preset.previewImage}
                    alt={preset.subject}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
                      {preset.subject}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 truncate">
                      {preset.title.split(':')[1] || preset.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Solution & Socratic Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Solution & Reasoning (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            {/* Header: Title & Subject */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="px-2.5 py-0.5 text-[10px] font-black rounded-full bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider">
                  {activeSubject}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1.5 leading-snug">
                  {activeTitle}
                </h3>
              </div>

              {/* Save to Vault Action Button */}
              <button
                onClick={handleSaveToVault}
                disabled={isSavedToVault}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm ${
                  isSavedToVault
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                    : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95'
                }`}
              >
                {isSavedToVault ? <Check className="w-4 h-4 text-emerald-600" /> : <BookmarkPlus className="w-4 h-4" />}
                <span>{isSavedToVault ? 'Saved to Vault' : 'Save to Vault'}</span>
              </button>
            </div>

            {/* Uploaded / Selected Image Thumbnail if Available */}
            {uploadedImagePreview && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-48 bg-slate-100">
                <img
                  src={uploadedImagePreview}
                  alt="Scanned Homework"
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-sm">
                  Uploaded Document
                </span>
              </div>
            )}

            {/* OCR Transcribed Text Box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                Extracted Problem Statement (OCR):
              </span>
              <p className="text-xs text-slate-800 font-mono whitespace-pre-line leading-relaxed">
                {activeOcrText}
              </p>
            </div>

            {/* Key Formula Box in Amber */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Key Scientific Laws & Equations
              </div>
              <pre className="font-mono text-xs sm:text-sm font-bold text-amber-950 whitespace-pre-line leading-relaxed">
                {activeSolution.formula}
              </pre>
            </div>

            {/* Step-by-Step Numerical Reasoning */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                Step-by-Step Breakdown:
              </span>

              {activeSolution.steps.map((st) => (
                <div
                  key={st.step}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                      {st.step}
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {st.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                    {st.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Exam Strategy Tips in Rose */}
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-black text-rose-800 uppercase tracking-wider block">
                  Exam Strategy Tip:
                </span>
                <p className="text-xs text-rose-900 mt-0.5 leading-relaxed">
                  {activeSolution.examTips}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Socratic AI Tutor Dialogue (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col flex-1 h-[560px]">
            {/* Socratic Header & Persona Switcher */}
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-black text-xs sm:text-sm text-slate-900">
                    Socratic Tutor
                  </h4>
                  <p className="text-[10px] text-slate-400">Interactive Reasoning Assistant</p>
                </div>
              </div>

              {/* Persona Selector */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[10px]">
                {[
                  { id: 'mentor', label: 'Mentor' },
                  { id: 'strict_coach', label: 'Coach' },
                  { id: 'curious', label: 'Deep' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      soundManager.playClick();
                      setTutorPersona(p.id);
                    }}
                    className={`px-2 py-1 rounded-lg font-bold transition-all ${
                      tutorPersona === p.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs">
              {chatMessages.map((msg, idx) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={idx}
                    className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <img 
                        src="/logo.png" 
                        alt="AI Tutor Avatar" 
                        className="w-7 h-7 rounded-full object-cover border border-amber-300 shadow-sm flex-shrink-0 bg-white" 
                      />
                    )}
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl leading-relaxed text-xs ${
                        isUser
                          ? 'bg-slate-900 text-white rounded-br-none shadow-sm'
                          : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isBotThinking && (
                <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                  <span>AI Tutor is thinking...</span>
                </div>
              )}
            </div>

            {/* Quick Socratic Prompt Prompts */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5 mb-2">
              {[
                'Why this formula?',
                'Explain Step 2',
                'What is the common mistake?'
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                placeholder="Ask your AI tutor a question..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputQuestion.trim() || isBotThinking}
                className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 disabled:opacity-40 text-white transition-all shadow-sm active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Gemini API Key Configuration Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                  <Key className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">Google Gemini API Setup</h3>
              </div>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              To enable live multimodal image analysis with <strong>Gemini 1.5 Flash Vision</strong>, enter your free Google Gemini API key below. If left empty, the application will use the intelligent built-in academic solver.
            </p>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Gemini API Key:
              </label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleSaveApiKey}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
              >
                Save API Key
              </button>
              {apiKeyInput && (
                <button
                  onClick={() => {
                    setApiKeyInput('');
                    setStoredApiKey('');
                    setShowApiKeyModal(false);
                    notify('API Key Cleared', 'Using built-in academic solver.', 'info');
                  }}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs border border-slate-200"
                >
                  Clear Key
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
