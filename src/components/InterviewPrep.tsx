import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { fetchInterviewPrep } from '../services/apiClient';
import { InterviewQuestion } from '../types/resume';
import {
  Sparkles,
  Bot,
  HelpCircle,
  CheckCircle2,
  Mic,
  ArrowRight,
  Shield,
  Layers,
  ChevronDown
} from 'lucide-react';

export const InterviewPrep: React.FC = () => {
  const { currentResume, useCredit, addNotification } = useResume();
  const [roleInput, setRoleInput] = useState(currentResume.targetRole || 'Software Engineer');
  const [companyInput, setCompanyInput] = useState('Top Tech Company');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<InterviewQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleGenerateQuestions = async () => {
    if (!useCredit(1)) return;
    setLoading(true);

    const res = await fetchInterviewPrep({
      targetRole: roleInput,
      targetCompany: companyInput,
      resumeText: `${currentResume.summary}\n${currentResume.experiences.map((e) => e.highlights.join(' ')).join(' ')}`,
    });

    setQuestions(res.questions || []);
    if (res.questions && res.questions.length > 0) {
      setActiveQuestion(res.questions[0]);
    }
    setLoading(false);
    addNotification('Generated realistic interview questions!', 'success');
  };

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) {
      addNotification('Please type your draft answer first', 'warning');
      return;
    }
    setFeedback(
      `Strong answer! You clearly outlined your actions. To elevate this from good to outstanding: 1) Explicitly state the measurable percentage outcome or business impact, 2) Mention which specific technical tools or team members you collaborated with.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="border-b border-slate-200 pb-6 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold mb-2">
            <Bot className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Mock Interview Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Interview Question Generator & STAR Coach
          </h1>
          <p className="text-sm text-slate-600">
            Practice realistic Behavioral, Technical, Situational, and Resume-specific questions tailored to your experience.
          </p>
        </div>

        {/* INPUTS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Role</label>
            <input
              type="text"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-lg"
              placeholder="e.g. Senior Software Engineer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Company</label>
            <input
              type="text"
              value={companyInput}
              onChange={(e) => setCompanyInput(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-lg"
              placeholder="e.g. Google, Amazon, Stripe"
            />
          </div>

          <button
            onClick={handleGenerateQuestions}
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Generate Questions (1 Credit)</span>
          </button>
        </div>

        {/* QUESTIONS WORKSPACE */}
        {questions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Questions List (4 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Interview Questions</h3>
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  onClick={() => {
                    setActiveQuestion(q);
                    setFeedback(null);
                    setUserAnswer('');
                  }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    activeQuestion?.id === q.id
                      ? 'border-blue-600 bg-blue-50/70 font-semibold shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {q.type}
                    </span>
                    <span className="text-slate-400">Q{idx + 1}</span>
                  </div>
                  <p className="text-xs text-slate-900 leading-snug">{q.question}</p>
                </div>
              ))}
            </div>

            {/* Right: Active Question Simulator (7 cols) */}
            {activeQuestion && (
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div className="space-y-2 border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-blue-600 uppercase">{activeQuestion.type} Question</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    "{activeQuestion.question}"
                  </h3>
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold">Why recruiters ask this: </span>
                    {activeQuestion.contextOrReason}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-800">Suggested Framework: {activeQuestion.suggestedFramework}</div>
                  <div className="text-slate-600">{activeQuestion.sampleAnswerGuidance}</div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Practice Your STAR Answer:</label>
                  <textarea
                    rows={5}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Structure: Situation -> Task -> Action -> Quantifiable Result..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleEvaluateAnswer}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow cursor-pointer"
                  >
                    Evaluate Answer with AI Coach
                  </button>
                </div>

                {feedback && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs text-emerald-900 animate-in fade-in">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>AI Feedback & Score</span>
                    </div>
                    <p className="leading-relaxed">{feedback}</p>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
