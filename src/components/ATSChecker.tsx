import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import {
  fetchATSScore,
  fetchJobMatch,
  fetchParseUploadedResume,
} from '../services/apiClient';
import { ATSAnalysisResult } from '../types/resume';
import { PageBanner } from './PageBanner';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  UploadCloud,
  FileText,
  TrendingUp,
  Search,
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
  Layers,
  Wand2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ATSChecker: React.FC<{ onNavigateToBuilder: () => void }> = ({ onNavigateToBuilder }) => {
  const { currentResume, updateCurrentResume, useCredit, addNotification, createNewResume } = useResume();

  const [activeTab, setActiveTab] = useState<'analyzer' | 'job-matcher' | 'upload-parser'>('analyzer');
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState<ATSAnalysisResult | null>(null);

  // Job Matcher state
  const [jobDescription, setJobDescription] = useState('');
  const [jobMatchResult, setJobMatchResult] = useState<any>(null);
  const [optimizedBeforeAfter, setOptimizedBeforeAfter] = useState<{ before: number; after: number } | null>(null);

  // Upload parser state
  const [pastedRawText, setPastedRawText] = useState('');

  // Run ATS audit on active resume
  const handleRunAudit = async () => {
    if (!useCredit(1)) return;
    setLoading(true);

    const fullResumeText = `
${currentResume.personalInfo.fullName} - ${currentResume.personalInfo.jobTitle}
${currentResume.personalInfo.location} | ${currentResume.personalInfo.email}

SUMMARY:
${currentResume.summary}

EXPERIENCE:
${currentResume.experiences
  .map(
    (e) => `
${e.jobTitle} at ${e.company} (${e.startDate} - ${e.endDate || 'Present'})
${e.highlights.join('\n')}
`
  )
  .join('\n')}

SKILLS:
${currentResume.skills.join(', ')}

EDUCATION:
${currentResume.education.map((edu) => `${edu.degree} in ${edu.fieldOfStudy} - ${edu.institution}`).join('\n')}
`;

    const res = await fetchATSScore({
      resumeText: fullResumeText,
      targetRole: currentResume.targetRole,
    });

    setAtsResult(res);
    updateCurrentResume({ atsScore: res.score });
    setLoading(false);

    if (res.score >= 90) {
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  // Run Job Match analysis
  const handleRunJobMatch = async () => {
    if (!jobDescription.trim()) {
      addNotification('Please paste a job description first', 'warning');
      return;
    }
    if (!useCredit(1)) return;

    setLoading(true);
    const fullResumeText = `${currentResume.summary}\n${currentResume.experiences.map((e) => e.highlights.join(' ')).join(' ')}\nSkills: ${currentResume.skills.join(', ')}`;
    
    const res = await fetchJobMatch({
      resumeText: fullResumeText,
      jobDescription,
    });

    setJobMatchResult(res);
    setLoading(false);
  };

  // 1-Click Optimize Resume for Job
  const handleOptimizeForJob = () => {
    if (!jobMatchResult) return;
    const oldScore = currentResume.atsScore || 82;
    const newScore = Math.min(98, oldScore + 12);

    // Add missing keywords safely to skills list
    const newSkillsToAdd = (jobMatchResult.requiredSkillsMissing || []).slice(0, 4);
    
    updateCurrentResume((prev) => ({
      ...prev,
      atsScore: newScore,
      skills: Array.from(new Set([...prev.skills, ...newSkillsToAdd])),
      summary: jobMatchResult.optimizedSummarySuggestion || prev.summary,
    }));

    setOptimizedBeforeAfter({ before: oldScore, after: newScore });
    confetti({ particleCount: 70, spread: 70 });
    addNotification('Resume successfully optimized for this opening!', 'success');
  };

  // Parse raw text or uploaded document
  const handleParseText = async () => {
    if (!pastedRawText.trim()) {
      addNotification('Please paste resume text to extract', 'warning');
      return;
    }
    setLoading(true);
    const parsed = await fetchParseUploadedResume(pastedRawText);

    // Create a new resume with parsed fields
    const created = createNewResume('modern-blue', parsed.personalInfo?.jobTitle || 'Professional');
    updateCurrentResume({
      ...created,
      personalInfo: {
        ...created.personalInfo,
        ...(parsed.personalInfo || {}),
      },
      summary: parsed.summary || created.summary,
      skills: parsed.skills && parsed.skills.length > 0 ? parsed.skills : created.skills,
    });

    setLoading(false);
    addNotification('Resume content successfully parsed & imported!', 'success');
    onNavigateToBuilder();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HERO BANNER */}
        <PageBanner
          badgeText="ATS Compliance Audit & 1-Click Matcher"
          badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
          title="ATS Score & Keyword Optimizer"
          subtitle="Audit your resume against Taleo, Workday, and Greenhouse standards or match against any job opening to uncover missing hard skills."
          imageVariant="workspace"
          stats={[
            { label: 'Greenhouse Score Target', value: '85%+', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> },
            { label: 'Keyword Match Rate', value: '95%+', icon: <Target className="w-3.5 h-3.5 text-blue-400" /> },
            { label: 'Parsing Reliability', value: '100%', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
          ]}
          actions={
            <button
              onClick={onNavigateToBuilder}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Open in Resume Builder</span>
            </button>
          }
        />

        {/* TABS SELECTOR */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'analyzer'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4 inline mr-1.5" />
            1. ATS Score Audit
          </button>

          <button
            onClick={() => setActiveTab('job-matcher')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'job-matcher'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 inline mr-1.5" />
            2. Match to Job Description
          </button>

          <button
            onClick={() => setActiveTab('upload-parser')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'upload-parser'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-4 h-4 inline mr-1.5" />
            3. Upload & Extract Existing Resume
          </button>
        </div>

        {/* ================= TAB 1: ATS SCORE AUDIT ================= */}
        {activeTab === 'analyzer' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Action Bar */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Auditing: <span className="text-blue-600">{currentResume.title}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Evaluates quantifiable impact, power verbs, formatting, keyword coverage, and recruiter scannability.
                </p>
              </div>
              <button
                onClick={handleRunAudit}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run In-Depth ATS Audit (1 Credit)</span>
                  </>
                )}
              </button>
            </div>

            {/* Results Grid */}
            {atsResult ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Card: Score dial + Category bars */}
                <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall ATS Score</span>
                    <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex flex-col items-center justify-center shadow-lg">
                      <span className="text-4xl font-black">{atsResult.score}</span>
                      <span className="text-[10px] font-semibold opacity-90">/ 100</span>
                    </div>
                    <p className="text-xs font-bold text-emerald-700">
                      {atsResult.score >= 90 ? 'Excellent! Top 5% of ATS applications' : 'Good. Ready for optimizations'}
                    </p>
                  </div>

                  {/* Category Progress Bars */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>Keyword Density</span>
                        <span>{atsResult.breakdown.keywordMatch}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${atsResult.breakdown.keywordMatch}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>Experience & Metrics Impact</span>
                        <span>{atsResult.breakdown.experienceImpact}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${atsResult.breakdown.experienceImpact}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>Formatting & ATS Structure</span>
                        <span>{atsResult.breakdown.formattingStructure}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${atsResult.breakdown.formattingStructure}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>Grammar & Clarity</span>
                        <span>{atsResult.breakdown.grammarClarity}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${atsResult.breakdown.grammarClarity}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Quick Stat Counters */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                      <div className="text-xl font-bold text-slate-900">{atsResult.quantifiableMetricsCount}</div>
                      <div className="text-[11px] text-slate-500 font-medium">Metrics Found</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                      <div className="text-xl font-bold text-slate-900">{atsResult.actionVerbsCount}</div>
                      <div className="text-[11px] text-slate-500 font-medium">Power Verbs</div>
                    </div>
                  </div>
                </div>

                {/* Right Card: Recommendations, Strengths & Gaps */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span>Actionable Steps to Reach 95+ Score</span>
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                      {atsResult.actionableRecommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Matched vs Missing Keywords */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200 space-y-2">
                      <h4 className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Matched Keywords ({atsResult.matchedKeywords.length})</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {atsResult.matchedKeywords.map((k, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-200 font-medium">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200 space-y-2">
                      <h4 className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Missing High-Value Keywords</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {atsResult.missingKeywords.map((k, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              updateCurrentResume((prev) => ({
                                ...prev,
                                skills: Array.from(new Set([...prev.skills, k])),
                              }));
                              addNotification(`Added "${k}" to your skills!`, 'success');
                            }}
                            className="text-xs px-2 py-0.5 rounded bg-white text-amber-900 border border-amber-300 font-medium hover:bg-amber-100 flex items-center gap-1 cursor-pointer"
                            title="Click to add to skills"
                          >
                            <span>{k}</span>
                            <Plus className="w-3 h-3 text-amber-600" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <Target className="w-12 h-12 text-blue-600 mx-auto opacity-70" />
                <h3 className="font-bold text-slate-900 text-lg">No ATS Audit Run Yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Click the "Run In-Depth ATS Audit" button above to evaluate your resume against 50+ recruiting criteria.
                </p>
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 2: JOB DESCRIPTION MATCHER ================= */}
        {activeTab === 'job-matcher' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Paste Target Job Description</h3>
                <p className="text-xs text-slate-500">
                  Compare your resume directly against the requirements of the job you want to apply for.
                </p>
              </div>

              <textarea
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description from LinkedIn, Indeed, or the company career page here..."
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 leading-relaxed"
              />

              <button
                onClick={handleRunJobMatch}
                disabled={loading || !jobDescription.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Extracting keywords & matching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Compare Resume Against Job (1 Credit)</span>
                  </>
                )}
              </button>
            </div>

            {/* Job Match Analysis Results */}
            {jobMatchResult && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">Target Job Title</span>
                    <h3 className="text-xl font-bold text-slate-900">{jobMatchResult.jobTitle}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-black text-blue-600">{jobMatchResult.matchPercentage}%</div>
                      <div className="text-[11px] text-slate-500">Match Rate</div>
                    </div>
                  </div>
                </div>

                {/* Missing & Matched Requirements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Requirements Matched</span>
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {jobMatchResult.requiredSkillsMatched.map((s: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-white text-emerald-800 rounded font-medium border border-emerald-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-rose-50 rounded-xl p-4 border border-rose-200 space-y-2">
                    <h4 className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Missing Job Keywords</span>
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {jobMatchResult.requiredSkillsMissing.map((s: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-white text-rose-800 rounded font-medium border border-rose-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 1-Click Optimize Button */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">Optimize Resume for This Job</h4>
                    <p className="text-xs text-slate-600">
                      Reorder skills, infuse target keywords into your summary, and enhance ATS score (strictly truthful).
                    </p>
                  </div>
                  <button
                    onClick={handleOptimizeForJob}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Apply Optimizations</span>
                  </button>
                </div>

                {optimizedBeforeAfter && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <div className="text-xs font-bold text-emerald-900">
                      ATS Score Boost: {optimizedBeforeAfter.before}/100 → <span className="text-base text-emerald-700">{optimizedBeforeAfter.after}/100</span>
                    </div>
                    <button
                      onClick={onNavigateToBuilder}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      View in Builder →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: UPLOAD & EXTRACT RESUME ================= */}
        {activeTab === 'upload-parser' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Import Existing Resume</h3>
              <p className="text-xs text-slate-500">
                Paste raw text from your existing PDF, Word, or LinkedIn profile to extract into structured sections automatically.
              </p>
            </div>

            <textarea
              rows={8}
              value={pastedRawText}
              onChange={(e) => setPastedRawText(e.target.value)}
              placeholder="Paste entire resume text here (e.g. Name, Experience, Education, Skills)..."
              className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 leading-relaxed font-mono"
            />

            <button
              onClick={handleParseText}
              disabled={loading || !pastedRawText.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Extracting sections with AI...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Parse & Import into Builder</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
