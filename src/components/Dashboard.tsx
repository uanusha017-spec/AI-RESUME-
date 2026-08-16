import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { TEMPLATES } from '../data/templates';
import { exportResumeToPDF } from '../utils/exportUtils';
import { PageBanner } from './PageBanner';
import {
  FileText,
  Plus,
  Copy,
  Trash2,
  Download,
  Target,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Zap,
  Edit,
  Columns,
  Upload,
  Gift
} from 'lucide-react';

interface DashboardProps {
  onOpenBuilder: () => void;
  onOpenATS: () => void;
  onOpenNewResumeModal: () => void;
  onOpenUploadResume?: () => void;
  onOpenCreditsModal?: () => void;
  onOpenAuth?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onOpenBuilder,
  onOpenATS,
  onOpenNewResumeModal,
  onOpenUploadResume,
  onOpenCreditsModal,
  onOpenAuth,
}) => {
  const {
    user,
    logout,
    resumes,
    currentResume,
    setCurrentResume,
    deleteResume,
    duplicateResume,
    coverLetters,
    aiCredits,
    addCredit,
    setActiveTab,
    loadSampleResume,
    addNotification,
  } = useResume();

  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [compareResumeA, setCompareResumeA] = useState<string>(resumes[0]?.id || '');
  const [compareResumeB, setCompareResumeB] = useState<string>(resumes[1]?.id || resumes[0]?.id || '');

  // Calculate average ATS score
  const avgATS = Math.round(
    resumes.reduce((acc, r) => acc + (r.atsScore || 85), 0) / (resumes.length || 1)
  );

  const resumeA = resumes.find((r) => r.id === compareResumeA) || resumes[0];
  const resumeB = resumes.find((r) => r.id === compareResumeB) || resumes[1] || resumes[0];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HERO BANNER IMAGE & QUICK ACTIONS */}
        <PageBanner
          badgeText="Executive Career Control Center"
          badgeIcon={<Sparkles className="w-3.5 h-3.5 text-blue-400" />}
          title="My Resumes & Career Hub"
          subtitle="Manage multiple tailored resume versions, track ATS compliance scores, and export recruiter-ready documents."
          imageVariant="workspace"
          stats={[
            { label: 'Active Resumes', value: `${resumes.length}`, icon: <FileText className="w-3.5 h-3.5 text-blue-400" /> },
            { label: 'Average ATS Score', value: `${avgATS}%`, icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> },
            { label: 'AI Credits', value: `${aiCredits}`, icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
          ]}
          actions={
            <>
              <button
                onClick={onOpenNewResumeModal}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Resume</span>
              </button>

              <button
                onClick={onOpenUploadResume}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
              >
                <Upload className="w-4 h-4 text-blue-300" />
                <span>Upload Resume</span>
              </button>

              <button
                onClick={() => setCompareModalOpen(true)}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
              >
                <Columns className="w-4 h-4 text-slate-300" />
                <span>Compare Versions</span>
              </button>
            </>
          }
        />

        {/* USER PROFILE & LINKEDIN ACCOUNT STATUS BANNER */}
        {user ? (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-lg font-black shrink-0 shadow-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
                  {user.provider === 'linkedin' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0A66C2]/10 text-[#0A66C2] text-[11px] font-bold">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z"/>
                      </svg>
                      LinkedIn Verified
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                      Email Account
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    Pro Active
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {user.email} • {user.jobTitle || user.preferredRole || 'Professional'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={onOpenCreditsModal}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{aiCredits} Credits</span>
              </button>
              <button
                onClick={logout}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">Account Access</span>
                <span className="px-1.5 py-0.5 bg-blue-500/30 text-blue-200 text-[10px] font-bold rounded">Fast Setup</span>
              </div>
              <h3 className="text-base sm:text-lg font-black">Create an Account or Sign In with LinkedIn</h3>
              <p className="text-xs text-slate-300">
                Sync your career credentials, save unlimited resumes, and unlock all AI enhancement tools.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenAuth}
                className="px-4 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z"/>
                </svg>
                <span>LinkedIn Sign In / Sign Up</span>
              </button>
            </div>
          </div>
        )}

        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Active Resumes</span>
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{resumes.length}</div>
            <div className="text-[11px] text-slate-400">Tailored versions</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Avg ATS Score</span>
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600">{avgATS}/100</div>
            <div className="text-[11px] text-emerald-700 font-semibold">High ATS compatibility</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Cover Letters</span>
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{coverLetters.length}</div>
            <div className="text-[11px] text-slate-400">Company tailored</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>AI Credits</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">{aiCredits}</div>
            <button
              onClick={onOpenCreditsModal || (() => {
                addCredit(50);
                addNotification('Added +50 bonus AI credits!', 'success');
              })}
              className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <Gift className="w-3 h-3 text-amber-500" />
              <span>+ Claim Free AI Credits</span>
            </button>
          </div>
        </div>

        {/* RESUMES GRID */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">My Resumes ({resumes.length})</h2>
            <button
              onClick={onOpenATS}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Scan all with ATS checker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => {
              const isCurrent = resume.id === currentResume.id;
              return (
                <div
                  key={resume.id}
                  className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md ${
                    isCurrent ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base line-clamp-1">{resume.title}</h3>
                        <p className="text-xs font-medium text-blue-600 mt-0.5">{resume.personalInfo.jobTitle || resume.targetRole}</p>
                      </div>
                      <div className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
                        {resume.atsScore || 90} ATS
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 opacity-70" />
                        <span>Modified {new Date(resume.lastModified).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 opacity-70" />
                        <span className="capitalize">{resume.styling?.template || 'modern-blue'} template</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setCurrentResume(resume);
                        onOpenBuilder();
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => duplicateResume(resume.id)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Duplicate resume"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setCurrentResume(resume);
                          exportResumeToPDF('resume-document', `${resume.personalInfo.fullName}_Resume.pdf`);
                        }}
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Quick Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteResume(resume.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete resume"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QUICK PRE-LOADED SAMPLES PICKER */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-lg text-white">Import from Professional Industry Samples</h3>
              <p className="text-xs text-slate-400">
                Load high-caliber, pre-written resumes for Software, Marketing, Finance, Nursing, MBA, and Fresh Graduates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {SAMPLE_RESUMES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => {
                  loadSampleResume(sample.id);
                  onOpenBuilder();
                }}
                className="p-3 bg-slate-800/80 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 rounded-xl text-left transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                  {sample.targetRole}
                </div>
                <div className="text-[10px] text-slate-400 group-hover:text-blue-100 mt-0.5 truncate">
                  {sample.personalInfo.fullName}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ================= RESUME VERSION COMPARISON MODAL ================= */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <Columns className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-lg">Side-by-Side Version Diff & Compare</h3>
              </div>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Resume Version A:</label>
                <select
                  value={compareResumeA}
                  onChange={(e) => setCompareResumeA(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  {resumes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title} ({r.atsScore || 90} ATS)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Resume Version B:</label>
                <select
                  value={compareResumeB}
                  onChange={(e) => setCompareResumeB(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  {resumes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title} ({r.atsScore || 90} ATS)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Diff Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{resumeA?.title}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {resumeA?.atsScore || 90} ATS
                  </span>
                </div>
                <p className="text-xs text-slate-600 italic">"{resumeA?.summary}"</p>
                <div className="text-xs">
                  <span className="font-semibold text-slate-700">Skills ({resumeA?.skills.length}): </span>
                  <span className="text-slate-600">{resumeA?.skills.join(', ')}</span>
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-slate-700">Experience count: </span>
                  <span className="text-slate-600">{resumeA?.experiences.length} positions</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{resumeB?.title}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {resumeB?.atsScore || 90} ATS
                  </span>
                </div>
                <p className="text-xs text-slate-600 italic">"{resumeB?.summary}"</p>
                <div className="text-xs">
                  <span className="font-semibold text-slate-700">Skills ({resumeB?.skills.length}): </span>
                  <span className="text-slate-600">{resumeB?.skills.join(', ')}</span>
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-slate-700">Experience count: </span>
                  <span className="text-slate-600">{resumeB?.experiences.length} positions</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
