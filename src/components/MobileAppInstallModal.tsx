import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  Share,
  PlusSquare,
  CheckCircle2,
  X,
  QrCode,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Logo } from './Logo';

interface MobileAppInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileAppInstallModal: React.FC<MobileAppInstallModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [platform, setPlatform] = useState<'ios' | 'android'>('android');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect iOS vs Android user agent
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else {
      setPlatform('android');
    }

    // Check if running in standalone mode (already installed)
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('To install, tap your browser menu (⋮ or Share) and select "Add to Home Screen" or "Install App".');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Smartphone className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-black">Install ResumeAI Mobile App</h3>
          <p className="text-xs text-blue-100 mt-1">
            Access your resumes, live ATS scanner, and AI tools with 1 tap from your home screen.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* OS Switcher Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setPlatform('android')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                platform === 'android' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Android (Chrome / Samsung)
            </button>
            <button
              onClick={() => setPlatform('ios')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                platform === 'ios' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              iPhone / iPad (iOS Safari)
            </button>
          </div>

          {/* Android Steps */}
          {platform === 'android' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs text-slate-700">
                  Tap the <strong>Install App</strong> button below or tap the Chrome menu (<strong>⋮</strong>) in the top right.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs text-slate-700">
                  Select <strong>Install app</strong> or <strong>Add to Home Screen</strong>.
                </div>
              </div>

              <button
                onClick={handleInstallClick}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Download className="w-4 h-4" />
                <span>Install Mobile App (Instant)</span>
              </button>
            </div>
          )}

          {/* iOS Steps */}
          {platform === 'ios' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs text-slate-700">
                  Open this page in <strong>Safari</strong> and tap the <strong>Share</strong> button (
                  <Share className="w-3.5 h-3.5 inline text-blue-600 mx-0.5" />) at the bottom toolbar.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs text-slate-700">
                  Scroll down the share sheet and tap <strong>Add to Home Screen</strong> (
                  <PlusSquare className="w-3.5 h-3.5 inline text-slate-800 mx-0.5" />).
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div className="text-xs text-slate-700">
                  Tap <strong>Add</strong> in the top right. Launch ResumeAI directly from your home screen!
                </div>
              </div>
            </div>
          )}

          {/* Feature Badges */}
          <div className="pt-2 grid grid-cols-3 gap-2 border-t border-slate-100 text-center">
            <div className="p-2 rounded-xl bg-slate-50">
              <Zap className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-800">Fast Native Feel</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-800">Offline Cache</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <Sparkles className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-800">Auto Synced</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
