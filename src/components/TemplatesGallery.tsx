import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { TEMPLATES } from '../data/templates';
import { ResumeRenderer } from './ResumeTemplates/ResumeRenderer';
import {
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  Sliders
} from 'lucide-react';

export const TemplatesGallery: React.FC<{ onNavigateToBuilder: () => void }> = ({
  onNavigateToBuilder,
}) => {
  const { currentResume, updateCurrentResume, createNewResume, addNotification } = useResume();
  const [filter, setFilter] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'All Templates (12)' },
    { id: 'ATS Classic', label: 'ATS Classic (4)' },
    { id: 'Modern', label: 'Modern & Clean (4)' },
    { id: 'Creative', label: 'Creative & Tech (2)' },
    { id: 'Academic', label: 'Academic & CV (2)' },
  ];

  const filtered = filter === 'all'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category.toLowerCase().includes(filter.toLowerCase()));

  const handleApplyTemplate = (tplId: string) => {
    updateCurrentResume((prev) => ({
      ...prev,
      styling: {
        ...prev.styling,
        template: tplId as any,
      },
    }));
    addNotification(`Applied template: ${tplId}!`, 'success');
    onNavigateToBuilder();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-2">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>12 Recruiter-Approved Layouts</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Resume Templates Gallery
            </h1>
            <p className="text-sm text-slate-600">
              Every template is built with clean HTML hierarchy to guarantee 100% readability by ATS parsers.
            </p>
          </div>
        </div>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                filter === c.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* TEMPLATES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-400 transition-all flex flex-col justify-between group"
            >
              {/* Card visual preview mock */}
              <div className="p-6 bg-slate-100/70 border-b border-slate-100 flex items-center justify-center min-h-[220px]">
                <div className="w-48 h-60 bg-white rounded shadow p-3 text-[7px] space-y-2 overflow-hidden select-none border border-slate-200 group-hover:scale-105 transition-transform">
                  <div className="h-3 w-24 bg-slate-800 rounded-sm mb-1" />
                  <div className="h-1.5 w-16 bg-blue-600 rounded-sm mb-2" />
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-slate-300 rounded-sm" />
                    <div className="h-1 w-5/6 bg-slate-300 rounded-sm" />
                    <div className="h-1 w-4/6 bg-slate-300 rounded-sm" />
                  </div>
                  <div className="pt-1 space-y-1">
                    <div className="h-2 w-14 bg-slate-700 rounded-sm" />
                    <div className="h-1 w-full bg-slate-200 rounded-sm" />
                    <div className="h-1 w-11/12 bg-slate-200 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {tpl.category}
                    </span>
                    {tpl.isATS100 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% ATS
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{tpl.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{tpl.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {tpl.recommendedColors.map((col, i) => (
                      <span key={i} className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: col }} />
                    ))}
                  </div>

                  <button
                    onClick={() => handleApplyTemplate(tpl.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Use Template →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
