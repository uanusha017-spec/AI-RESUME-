import React from 'react';
import { useResume } from '../context/ResumeContext';
import {
  Plus,
  Upload,
  Target,
  Sparkles,
  Layers,
  Mail,
  Bot,
  Linkedin,
  X,
  Zap,
} from 'lucide-react';

interface MobileQuickSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewResume: () => void;
  onOpenUploadResume: () => void;
  onOpenCreditsModal: () => void;
}

export const MobileQuickSheet: React.FC<MobileQuickSheetProps> = ({
  isOpen,
  onClose,
  onOpenNewResume,
  onOpenUploadResume,
  onOpenCreditsModal,
}) => {
  const { setActiveTab, aiCredits } = useResume();

  if (!isOpen) return null;

  const handleAction = (callback: () => void) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // ignore
      }
    }
    onClose();
    callback();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Bottom Sheet Drawer */}
      <div className="relative z-10 bg-white rounded-t-3xl border-t border-slate-200 shadow-2xl p-5 pb-8 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        {/* Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900">Mobile Quick Actions</h3>
            <p className="text-xs text-slate-500">What would you like to create today?</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Credits Pill */}
        <div className="p-3 mb-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-amber-900">Available AI Balance:</span>
            <span className="font-mono text-xs font-black text-amber-800">{aiCredits} Credits</span>
          </div>
          <button
            onClick={() => handleAction(onOpenCreditsModal)}
            className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 text-[11px] font-black rounded-lg cursor-pointer"
          >
            + Claim Free
          </button>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handleAction(onOpenNewResume)}
            className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-left transition-all flex flex-col justify-between shadow-md cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Plus className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xs font-bold">New Resume</div>
              <div className="text-[10px] text-blue-100 mt-0.5">Start blank or sample</div>
            </div>
          </button>

          <button
            onClick={() => handleAction(onOpenUploadResume)}
            className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-900 text-left transition-all flex flex-col justify-between border border-slate-200 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs font-bold">Upload Resume</div>
              <div className="text-[10px] text-slate-500 mt-0.5">PDF, DOCX, TXT</div>
            </div>
          </button>

          <button
            onClick={() => handleAction(() => setActiveTab('ats-checker'))}
            className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left flex items-center gap-3 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">ATS Audit & Score</div>
              <div className="text-[10px] text-slate-500 truncate">Match with job postings</div>
            </div>
          </button>

          <button
            onClick={() => handleAction(() => setActiveTab('templates'))}
            className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left flex items-center gap-3 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-purple-600" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">12 Templates</div>
              <div className="text-[10px] text-slate-500 truncate">ATS certified layouts</div>
            </div>
          </button>

          <button
            onClick={() => handleAction(() => setActiveTab('cover-letters'))}
            className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left flex items-center gap-3 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">Cover Letter</div>
              <div className="text-[10px] text-slate-500 truncate">AI targeted pitch</div>
            </div>
          </button>

          <button
            onClick={() => handleAction(() => setActiveTab('interview-prep'))}
            className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left flex items-center gap-3 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-amber-600" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">STAR Coach</div>
              <div className="text-[10px] text-slate-500 truncate">Mock interview questions</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
