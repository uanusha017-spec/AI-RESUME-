import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { fetchCareerChat } from '../services/apiClient';
import {
  Bot,
  Send,
  Sparkles,
  User,
  HelpCircle,
  TrendingUp,
  Award,
  Briefcase
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const CareerCoach: React.FC = () => {
  const { currentResume, useCredit, addNotification } = useResume();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello! I'm your AI Career Coach & Strategy Advisor. I'm analyzing your current target role: "${currentResume.targetRole || 'Professional'}". How can I assist with your resume strategy, salary negotiation, or job search roadmap today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    'How do I pivot into a Senior leadership role?',
    'What keywords are most critical for my target title?',
    'How can I explain a 6-month employment gap?',
    'Tips for negotiating base salary & equity?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;
    if (!useCredit(1)) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    const res = await fetchCareerChat({
      userMessage: query,
      currentRole: currentResume.targetRole,
      resumeContext: `${currentResume.summary}\nSkills: ${currentResume.skills.join(', ')}`,
    });

    const aiMsg: ChatMessage = {
      id: 'msg-' + (Date.now() + 1),
      sender: 'ai',
      text: res.reply || 'Here are actionable tips for your career growth...',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="border-b border-slate-200 pb-6 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-2">
            <Bot className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Career Strategist</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Interactive Career Coach & Advisor
          </h1>
          <p className="text-sm text-slate-600">
            Ask strategic questions about resume positioning, salary negotiations, promotion roadmaps, and career pivots.
          </p>
        </div>

        {/* CHAT CONTAINER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[580px] overflow-hidden">
          
          {/* Messages scroll area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white'
                  }`}
                >
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className={`block text-[10px] mt-1.5 opacity-60 ${m.sender === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
                <span>Coach is thinking...</span>
              </div>
            )}
          </div>

          {/* Quick prompt chips */}
          <div className="px-6 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold text-slate-500 shrink-0">Quick Ask:</span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="text-xs px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-100 text-slate-700 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask your coach anything about your resume, career, or interviews..."
              className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputText.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
