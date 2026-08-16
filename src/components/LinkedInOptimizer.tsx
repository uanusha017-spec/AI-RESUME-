import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { fetchLinkedInOptimize } from '../services/apiClient';
import { LinkedInOptimization } from '../types/resume';
import {
  Linkedin,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  Share2,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

export const LinkedInOptimizer: React.FC = () => {
  const { currentResume, useCredit, addNotification } = useResume();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LinkedInOptimization | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!useCredit(1)) return;
    setLoading(true);

    const fullText = `${currentResume.summary}\n${currentResume.experiences.map((e) => `${e.jobTitle} at ${e.company}: ${e.highlights.join(' ')}`).join('\n')}\nSkills: ${currentResume.skills.join(', ')}`;
    
    const res = await fetchLinkedInOptimize({
      resumeText: fullText,
      targetRole: currentResume.targetRole || currentResume.personalInfo.jobTitle,
    });

    setResult(res);
    setLoading(false);
    addNotification('Generated LinkedIn Profile Optimizations!', 'success');
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addNotification('Copied to clipboard!', 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-2">
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn Profile AI Sync</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              LinkedIn Optimizer & Headline Generator
            </h1>
            <p className="text-sm text-slate-600">
              Transform your resume experience into high-conversion LinkedIn headlines, an engaging About section, and recruiter keywords.
            </p>
          </div>

          <button
            onClick={handleOptimize}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Optimize Profile with AI (1 Credit)</span>
          </button>
        </div>

        {/* RESULTS */}
        {result ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* 1. Viral Headlines */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Recommended LinkedIn Headlines</span>
              </h3>

              <div className="space-y-3">
                {result.headlines.map((headline, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:border-blue-300 transition-colors"
                  >
                    <p className="text-xs sm:text-sm text-slate-800 font-medium">{headline}</p>
                    <button
                      onClick={() => copyToClipboard(headline, `h-${idx}`)}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      {copiedKey === `h-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === `h-${idx}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Engaging About Section */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Optimized "About" Bio</h3>
                <button
                  onClick={() => copyToClipboard(result.aboutSection, 'about')}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'about' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'about' ? 'Copied to Clipboard' : 'Copy Bio'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl whitespace-pre-line text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {result.aboutSection}
              </div>
            </div>

            {/* 3. Top Skills to Feature */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Top 5 Skills to Pin for Recruiter Search</h3>
              <div className="flex flex-wrap gap-2">
                {result.topSkillsToFeature.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-semibold text-xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Linkedin className="w-12 h-12 text-blue-600 mx-auto opacity-70" />
            <h3 className="font-bold text-slate-900 text-lg">Generate Your LinkedIn Kit</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Click the button above to synthesize high-impact headlines and a narrative About section from your active resume.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
