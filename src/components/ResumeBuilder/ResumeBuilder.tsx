import React, { useState, useEffect, useMemo } from 'react';
import { useResume } from '../../context/ResumeContext';
import { TEMPLATES, FONT_OPTIONS, COLOR_PALETTES } from '../../data/templates';
import { ResumeRenderer } from '../ResumeTemplates/ResumeRenderer';
import {
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  Edit3,
  RotateCcw,
  RotateCw,
  Palette,
  Type,
  Layout,
  Sliders,
  CheckCircle2,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Globe,
  Layers,
  Wand2,
  Copy,
  Check,
  Target
} from 'lucide-react';
import {
  fetchAISummary,
  fetchAIBullets,
  fetchAIImproveText,
} from '../../services/apiClient';
import { exportResumeToPDF, exportResumeToDOCX } from '../../utils/exportUtils';
import confetti from 'canvas-confetti';
import { Upload } from 'lucide-react';
import workspaceBannerImg from '../../assets/images/workspace_banner_1786886207884.jpg';

interface ResumeBuilderProps {
  onOpenATS: () => void;
  onOpenUploadResume?: () => void;
  onOpenCreditsModal?: () => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  onOpenATS,
  onOpenUploadResume,
  onOpenCreditsModal,
}) => {
  const {
    currentResume,
    updateCurrentResume,
    undo,
    redo,
    canUndo,
    canRedo,
    useCredit,
    addCredit,
    addNotification,
    setActiveTab,
  } = useResume();

  // Active subtab in editor
  const [activeSection, setActiveSection] = useState<string>('personal');
  // Mobile preview toggle
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  // Zoom scale & mode
  const [zoomMode, setZoomMode] = useState<'fit' | '75' | '100'>('fit');
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentScale = useMemo(() => {
    if (zoomMode === '100') return 1.0;
    if (zoomMode === '75') return 0.75;
    // 'fit' mode
    if (windowWidth < 1024) {
      return Math.min(1.0, Math.max(0.35, (windowWidth - 28) / 850));
    }
    return 0.9;
  }, [zoomMode, windowWidth]);

  // AI Generator modal state
  const [aiModalType, setAiModalType] = useState<'summary' | 'bullets' | 'improve' | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSummaryVariants, setAiSummaryVariants] = useState<any[]>([]);
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [selectedLevel, setSelectedLevel] = useState('Mid-level');
  
  // AI Bullets generator state
  const [bulletTargetExpId, setBulletTargetExpId] = useState<string>('');
  const [bulletNotes, setBulletNotes] = useState('');
  const [generatedBullets, setGeneratedBullets] = useState<any[]>([]);
  
  // AI Text improver state
  const [improveTargetExpId, setImproveTargetExpId] = useState<string>('');
  const [improveOriginalText, setImproveOriginalText] = useState<string>('');
  const [improveResult, setImproveResult] = useState<any>(null);

  const sections = [
    { id: 'personal', label: 'Contact Details', icon: FileText },
    { id: 'summary', label: 'Summary', icon: Wand2 },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills & Tech', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: Sparkles },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'languages', label: 'Languages', icon: Globe },
    { id: 'design', label: 'Template & Design', icon: Palette },
  ];

  // Handler: trigger AI Summary Generation
  const handleGenerateSummary = async () => {
    if (!useCredit(1)) return;
    setAiLoading(true);
    setAiModalType('summary');

    const res = await fetchAISummary({
      fullName: currentResume.personalInfo.fullName,
      targetRole: currentResume.targetRole || currentResume.personalInfo.jobTitle,
      experienceLevel: selectedLevel,
      tone: selectedTone,
      keySkills: currentResume.skills,
      currentSummary: currentResume.summary,
    });

    setAiSummaryVariants(res.variants || []);
    setAiLoading(false);
  };

  // Handler: trigger AI Bullets Generation
  const handleOpenBulletGenerator = (expId: string) => {
    setBulletTargetExpId(expId);
    setGeneratedBullets([]);
    setBulletNotes('');
    setAiModalType('bullets');
  };

  const handleGenerateBulletsSubmit = async () => {
    const exp = currentResume.experiences.find((e) => e.id === bulletTargetExpId);
    if (!exp) return;
    if (!useCredit(1)) return;

    setAiLoading(true);
    const res = await fetchAIBullets({
      jobTitle: exp.jobTitle,
      company: exp.company,
      rawInput: bulletNotes,
      technologies: exp.technologies,
    });
    setGeneratedBullets(res.bullets || []);
    setAiLoading(false);
  };

  const handleAcceptBullet = (bulletText: string) => {
    updateCurrentResume((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => {
        if (exp.id === bulletTargetExpId) {
          return {
            ...exp,
            highlights: [...exp.highlights, bulletText],
          };
        }
        return exp;
      }),
    }));
    addNotification('Added bullet point to experience!', 'success');
  };

  // Export handlers
  const handleExportPDF = async () => {
    addNotification('Generating high-resolution PDF...', 'info');
    const ok = await exportResumeToPDF('resume-document', `${currentResume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    if (ok) {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.85 } });
      addNotification('PDF exported successfully!', 'success');
    }
  };

  const handleExportDOCX = () => {
    exportResumeToDOCX(currentResume);
    addNotification('Word (.DOC) downloaded!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* BUILDER SUB-HEADER / TOOLBAR */}
      <div className="bg-white border-b border-slate-200 sticky top-14 sm:top-16 z-30 px-3 sm:px-6 py-2 sm:py-2.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-4 shadow-xs">
        
        {/* Left: Title & Undo/Redo */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1 sm:flex-initial">
          <input
            type="text"
            value={currentResume.title}
            onChange={(e) => updateCurrentResume({ title: e.target.value })}
            className="font-bold text-xs sm:text-base text-slate-900 bg-transparent hover:bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded px-1.5 sm:px-2 py-1 max-w-[140px] sm:max-w-xs border border-transparent hover:border-slate-200 truncate"
            title="Click to rename resume title"
          />

          <div className="flex items-center gap-0.5 border-l border-slate-200 pl-1.5 sm:pl-3 shrink-0">
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`p-1 sm:p-1.5 rounded hover:bg-slate-100 transition-colors ${canUndo ? 'text-slate-700 cursor-pointer' : 'text-slate-300 cursor-not-allowed'}`}
              title="Undo (Ctrl+Z)"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`p-1 sm:p-1.5 rounded hover:bg-slate-100 transition-colors ${canRedo ? 'text-slate-700 cursor-pointer' : 'text-slate-300 cursor-not-allowed'}`}
              title="Redo (Ctrl+Y)"
            >
              <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Center: Mobile Tabs Switcher */}
        <div className="flex lg:hidden bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold shrink-0">
          <button
            onClick={() => setMobileTab('edit')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md transition-all ${mobileTab === 'edit' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
          >
            <Edit3 className="w-3.5 h-3.5 inline mr-1" /> Form
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md transition-all ${mobileTab === 'preview' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
          >
            <Eye className="w-3.5 h-3.5 inline mr-1" /> Preview
          </button>
        </div>

        {/* Right: ATS Score & Download Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Upload / Replace Resume (Desktop only) */}
          {onOpenUploadResume && (
            <button
              onClick={onOpenUploadResume}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Import or upload resume to replace"
            >
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span>Import</span>
            </button>
          )}

          {/* Quick ATS Button */}
          <button
            onClick={onOpenATS}
            className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] sm:text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer shrink-0"
          >
            <Target className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>ATS: {currentResume.atsScore || 92}</span>
          </button>

          {/* Export Dropdown / Actions */}
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-all cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>PDF</span>
          </button>

          <button
            onClick={handleExportDOCX}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-all cursor-pointer shrink-0"
          >
            <span>Word</span>
          </button>
        </div>

      </div>

      {/* MAIN SPLIT-SCREEN WORKSPACE */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* ================= LEFT SIDE: FORM EDITOR (5 COLS) ================= */}
        <div className={`lg:col-span-6 xl:col-span-5 bg-white border-r border-slate-200 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-120px)] ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          
          {/* BUILDER PAGE BANNER */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-950 text-white p-4 sm:p-5 mb-5 border border-slate-800 shadow-md">
            <div className="absolute inset-0 z-0">
              <img
                src={workspaceBannerImg}
                alt="Resume Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/80" />
            </div>
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span>Interactive AI Studio</span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-white">
                  {currentResume.title || 'Untitled Resume'}
                </h2>
                <p className="text-xs text-slate-300">
                  Template: <span className="text-blue-300 font-semibold">{currentResume.styling.template}</span> • ATS Ready
                </p>
              </div>

              <button
                onClick={onOpenATS}
                className="shrink-0 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer backdrop-blur-sm"
              >
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Score: {currentResume.atsScore || 92}%</span>
              </button>
            </div>
          </div>

          {/* Section Navigation Tabs (Horizontal Scroll) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 border-b border-slate-200 scrollbar-none">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* SECTION 1: PERSONAL INFORMATION */}
          {activeSection === 'personal' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Personal & Contact Details</h3>
                <span className="text-xs text-slate-500">Recruiter headers</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={currentResume.personalInfo.fullName}
                    onChange={(e) =>
                      updateCurrentResume({
                        personalInfo: { ...currentResume.personalInfo, fullName: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. Alex Morgan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Job Title</label>
                  <input
                    type="text"
                    value={currentResume.personalInfo.jobTitle}
                    onChange={(e) =>
                      updateCurrentResume({
                        personalInfo: { ...currentResume.personalInfo, jobTitle: e.target.value },
                        targetRole: e.target.value,
                      })
                    }
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. Senior Full Stack Engineer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={currentResume.personalInfo.email}
                    onChange={(e) =>
                      updateCurrentResume({
                        personalInfo: { ...currentResume.personalInfo, email: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="alex@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={currentResume.personalInfo.phone}
                    onChange={(e) =>
                      updateCurrentResume({
                        personalInfo: { ...currentResume.personalInfo, phone: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="+1 (555) 234-5678"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location (City, State / Country)</label>
                  <input
                    type="text"
                    value={currentResume.personalInfo.location}
                    onChange={(e) =>
                      updateCurrentResume({
                        personalInfo: { ...currentResume.personalInfo, location: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={currentResume.personalInfo.linkedin || ''}
                    onChange={(e) =>
                      updateCurrentResume({
                        personalInfo: { ...currentResume.personalInfo, linkedin: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / Portfolio</label>
                  <input
                    type="text"
                    value={currentResume.personalInfo.github || ''}
                    onChange={(e) =>
                      updateCurrentResume({
                        personalInfo: { ...currentResume.personalInfo, github: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="github.com/username"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Personal Website</label>
                  <input
                    type="text"
                    value={currentResume.personalInfo.website || ''}
                    onChange={(e) =>
                      updateCurrentResume({
                        personalInfo: { ...currentResume.personalInfo, website: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="alexmorgan.dev"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveSection('summary')}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  Continue to Summary →
                </button>
              </div>
            </div>
          )}

          {/* SECTION 2: PROFESSIONAL SUMMARY */}
          {activeSection === 'summary' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Professional Summary</h3>
                  <p className="text-xs text-slate-500">A 3-4 sentence value proposition for recruiters</p>
                </div>
                <button
                  onClick={handleGenerateSummary}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-xs font-semibold shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate with AI</span>
                </button>
              </div>

              {/* Tone / Level Controls for AI */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-600">Tone:</span>
                  <select
                    value={selectedTone}
                    onChange={(e) => setSelectedTone(e.target.value)}
                    className="px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Executive">Executive</option>
                    <option value="Confident">Confident</option>
                    <option value="Concise">Concise</option>
                    <option value="Technical">Technical</option>
                    <option value="Creative">Creative</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-600">Level:</span>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                  >
                    <option value="Junior">Junior / Entry</option>
                    <option value="Mid-level">Mid-level (3-5 yrs)</option>
                    <option value="Senior">Senior (5-8 yrs)</option>
                    <option value="Executive">Executive / Director (8+ yrs)</option>
                  </select>
                </div>
              </div>

              <textarea
                rows={5}
                value={currentResume.summary}
                onChange={(e) => updateCurrentResume({ summary: e.target.value })}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 leading-relaxed"
                placeholder="High-impact professional with 5+ years of experience..."
              />

              {/* AI Generated Variants List */}
              {aiSummaryVariants.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    AI Suggested Alternatives (Click to apply)
                  </h4>
                  {aiSummaryVariants.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-900">{item.title}</span>
                        <button
                          onClick={() => {
                            updateCurrentResume({ summary: item.summary });
                            addNotification('Applied AI Summary!', 'success');
                          }}
                          className="px-2 py-1 bg-blue-600 text-white rounded text-[11px] font-semibold hover:bg-blue-700 cursor-pointer"
                        >
                          Use This
                        </button>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">{item.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: WORK EXPERIENCE */}
          {activeSection === 'experience' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Work Experience</h3>
                  <p className="text-xs text-slate-500">Quantifiable impact & Google XYZ bullet points</p>
                </div>
                <button
                  onClick={() => {
                    const newExp = {
                      id: 'exp-' + Date.now(),
                      jobTitle: 'Job Title',
                      company: 'Company Name',
                      location: 'City, State',
                      startDate: '2022-01',
                      endDate: '',
                      isCurrent: true,
                      technologies: [],
                      highlights: ['Led core initiatives resulting in [X% improvement].'],
                    };
                    updateCurrentResume((prev) => ({
                      ...prev,
                      experiences: [newExp, ...prev.experiences],
                    }));
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-5">
                {currentResume.experiences.map((exp, idx) => (
                  <div key={exp.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase">Position #{idx + 1}</span>
                      <button
                        onClick={() => {
                          updateCurrentResume((prev) => ({
                            ...prev,
                            experiences: prev.experiences.filter((e) => e.id !== exp.id),
                          }));
                        }}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentResume((prev) => ({
                            ...prev,
                            experiences: prev.experiences.map((item) =>
                              item.id === exp.id ? { ...item, jobTitle: val } : item
                            ),
                          }));
                        }}
                        className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold"
                        placeholder="Job Title (e.g. Senior Software Engineer)"
                      />

                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentResume((prev) => ({
                            ...prev,
                            experiences: prev.experiences.map((item) =>
                              item.id === exp.id ? { ...item, company: val } : item
                            ),
                          }));
                        }}
                        className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                        placeholder="Company Name"
                      />

                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentResume((prev) => ({
                            ...prev,
                            experiences: prev.experiences.map((item) =>
                              item.id === exp.id ? { ...item, startDate: val } : item
                            ),
                          }));
                        }}
                        className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                        placeholder="Start Date (e.g. 2022-01)"
                      />

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          disabled={exp.isCurrent}
                          value={exp.isCurrent ? 'Present' : exp.endDate}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCurrentResume((prev) => ({
                              ...prev,
                              experiences: prev.experiences.map((item) =>
                                item.id === exp.id ? { ...item, endDate: val } : item
                              ),
                            }));
                          }}
                          className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg flex-1 disabled:bg-slate-100"
                          placeholder="End Date"
                        />
                        <label className="flex items-center gap-1 text-[11px] text-slate-600 font-medium shrink-0 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={exp.isCurrent}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              updateCurrentResume((prev) => ({
                                ...prev,
                                experiences: prev.experiences.map((item) =>
                                  item.id === exp.id ? { ...item, isCurrent: checked, endDate: checked ? '' : '2024-01' } : item
                                ),
                              }));
                            }}
                          />
                          Current
                        </label>
                      </div>
                    </div>

                    {/* Bullet points editor */}
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700">Achievement Bullets</label>
                        <button
                          onClick={() => handleOpenBulletGenerator(exp.id)}
                          className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                          <Wand2 className="w-3.5 h-3.5" />
                          <span>AI Bullets Generator</span>
                        </button>
                      </div>

                      {exp.highlights.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-1.5">
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCurrentResume((prev) => ({
                                ...prev,
                                experiences: prev.experiences.map((item) => {
                                  if (item.id === exp.id) {
                                    const nextH = [...item.highlights];
                                    nextH[bIdx] = val;
                                    return { ...item, highlights: nextH };
                                  }
                                  return item;
                                }),
                              }));
                            }}
                            className="flex-1 text-xs p-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500"
                          />
                          <button
                            onClick={() => {
                              updateCurrentResume((prev) => ({
                                ...prev,
                                experiences: prev.experiences.map((item) => {
                                  if (item.id === exp.id) {
                                    return {
                                      ...item,
                                      highlights: item.highlights.filter((_, i) => i !== bIdx),
                                    };
                                  }
                                  return item;
                                }),
                              }));
                            }}
                            className="p-1 text-slate-400 hover:text-red-500"
                            title="Remove bullet"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          updateCurrentResume((prev) => ({
                            ...prev,
                            experiences: prev.experiences.map((item) => {
                              if (item.id === exp.id) {
                                return {
                                  ...item,
                                  highlights: [...item.highlights, 'Spearheaded [initiative] resulting in [measurable outcome].'],
                                };
                              }
                              return item;
                            }),
                          }));
                        }}
                        className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add bullet point
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: SKILLS */}
          {activeSection === 'skills' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Skills & Keywords</h3>
                  <p className="text-xs text-slate-500">ATS keyword indexable tags</p>
                </div>
              </div>

              {/* Categorized Skills */}
              {currentResume.skillCategories && currentResume.skillCategories.map((cat, cIdx) => (
                <div key={cIdx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={cat.category}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentResume((prev) => ({
                          ...prev,
                          skillCategories: prev.skillCategories.map((c, i) =>
                            i === cIdx ? { ...c, category: val } : c
                          ),
                        }));
                      }}
                      className="text-xs font-bold text-slate-800 bg-transparent border-b border-transparent focus:border-blue-500 focus:bg-white px-1 py-0.5 rounded"
                    />
                    <button
                      onClick={() => {
                        updateCurrentResume((prev) => ({
                          ...prev,
                          skillCategories: prev.skillCategories.filter((_, i) => i !== cIdx),
                        }));
                      }}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={cat.skills.join(', ')}
                    onChange={(e) => {
                      const list = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      updateCurrentResume((prev) => ({
                        ...prev,
                        skillCategories: prev.skillCategories.map((c, i) =>
                          i === cIdx ? { ...c, skills: list } : c
                        ),
                        skills: Array.from(new Set([...prev.skills, ...list])),
                      }));
                    }}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                    placeholder="Comma separated skills (e.g. React, TypeScript, Node.js)"
                  />
                </div>
              ))}

              <button
                onClick={() => {
                  const newCat = { category: 'Tools & Technologies', skills: ['Skill 1', 'Skill 2'] };
                  updateCurrentResume((prev) => ({
                    ...prev,
                    skillCategories: [...(prev.skillCategories || []), newCat],
                  }));
                }}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Skill Category
              </button>
            </div>
          )}

          {/* SECTION 5: EDUCATION */}
          {activeSection === 'education' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Education</h3>
                <button
                  onClick={() => {
                    const newEdu = {
                      id: 'edu-' + Date.now(),
                      degree: 'Bachelor of Science',
                      fieldOfStudy: 'Major',
                      institution: 'University Name',
                      location: 'City, State',
                      graduationDate: '2023-05',
                      gpa: '3.8',
                    };
                    updateCurrentResume((prev) => ({
                      ...prev,
                      education: [...prev.education, newEdu],
                    }));
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Degree</span>
                </button>
              </div>

              {currentResume.education.map((edu) => (
                <div key={edu.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-600">Degree Details</span>
                    <button
                      onClick={() => {
                        updateCurrentResume((prev) => ({
                          ...prev,
                          education: prev.education.filter((e) => e.id !== edu.id),
                        }));
                      }}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentResume((prev) => ({
                          ...prev,
                          education: prev.education.map((item) =>
                            item.id === edu.id ? { ...item, degree: val } : item
                          ),
                        }));
                      }}
                      className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Degree (e.g. Bachelor of Science)"
                    />
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentResume((prev) => ({
                          ...prev,
                          education: prev.education.map((item) =>
                            item.id === edu.id ? { ...item, fieldOfStudy: val } : item
                          ),
                        }));
                      }}
                      className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Field of Study (e.g. Computer Science)"
                    />
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentResume((prev) => ({
                          ...prev,
                          education: prev.education.map((item) =>
                            item.id === edu.id ? { ...item, institution: val } : item
                          ),
                        }));
                      }}
                      className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Institution / University"
                    />
                    <input
                      type="text"
                      value={edu.graduationDate}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentResume((prev) => ({
                          ...prev,
                          education: prev.education.map((item) =>
                            item.id === edu.id ? { ...item, graduationDate: val } : item
                          ),
                        }));
                      }}
                      className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Graduation Date (e.g. 2023-05)"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 6: PROJECTS */}
          {activeSection === 'projects' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Key Projects</h3>
                <button
                  onClick={() => {
                    const newProj = {
                      id: 'proj-' + Date.now(),
                      name: 'Project Name',
                      role: 'Lead Developer',
                      link: 'https://demo.app',
                      githubLink: 'https://github.com/user/project',
                      technologies: ['React', 'TypeScript'],
                      highlights: ['Built and scaled application serving [1,000+ users].'],
                    };
                    updateCurrentResume((prev) => ({
                      ...prev,
                      projects: [...(prev.projects || []), newProj],
                    }));
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {currentResume.projects && currentResume.projects.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700">{proj.name}</span>
                    <button
                      onClick={() => {
                        updateCurrentResume((prev) => ({
                          ...prev,
                          projects: prev.projects.filter((p) => p.id !== proj.id),
                        }));
                      }}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentResume((prev) => ({
                          ...prev,
                          projects: prev.projects.map((p) =>
                            p.id === proj.id ? { ...p, name: val } : p
                          ),
                        }));
                      }}
                      className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Project Name"
                    />
                    <input
                      type="text"
                      value={proj.role || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentResume((prev) => ({
                          ...prev,
                          projects: prev.projects.map((p) =>
                            p.id === proj.id ? { ...p, role: val } : p
                          ),
                        }));
                      }}
                      className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Your Role (e.g. Lead Architect)"
                    />
                  </div>
                  <input
                    type="text"
                    value={proj.technologies.join(', ')}
                    onChange={(e) => {
                      const list = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      updateCurrentResume((prev) => ({
                        ...prev,
                        projects: prev.projects.map((p) =>
                          p.id === proj.id ? { ...p, technologies: list } : p
                        ),
                      }));
                    }}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                    placeholder="Technologies (e.g. React, Node.js, AWS)"
                  />
                </div>
              ))}
            </div>
          )}

          {/* SECTION 7: CERTIFICATIONS & LANGUAGES */}
          {activeSection === 'certifications' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Certifications & Licenses</h3>
                <button
                  onClick={() => {
                    const newCert = {
                      id: 'cert-' + Date.now(),
                      name: 'Certification Title',
                      issuer: 'Issuing Organization',
                      issueDate: '2023-08',
                    };
                    updateCurrentResume((prev) => ({
                      ...prev,
                      certifications: [...(prev.certifications || []), newCert],
                    }));
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Cert</span>
                </button>
              </div>

              {currentResume.certifications && currentResume.certifications.map((c) => (
                <div key={c.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCurrentResume((prev) => ({
                        ...prev,
                        certifications: prev.certifications.map((item) =>
                          item.id === c.id ? { ...item, name: val } : item
                        ),
                      }));
                    }}
                    className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg flex-1"
                    placeholder="Certification Name"
                  />
                  <input
                    type="text"
                    value={c.issuer}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCurrentResume((prev) => ({
                        ...prev,
                        certifications: prev.certifications.map((item) =>
                          item.id === c.id ? { ...item, issuer: val } : item
                        ),
                      }));
                    }}
                    className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg w-36"
                    placeholder="Issuer"
                  />
                  <button
                    onClick={() => {
                      updateCurrentResume((prev) => ({
                        ...prev,
                        certifications: prev.certifications.filter((item) => item.id !== c.id),
                      }));
                    }}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 8: LANGUAGES */}
          {activeSection === 'languages' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Languages</h3>
                <button
                  onClick={() => {
                    const newLang = {
                      id: 'lang-' + Date.now(),
                      language: 'Language',
                      proficiency: 'Fluent' as const,
                    };
                    updateCurrentResume((prev) => ({
                      ...prev,
                      languages: [...(prev.languages || []), newLang],
                    }));
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Language</span>
                </button>
              </div>

              {currentResume.languages && currentResume.languages.map((l) => (
                <div key={l.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={l.language}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCurrentResume((prev) => ({
                        ...prev,
                        languages: prev.languages.map((item) =>
                          item.id === l.id ? { ...item, language: val } : item
                        ),
                      }));
                    }}
                    className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg flex-1"
                    placeholder="e.g. English, Spanish, French"
                  />
                  <select
                    value={l.proficiency}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      updateCurrentResume((prev) => ({
                        ...prev,
                        languages: prev.languages.map((item) =>
                          item.id === l.id ? { ...item, proficiency: val } : item
                        ),
                      }));
                    }}
                    className="text-xs px-2 py-1.5 bg-white border border-slate-200 rounded-lg"
                  >
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Professional">Professional</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                  <button
                    onClick={() => {
                      updateCurrentResume((prev) => ({
                        ...prev,
                        languages: prev.languages.filter((item) => item.id !== l.id),
                      }));
                    }}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 9: TEMPLATE & DESIGN CONTROLS */}
          {activeSection === 'design' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Template & Styling</h3>
                <p className="text-xs text-slate-500">Customize layout, color palette, typography and density</p>
              </div>

              {/* Template Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Select Template</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() =>
                        updateCurrentResume((prev) => ({
                          ...prev,
                          styling: { ...prev.styling, template: tpl.id },
                        }))
                      }
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        currentResume.styling?.template === tpl.id
                          ? 'border-blue-600 bg-blue-50/80 font-bold text-blue-900 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="truncate">{tpl.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{tpl.category}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palettes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Accent Color Palette</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {COLOR_PALETTES.map((cp, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        updateCurrentResume((prev) => ({
                          ...prev,
                          styling: {
                            ...prev.styling,
                            primaryColor: cp.primary,
                            secondaryColor: cp.secondary,
                          },
                        }))
                      }
                      className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cp.primary }} />
                      <span className="text-xs font-medium text-slate-700 truncate">{cp.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Font Family</label>
                <select
                  value={currentResume.styling?.fontFamily || 'Inter'}
                  onChange={(e) =>
                    updateCurrentResume((prev) => ({
                      ...prev,
                      styling: { ...prev.styling, fontFamily: e.target.value as any },
                    }))
                  }
                  className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-200 rounded-lg"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Spacing & Margins */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section Spacing</label>
                  <select
                    value={currentResume.styling?.spacing || 'normal'}
                    onChange={(e) =>
                      updateCurrentResume((prev) => ({
                        ...prev,
                        styling: { ...prev.styling, spacing: e.target.value as any },
                      }))
                    }
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                  >
                    <option value="tight">Tight</option>
                    <option value="normal">Normal</option>
                    <option value="relaxed">Relaxed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Page Margins</label>
                  <select
                    value={currentResume.styling?.margins || 'normal'}
                    onChange={(e) =>
                      updateCurrentResume((prev) => ({
                        ...prev,
                        styling: { ...prev.styling, margins: e.target.value as any },
                      }))
                    }
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                  >
                    <option value="narrow">Narrow</option>
                    <option value="normal">Normal</option>
                    <option value="wide">Wide</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ================= RIGHT SIDE: LIVE PREVIEW (7 COLS) ================= */}
        <div className={`lg:col-span-6 xl:col-span-7 bg-slate-200/70 p-2 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-120px)] flex flex-col items-center ${mobileTab === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Zoom controls floating bar */}
          <div className="mb-3 sm:mb-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-slate-200 flex items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-700">
            <span className="text-slate-500 text-[11px] sm:text-xs">Zoom:</span>
            <button
              onClick={() => setZoomMode('fit')}
              className={`px-2.5 py-0.5 rounded-full transition-colors ${zoomMode === 'fit' ? 'bg-blue-600 text-white shadow-xs' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              Fit
            </button>
            <button
              onClick={() => setZoomMode('75')}
              className={`px-2 py-0.5 rounded-full transition-colors ${zoomMode === '75' ? 'bg-blue-600 text-white shadow-xs' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              75%
            </button>
            <button
              onClick={() => setZoomMode('100')}
              className={`px-2 py-0.5 rounded-full transition-colors ${zoomMode === '100' ? 'bg-blue-600 text-white shadow-xs' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              100%
            </button>
          </div>

          {/* Actual Document Render Container */}
          <div className="w-full flex justify-center overflow-x-auto pb-8 scrollbar-none">
            <div
              className="origin-top transition-transform shrink-0"
              style={{
                width: `${850 * currentScale}px`,
                minWidth: `${850 * currentScale}px`,
              }}
            >
              <div
                style={{
                  width: '850px',
                  transform: `scale(${currentScale})`,
                  transformOrigin: 'top left',
                }}
              >
                <ResumeRenderer resume={currentResume} scale={1} previewMode={false} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= AI BULLETS MODAL ================= */}
      {aiModalType === 'bullets' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">AI Bullet Points Generator</h3>
              </div>
              <button
                onClick={() => setAiModalType(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Describe what you did or paste rough notes. The AI will convert it into action-driven Google XYZ formulas with strong metrics and power verbs.
            </p>

            <textarea
              rows={3}
              value={bulletNotes}
              onChange={(e) => setBulletNotes(e.target.value)}
              placeholder="e.g. Worked on speed improvements for the checkout page, reduced errors, and helped team members."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <button
              onClick={handleGenerateBulletsSubmit}
              disabled={aiLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              {aiLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Synthesizing high-impact bullets...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate 4 High-Impact Bullets (1 AI Credit)</span>
                </>
              )}
            </button>

            {generatedBullets.length > 0 && (
              <div className="space-y-2.5 max-h-64 overflow-y-auto pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700">Click to add directly to your resume:</h4>
                {generatedBullets.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-blue-600">{item.actionVerb} • {item.impactType}</span>
                      <button
                        onClick={() => handleAcceptBullet(item.bullet)}
                        className="px-2 py-1 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 cursor-pointer"
                      >
                        + Add to Role
                      </button>
                    </div>
                    <p className="text-xs text-slate-800">{item.bullet}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
