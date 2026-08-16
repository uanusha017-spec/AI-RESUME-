import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { fetchAICoverLetter } from '../services/apiClient';
import { CoverLetterData } from '../types/resume';
import { exportCoverLetterToDOCX } from '../utils/exportUtils';
import { PageBanner } from './PageBanner';
import {
  FileText,
  Sparkles,
  Download,
  Plus,
  Trash2,
  Copy,
  Edit,
  Mail,
  Briefcase,
  Building,
  CheckCircle2,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CoverLetterBuilder: React.FC = () => {
  const {
    currentResume,
    coverLetters,
    currentCoverLetter,
    saveCoverLetter,
    deleteCoverLetter,
    setCurrentCoverLetter,
    useCredit,
    addNotification,
  } = useResume();

  const [loading, setLoading] = useState(false);
  const [activeLetter, setActiveLetter] = useState<CoverLetterData>(
    currentCoverLetter || coverLetters[0] || {
      id: 'cl-' + Date.now(),
      title: 'Software Engineer Cover Letter',
      recipientName: 'Hiring Manager',
      recipientTitle: 'Head of Engineering',
      companyName: 'Acme Corp',
      companyAddress: 'San Francisco, CA',
      targetRole: currentResume.targetRole || 'Senior Software Engineer',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      tone: 'Professional',
      bodyParagraphs: [
        `I am writing to express my strong enthusiasm for the ${currentResume.targetRole || 'Software Engineer'} role at Acme Corp. Having engineered high-throughput scalable software systems, I have long admired your team's dedication to product innovation and engineering quality.`,
        `In my recent roles, I have consistently driven measurable improvements, architecting resilient architectures, optimizing system performance, and collaborating closely with cross-functional partners to ship high-impact features on schedule.`,
        `I would welcome the opportunity to discuss how my skill set and proactive mindset align with your strategic goals. Thank you for your time and consideration.`,
      ],
      signatureName: currentResume.personalInfo.fullName || 'Your Name',
      email: currentResume.personalInfo.email || 'your.email@example.com',
      phone: currentResume.personalInfo.phone || '+1 (555) 000-0000',
      lastModified: new Date().toISOString(),
    }
  );

  const [companyInput, setCompanyInput] = useState(activeLetter.companyName || 'Target Company');
  const [roleInput, setRoleInput] = useState(activeLetter.targetRole || currentResume.targetRole);
  const [recipientInput, setRecipientInput] = useState(activeLetter.recipientName || 'Hiring Team');
  const [toneInput, setToneInput] = useState('Professional');
  const [jobDescriptionInput, setJobDescriptionInput] = useState('');

  // Handle AI generation
  const handleGenerateAI = async () => {
    if (!useCredit(1)) return;
    setLoading(true);

    const res = await fetchAICoverLetter({
      candidateName: currentResume.personalInfo.fullName,
      companyName: companyInput || 'Target Company',
      jobTitle: roleInput || currentResume.targetRole,
      recipientName: recipientInput || 'Hiring Team',
      tone: toneInput,
      resumeSummary: currentResume.summary,
      jobDescription: jobDescriptionInput,
      keyHighlights: currentResume.skills,
    });

    const updated: CoverLetterData = {
      ...activeLetter,
      companyName: companyInput,
      targetRole: roleInput,
      recipientName: recipientInput,
      tone: toneInput as any,
      bodyParagraphs: res.bodyParagraphs || activeLetter.bodyParagraphs,
      signatureName: currentResume.personalInfo.fullName,
      email: currentResume.personalInfo.email,
      phone: currentResume.personalInfo.phone,
      lastModified: new Date().toISOString(),
    };

    setActiveLetter(updated);
    saveCoverLetter(updated);
    setLoading(false);
    confetti({ particleCount: 50, spread: 60 });
    addNotification('Cover letter generated with AI!', 'success');
  };

  const handleCreateNew = () => {
    const newCL: CoverLetterData = {
      id: 'cl-' + Date.now(),
      title: `${roleInput || 'New'} Application Letter`,
      recipientName: 'Hiring Team',
      recipientTitle: 'Hiring Manager',
      companyName: 'Company Name',
      companyAddress: 'City, State',
      targetRole: currentResume.targetRole || 'Target Role',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      tone: 'Professional',
      bodyParagraphs: [
        'I am excited to submit my application for the target position...',
        'With a solid track record of driving results and problem solving...',
        'I look forward to discussing how my experience will add value to your team.',
      ],
      signatureName: currentResume.personalInfo.fullName,
      email: currentResume.personalInfo.email,
      phone: currentResume.personalInfo.phone,
      lastModified: new Date().toISOString(),
    };
    setActiveLetter(newCL);
    saveCoverLetter(newCL);
    addNotification('Created new cover letter draft', 'info');
  };

  const handleDownloadDOCX = () => {
    exportCoverLetterToDOCX(activeLetter);
    addNotification('Word (.DOC) downloaded!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* HERO BANNER */}
        <PageBanner
          badgeText="AI-Tailored Executive Pitch"
          badgeIcon={<Mail className="w-3.5 h-3.5 text-blue-400" />}
          title="AI Cover Letter Writer"
          subtitle="Generate compelling, bespoke cover letters matching your resume experience with each employer's specific mission."
          imageVariant="workspace"
          actions={
            <>
              <button
                onClick={handleCreateNew}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>New Letter Draft</span>
              </button>

              <button
                onClick={handleDownloadDOCX}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
              >
                <Download className="w-4 h-4 text-blue-300" />
                <span>Download Word (.DOCX)</span>
              </button>
            </>
          }
        />

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: GENERATOR FORM (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* AI Generator Panel */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Generate Tailored Letter</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    placeholder="e.g. Stripe, Google, Spotify"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Job Title</label>
                  <input
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    placeholder="e.g. Senior Product Manager"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient Name</label>
                    <input
                      type="text"
                      value={recipientInput}
                      onChange={(e) => setRecipientInput(e.target.value)}
                      placeholder="e.g. Jane Smith"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tone</label>
                    <select
                      value={toneInput}
                      onChange={(e) => setToneInput(e.target.value)}
                      className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="Professional">Professional</option>
                      <option value="Enthusiastic">Enthusiastic</option>
                      <option value="Confident">Confident</option>
                      <option value="Executive">Executive</option>
                      <option value="Academic">Academic</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Optional: Paste Job Description for Match</label>
                  <textarea
                    rows={3}
                    value={jobDescriptionInput}
                    onChange={(e) => setJobDescriptionInput(e.target.value)}
                    placeholder="Paste job posting snippet..."
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleGenerateAI}
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Writing tailored cover letter...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Cover Letter (1 Credit)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Saved Cover Letters List */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Saved Letters ({coverLetters.length})</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {coverLetters.map((cl) => (
                  <div
                    key={cl.id}
                    onClick={() => {
                      setActiveLetter(cl);
                      setCurrentCoverLetter(cl);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      activeLetter.id === cl.id
                        ? 'border-blue-600 bg-blue-50/60 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">{cl.companyName} — {cl.targetRole}</div>
                      <div className="text-[10px] text-slate-500">{cl.date}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCoverLetter(cl.id);
                      }}
                      className="p-1 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: LIVE LETTER DOCUMENT VIEWER (7 COLS) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-4 sm:p-8 lg:p-12 space-y-6 min-h-[500px] sm:min-h-[700px] text-slate-800 font-serif leading-relaxed text-sm">
              
              {/* Header Letterhead */}
              <div className="border-b border-slate-200 pb-5 space-y-1 font-sans">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">{activeLetter.signatureName}</h2>
                <div className="text-xs text-slate-500 flex flex-wrap gap-4">
                  <span>{activeLetter.email}</span>
                  <span>{activeLetter.phone}</span>
                </div>
              </div>

              {/* Date & Recipient */}
              <div className="space-y-1 text-xs sm:text-sm font-sans">
                <div className="text-slate-500">{activeLetter.date}</div>
                <div className="font-bold text-slate-900 mt-2">{activeLetter.recipientName}</div>
                <div className="text-slate-600">{activeLetter.recipientTitle}</div>
                <div className="text-slate-600">{activeLetter.companyName}</div>
                {activeLetter.companyAddress && <div className="text-slate-500">{activeLetter.companyAddress}</div>}
              </div>

              {/* Subject */}
              <div className="font-sans font-bold text-xs sm:text-sm text-slate-900 pt-2">
                RE: Application for {activeLetter.targetRole}
              </div>

              {/* Salutation */}
              <div>Dear {activeLetter.recipientName || 'Hiring Team'},</div>

              {/* Paragraphs (Editable inline) */}
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                {activeLetter.bodyParagraphs.map((para, idx) => (
                  <textarea
                    key={idx}
                    rows={4}
                    value={para}
                    onChange={(e) => {
                      const newP = [...activeLetter.bodyParagraphs];
                      newP[idx] = e.target.value;
                      const next = { ...activeLetter, bodyParagraphs: newP };
                      setActiveLetter(next);
                      saveCoverLetter(next);
                    }}
                    className="w-full p-2 bg-transparent hover:bg-slate-50 focus:bg-white border border-transparent hover:border-slate-200 focus:border-blue-500 rounded-lg text-slate-800 font-serif text-xs sm:text-sm leading-relaxed"
                  />
                ))}
              </div>

              {/* Signoff */}
              <div className="pt-4 space-y-2">
                <div>Sincerely,</div>
                <div className="font-sans font-bold text-base text-slate-900">{activeLetter.signatureName}</div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
