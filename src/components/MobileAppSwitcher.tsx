import React from 'react';
import { Smartphone, Monitor, Download, QrCode } from 'lucide-react';

interface MobileAppSwitcherProps {
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onOpenInstallModal: () => void;
}

export const MobileAppSwitcher: React.FC<MobileAppSwitcherProps> = ({
  isMobileFrame,
  onToggleMobileFrame,
  onOpenInstallModal,
}) => {
  return (
    <div className="hidden lg:flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-full border border-slate-700 shadow-md">
      <button
        onClick={onToggleMobileFrame}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          isMobileFrame
            ? 'bg-blue-600 text-white shadow-xs'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
        title="Toggle Mobile App Frame Simulator"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>{isMobileFrame ? 'Mobile App Mode Active' : '📱 Mobile App View'}</span>
      </button>

      <div className="w-[1px] h-3.5 bg-slate-700" />

      <button
        onClick={onOpenInstallModal}
        className="flex items-center gap-1 text-slate-300 hover:text-white text-xs font-semibold px-2 py-1 rounded-full hover:bg-slate-800 cursor-pointer"
        title="Install Mobile App on Phone"
      >
        <Download className="w-3.5 h-3.5 text-emerald-400" />
        <span>Install App</span>
      </button>
    </div>
  );
};
