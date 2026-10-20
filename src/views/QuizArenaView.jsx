import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, 
  Sparkles, Flame, Coins, Zap, HelpCircle, BookOpen,
  Printer, BookmarkPlus, Check, Award, ChevronDown, ChevronUp,
  FileText, Star, Filter
} from 'lucide-react';
import { soundManager } from '../utils/audioEffects';
import confetti from 'canvas-confetti';

export const QuizArenaView = () => {
  const { MOCK_QUIZ_QUESTIONS, addPoints, setActiveTab, addNoteToVault, notify, user } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [totalPointsEarned, setTotalPointsEarned] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All');
  
  // Track detailed answers for the Result Sheet
  const [userAnswers, setUserAnswers] = useState({});
  const [resultFilter, setResultFilter] = useState('all'); // 'all' | 'correct' | 'incorrect'
  const [savedQuestionIds, setSavedQuestionIds] = useState([]);

  const filteredQuestions = selectedSubjectFilter === 'All'
    ? MOCK_QUIZ_QUESTIONS
    : MOCK_QUIZ_QUESTIONS.filter(q => q.subject === selectedSubjectFilter);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    soundManager.playClick();
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;

    // Record answer in result sheet state
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        questionText: currentQ.question,
        subject: currentQ.subject,
        options: currentQ.options,
        selectedOptionIndex: selectedOption,
        selectedOptionText: currentQ.options[selectedOption],
        correctOptionIndex: currentQ.correctIndex,
        correctOptionText: currentQ.options[currentQ.correctIndex],
        isCorrect,
        explanation: currentQ.explanation,
        pointsReward: currentQ.pointsReward
      }
    }));

    if (isCorrect) {
      soundManager.playReward();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
      setQuizScore(prev => prev + 1);
      setTotalPointsEarned(prev => prev + currentQ.pointsReward);
      addPoints(currentQ.pointsReward, `correct quiz answer (#${currentQ.subject})`);
    } else {
      soundManager.playError();
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      soundManager.playSuccess();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestartQuiz = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setTotalPointsEarned(0);
    setIsQuizCompleted(false);
    setUserAnswers({});
    setResultFilter('all');
    setSavedQuestionIds([]);
  };

  const handleSaveQuestionToVault = (qRecord) => {
    soundManager.playSuccess();
    const newNote = {
      id: `quiz-note-${Date.now()}`,
      title: `Quiz Review: ${qRecord.subject}`,
      subject: qRecord.subject,
      date: 'Today',
      summary: `Q: ${qRecord.questionText}\nCorrect: ${qRecord.correctOptionText}`,
      tags: ['Quiz Review', qRecord.subject, 'Exam Prep'],
      readTime: '1 min',
      hasPodcast: false,
      fullContent: `[Question]\n${qRecord.questionText}\n\n[Options]\n${qRecord.options.map((opt, i) => `${['A','B','C','D'][i]}. ${opt}`).join('\n')}\n\n[Correct Answer]\n${['A','B','C','D'][qRecord.correctOptionIndex]}. ${qRecord.correctOptionText}\n\n[Detailed Solution & Rationale]\n${qRecord.explanation}`
    };

    addNoteToVault(newNote);
    setSavedQuestionIds(prev => [...prev, qRecord.questionId]);
    notify('Saved to Vault!', 'Question added to your Knowledge Vault for revision.', 'success');
  };

  const handlePrintResultSheet = () => {
    soundManager.playSuccess();
    window.print();
  };

  // Grade calculation
  const totalQuestionsCount = filteredQuestions.length;
  const accuracyPercentage = Math.round((quizScore / totalQuestionsCount) * 100);

  let letterGrade = 'A+';
  let gradeRemarks = 'Outstanding Mastery!';
  let gradeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';

  if (accuracyPercentage >= 90) {
    letterGrade = 'A+';
    gradeRemarks = 'Outstanding Mastery!';
    gradeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  } else if (accuracyPercentage >= 80) {
    letterGrade = 'A';
    gradeRemarks = 'Excellent Performance!';
    gradeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  } else if (accuracyPercentage >= 70) {
    letterGrade = 'B+';
    gradeRemarks = 'Very Good Effort!';
    gradeColor = 'text-amber-700 bg-amber-50 border-amber-300';
  } else if (accuracyPercentage >= 60) {
    letterGrade = 'B';
    gradeRemarks = 'Good, Room for Revision';
    gradeColor = 'text-amber-700 bg-amber-50 border-amber-300';
  } else {
    letterGrade = 'C';
    gradeRemarks = 'Needs Focused Review';
    gradeColor = 'text-rose-700 bg-rose-50 border-rose-300';
  }

  // Filtered review list for result sheet
  const reviewedQuestionsList = filteredQuestions.map((q) => {
    return userAnswers[q.id] || {
      questionId: q.id,
      questionText: q.question,
      subject: q.subject,
      options: q.options,
      selectedOptionIndex: null,
      selectedOptionText: 'Not Attempted',
      correctOptionIndex: q.correctIndex,
      correctOptionText: q.options[q.correctIndex],
      isCorrect: false,
      explanation: q.explanation,
      pointsReward: q.pointsReward
    };
  }).filter((q) => {
    if (resultFilter === 'correct') return q.isCorrect;
    if (resultFilter === 'incorrect') return !q.isCorrect;
    return true;
  });

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      {/* Top Banner (Visible during active quiz) */}
      {!isQuizCompleted && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                <Trophy className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-black text-base sm:text-lg text-slate-900">Interactive Quiz Arena</h2>
                  <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    MCQ Arena
                  </span>
                </div>
                <p className="text-xs text-slate-500">Earn 10 to 15 reward points for every correct question</p>
              </div>
            </div>

            {/* Subject Filter Chips */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {['All', 'Physics', 'Higher Math', 'Chemistry', 'Biology', 'Computer Science'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedSubjectFilter(sub);
                    handleRestartQuiz();
                  }}
                  className={`px-3 py-1 rounded-xl text-[11px] font-black transition-all ${
                    selectedSubjectFilter === sub
                      ? 'bg-amber-500 text-white shadow-sm scale-105'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Question Card Screen */}
      {!isQuizCompleted ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          {/* Progress Bar & Header Stats */}
          <div>
            <div className="flex justify-between items-center text-xs font-black text-slate-500 mb-2">
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                {currentQ.subject}
              </span>
              <span className="text-slate-800">Question {currentIndex + 1} of {filteredQuestions.length}</span>
              <span className="text-amber-700 flex items-center gap-1 font-black">
                <Coins className="w-3.5 h-3.5 text-amber-600" /> +{currentQ.pointsReward} Pts
              </span>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;

              let optionStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold shadow-sm';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
                } else {
                  optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                }
              } else if (isSelected) {
                optionStyle = 'bg-amber-50 border-amber-400 text-amber-950 font-bold shadow-sm';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${
                      isSelected
                        ? 'bg-amber-500 text-white'
                        : isAnswerSubmitted && isCorrectAnswer
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-xs sm:text-sm font-medium">{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Revealed after submission) */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-2xl border animate-in fade-in duration-200 ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-center gap-2 text-xs font-black mb-1">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Correct! +{currentQ.pointsReward} Points Added</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Incorrect Option Selected</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                <strong>Explanation:</strong> {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              Session Progress: <strong className="text-slate-900 font-bold">{quizScore}</strong> correct so far
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-black text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <span>Confirm Answer</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <span>{currentIndex + 1 < filteredQuestions.length ? 'Next Question' : 'View Full Result Sheet'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Comprehensive Official Result & Mark Sheet Interface */
        <div className="space-y-6">
          {/* Official Mark Sheet Banner */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden print:border-none print:shadow-none">
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              {/* Institution / Student Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 shadow-md shadow-rose-600/20 flex items-center justify-center">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <Trophy className="w-7 h-7 text-amber-500" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase text-amber-700 tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Official Assessment Report
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      Quiz Examination Result Sheet
                    </h2>
                    <p className="text-xs text-slate-500">
                      Student: <strong className="text-slate-800">{user.name}</strong> • Subject Stream: <strong className="text-slate-800">{selectedSubjectFilter === 'All' ? 'All Subjects' : selectedSubjectFilter}</strong>
                    </p>
                  </div>
                </div>

                {/* Grade Badge */}
                <div className={`px-4 py-2.5 rounded-2xl border text-center ${gradeColor}`}>
                  <span className="text-[10px] font-black uppercase tracking-wider block">Final Grade</span>
                  <div className="text-2xl sm:text-3xl font-black leading-none my-0.5">{letterGrade}</div>
                  <span className="text-[11px] font-bold">{gradeRemarks}</span>
                </div>
              </div>

              {/* 4-Column Performance Metrics Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                {/* Total Marks */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                    Marks Obtained
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">{quizScore}</span>
                    <span className="text-xs text-slate-500 font-bold">/ {totalQuestionsCount}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Total Questions</span>
                </div>

                {/* Accuracy Percentage */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                    Score Accuracy
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-600">{accuracyPercentage}%</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold">
                    {quizScore >= 3 ? 'Qualified & Passed' : 'Below Passing'}
                  </span>
                </div>

                {/* Correct vs Incorrect */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                    Answer Breakdown
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {quizScore} Correct
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-xs font-bold text-rose-600 flex items-center gap-0.5">
                      <XCircle className="w-3.5 h-3.5" /> {totalQuestionsCount - quizScore} Wrong
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Evaluation Detail</span>
                </div>

                {/* Reward Points */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-amber-800 font-extrabold uppercase tracking-wider block">
                    Points Earned
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-amber-900">+{totalPointsEarned}</span>
                    <span className="text-xs text-amber-700 font-bold">Pts</span>
                  </div>
                  <span className="text-[10px] text-amber-700 font-medium">Added to Wallet</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 print:hidden">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRestartQuiz}
                    className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 border border-slate-200 transition-all active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Quiz</span>
                  </button>
                  <button
                    onClick={handlePrintResultSheet}
                    className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>

                <button
                  onClick={() => setActiveTab('store')}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <Coins className="w-4 h-4" />
                  <span>Redeem Points for Pro</span>
                </button>
              </div>
            </div>
          </div>

          {/* Question-by-Question Detailed Review Sheet */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600" />
                  Itemized Question & Solution Review Sheet
                </h3>
                <p className="text-xs text-slate-500">
                  Review your responses, correct answers, and comprehensive academic explanations
                </p>
              </div>

              {/* Filter Tabs for Result Sheet */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs print:hidden">
                {[
                  { id: 'all', label: `All (${totalQuestionsCount})` },
                  { id: 'correct', label: `Correct (${quizScore})` },
                  { id: 'incorrect', label: `Incorrect (${totalQuestionsCount - quizScore})` }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      soundManager.playClick();
                      setResultFilter(f.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      resultFilter === f.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {reviewedQuestionsList.map((qRecord, idx) => {
                const isSaved = savedQuestionIds.includes(qRecord.questionId);

                return (
                  <div
                    key={qRecord.questionId}
                    className={`p-5 rounded-2xl border transition-all ${
                      qRecord.isCorrect
                        ? 'bg-emerald-50/20 border-emerald-200'
                        : 'bg-rose-50/20 border-rose-200'
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-black rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                          Question {idx + 1}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                          {qRecord.subject}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {qRecord.isCorrect ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Correct (+{qRecord.pointsReward} Pts)
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-black flex items-center gap-1 border border-rose-300">
                            <XCircle className="w-3 h-3 text-rose-600" /> Incorrect (0 Pts)
                          </span>
                        )}

                        {/* Save to Vault Action Button */}
                        <button
                          onClick={() => handleSaveQuestionToVault(qRecord)}
                          disabled={isSaved}
                          title="Save this question and solution to your Knowledge Vault"
                          className={`p-1.5 rounded-xl border text-xs font-bold transition-all print:hidden ${
                            isSaved
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default'
                              : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <BookmarkPlus className="w-3.5 h-3.5 text-slate-600" />}
                        </button>
                      </div>
                    </div>

                    {/* Question Statement */}
                    <h4 className="font-bold text-slate-900 text-sm mb-3 leading-snug">
                      {qRecord.questionText}
                    </h4>

                    {/* Student's Answer vs. Correct Answer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      {/* Student's Choice */}
                      <div className={`p-3 rounded-xl border ${
                        qRecord.isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}>
                        <span className="text-[10px] uppercase font-extrabold tracking-wider block mb-0.5 opacity-80">
                          Your Selected Answer:
                        </span>
                        <div className="flex items-center gap-1.5 font-bold">
                          {qRecord.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />}
                          <span>{qRecord.selectedOptionText}</span>
                        </div>
                      </div>

                      {/* Correct Answer */}
                      <div className="p-3 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-900">
                        <span className="text-[10px] uppercase font-extrabold tracking-wider block mb-0.5 text-emerald-800">
                          Official Correct Answer:
                        </span>
                        <div className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{qRecord.correctOptionText}</span>
                        </div>
                      </div>
                    </div>

                    {/* Step-by-Step Explanation Box */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs">
                      <span className="font-bold text-slate-800 block mb-1">
                        💡 Mathematical & Scientific Rationale:
                      </span>
                      <p className="text-slate-600 leading-relaxed font-mono">
                        {qRecord.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
