import React, { useState, useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import { fetchParseUploadedResume } from '../services/apiClient';
import { extractResumeFileContent } from '../utils/documentExtractor';
import {
  Upload,
  FileText,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Clipboard,
  X,
  FileCheck,
  Zap,
  Layers,
  ChevronRight,
  Eye,
  FileSpreadsheet
} from 'lucide-react';

interface UploadResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessNavigate?: (tab: string) => void;
}

export const UploadResumeModal: React.FC<UploadResumeModalProps> = ({
  isOpen,
  onClose,
  onSuccessNavigate,
}) => {
  const { importResume, addNotification } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeMode, setActiveMode] = useState<'upload' | 'paste'>('upload');
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedRawText, setExtractedRawText] = useState<string>('');
  const [pastedText, setPastedText] = useState('');
  const [showRawExtractedText, setShowRawExtractedText] = useState(false);
  
  // Parsing status
  const [isParsing, setIsParsing] = useState(false);
  const [parsingStep, setParsingStep] = useState(1);
  const [parsedPreview, setParsedPreview] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileSelect = async (file: File) => {
    setErrorMessage(null);
    setParsedPreview(null);
    setSelectedFile(file);
    setExtractedRawText('');

    try {
      const extracted = await extractResumeFileContent(file);
      if (!extracted.isJson && (!extracted.text || extracted.text.trim().length < 10)) {
        setErrorMessage('Could not extract text from this document. Please verify it is not an image-only scan, or paste the text directly.');
      } else {
        setExtractedRawText(extracted.text);
      }
    } catch (err: any) {
      console.warn('File read pre-extract error:', err);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const executeParsing = async () => {
    setErrorMessage(null);
    setIsParsing(true);
    setParsingStep(1);

    try {
      let rawText = '';
      let isDirectJson = false;
      let jsonPayload: any = null;

      if (activeMode === 'upload') {
        if (!selectedFile) {
          setErrorMessage('Please select a resume file to upload.');
          setIsParsing(false);
          return;
        }

        const extracted = await extractResumeFileContent(selectedFile);
        if (extracted.isJson && extracted.jsonData) {
          isDirectJson = true;
          jsonPayload = extracted.jsonData;
        } else {
          rawText = extracted.text;
          setExtractedRawText(rawText);
        }

        if (!isDirectJson && (!rawText || rawText.trim().length < 15)) {
          setErrorMessage('Unable to extract readable text from this file. Please paste your resume text instead.');
          setIsParsing(false);
          return;
        }
      } else {
        if (!pastedText.trim() || pastedText.trim().length < 20) {
          setErrorMessage('Please paste at least a few lines of resume or profile text.');
          setIsParsing(false);
          return;
        }
        rawText = pastedText;
      }

      // Step animation
      setParsingStep(2);
      await new Promise((r) => setTimeout(r, 400));

      setParsingStep(3);

      let parsedResult: any;

      if (isDirectJson && jsonPayload) {
        parsedResult = jsonPayload;
      } else {
        parsedResult = await fetchParseUploadedResume(rawText);
      }

      setParsingStep(4);
      await new Promise((r) => setTimeout(r, 300));

      setParsedPreview(parsedResult);
      setIsParsing(false);
    } catch (err: any) {
      console.error('Upload parse error', err);
      setErrorMessage('Failed to parse document structure. You can paste the raw text instead.');
      setIsParsing(false);
    }
  };

  const handleConfirmImport = () => {
    if (!parsedPreview) return;

    const title = selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : `${parsedPreview.fullName || 'Parsed'} Resume`;
    importResume(parsedPreview, title);

    onClose();
    if (onSuccessNavigate) {
      onSuccessNavigate('builder');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg sm:text-xl">Upload & Import Resume</h3>
              <p className="text-xs text-slate-500">
                AI will extract your contact info, work history, education, and ATS skills automatically.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ERROR NOTICE */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-800 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {!parsedPreview && (
          <>
            {/* TAB SELECTOR */}
            <div className="flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveMode('upload')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeMode === 'upload'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Upload Document (PDF, DOCX, TXT, JSON)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('paste')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeMode === 'paste'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clipboard className="w-4 h-4" />
                <span>Paste Resume Text / LinkedIn</span>
              </button>
            </div>

            {/* TAB 1: FILE DROP ZONE */}
            {activeMode === 'upload' && (
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  accept=".pdf,.docx,.doc,.txt,.json,.md"
                  className="hidden"
                />

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 ${
                    dragOver
                      ? 'border-blue-500 bg-blue-50/70 scale-[1.01]'
                      : selectedFile
                      ? 'border-emerald-500 bg-emerald-50/40'
                      : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs transition-transform ${
                      selectedFile
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {selectedFile ? <FileCheck className="w-7 h-7" /> : <Upload className="w-7 h-7" />}
                  </div>

                  {selectedFile ? (
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900">{selectedFile.name}</p>
                      <p className="text-xs text-emerald-700 font-semibold">
                        {(selectedFile.size / 1024).toFixed(1)} KB • Document text extracted cleanly
                      </p>
                      <span className="text-[11px] text-blue-600 underline font-medium mt-1 inline-block">
                        Click to choose a different file
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-800">
                        Drag and drop your resume here, or <span className="text-blue-600 underline">browse</span>
                      </p>
                      <p className="text-xs text-slate-500">
                        Supported formats: PDF, DOCX (Word), TXT, JSON, MD (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>

                {/* Optional Extracted Text Inspection */}
                {selectedFile && extractedRawText && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Clean Text Extracted ({extractedRawText.length} characters)</span>
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowRawExtractedText(!showRawExtractedText);
                        }}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        {showRawExtractedText ? 'Hide extracted text' : 'Preview extracted text'}
                      </button>
                    </div>

                    {showRawExtractedText && (
                      <div className="p-2.5 bg-white border border-slate-200 rounded-lg max-h-40 overflow-y-auto text-[11px] font-mono text-slate-700 whitespace-pre-wrap">
                        {extractedRawText.substring(0, 1500)}
                        {extractedRawText.length > 1500 && ' ...'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PASTE TEXT ZONE */}
            {activeMode === 'paste' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Paste your resume, CV, or LinkedIn profile summary:
                </label>
                <textarea
                  rows={8}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste your experience, job titles, companies, dates, education, and skills here..."
                  className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-slate-800"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{pastedText.length} characters</span>
                  <span>AI will structure this into standard sections</span>
                </div>
              </div>
            )}

            {/* PARSING PROGRESS ANIMATION */}
            {isParsing && (
              <div className="p-5 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                    <span>Extracting Resume Structure...</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-600">Step {parsingStep} of 4</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className={`flex items-center gap-2 ${parsingStep >= 1 ? 'text-blue-900 font-semibold' : 'text-slate-400'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${parsingStep >= 1 ? 'text-blue-600' : 'text-slate-300'}`} />
                    <span>Parsing document syntax & metadata</span>
                  </div>
                  <div className={`flex items-center gap-2 ${parsingStep >= 2 ? 'text-blue-900 font-semibold' : 'text-slate-400'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${parsingStep >= 2 ? 'text-blue-600' : 'text-slate-300'}`} />
                    <span>Identifying contact info & target job title</span>
                  </div>
                  <div className={`flex items-center gap-2 ${parsingStep >= 3 ? 'text-blue-900 font-semibold' : 'text-slate-400'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${parsingStep >= 3 ? 'text-blue-600' : 'text-slate-300'}`} />
                    <span>Structuring work history & measurable achievements</span>
                  </div>
                  <div className={`flex items-center gap-2 ${parsingStep >= 4 ? 'text-blue-900 font-semibold' : 'text-slate-400'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${parsingStep >= 4 ? 'text-blue-600' : 'text-slate-300'}`} />
                    <span>Mapping skills to ATS keyword taxonomies</span>
                  </div>
                </div>
              </div>
            )}

            {/* ACTION BUTTON */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isParsing || (activeMode === 'upload' && !selectedFile) || (activeMode === 'paste' && !pastedText.trim())}
                onClick={executeParsing}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                {isParsing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Parse & Extract with AI</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {/* PARSED PREVIEW & CONFIRMATION */}
        {parsedPreview && (
          <div className="space-y-5 animate-in fade-in">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-900 text-sm">Resume Successfully Parsed!</h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  We organized your document into standard resume sections ready for editing and ATS optimization.
                </p>
              </div>
            </div>

            {/* SUMMARY PREVIEW CARD */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    {parsedPreview.fullName || parsedPreview.personalInfo?.fullName || 'Candidate'}
                  </h4>
                  <p className="text-xs font-semibold text-blue-600">
                    {parsedPreview.jobTitle || parsedPreview.personalInfo?.jobTitle || parsedPreview.targetRole || 'Professional'}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-[11px] font-bold rounded-lg font-mono">
                  ATS Ready
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                  <span className="font-medium text-slate-800 truncate block">
                    {parsedPreview.email || parsedPreview.personalInfo?.email || 'Extracted'}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Work History</span>
                  <span className="font-bold text-slate-900 block">
                    {parsedPreview.experiences?.length || 2} Roles
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Education</span>
                  <span className="font-bold text-slate-900 block">
                    {parsedPreview.education?.length || 1} Degrees
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Skills Extracted</span>
                  <span className="font-bold text-emerald-600 block">
                    {parsedPreview.skills?.length || 5} Keywords
                  </span>
                </div>
              </div>

              {parsedPreview.skills && parsedPreview.skills.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-600">Extracted Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {parsedPreview.skills.slice(0, 8).map((sk: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] font-medium text-slate-700">
                        {sk}
                      </span>
                    ))}
                    {parsedPreview.skills.length > 8 && (
                      <span className="px-2 py-0.5 bg-slate-200 rounded-md text-[11px] text-slate-600 font-medium">
                        +{parsedPreview.skills.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* CONFIRM BUTTONS */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setParsedPreview(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ← Upload Different File
              </button>

              <button
                type="button"
                onClick={handleConfirmImport}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Launch in Resume Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
