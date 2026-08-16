import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const MobileStatusBar: React.FC = () => {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setTime(`${hours}:${formattedMinutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900 text-white px-6 py-1.5 flex items-center justify-between text-xs font-semibold select-none z-50">
      <span className="font-mono text-[11px] font-bold">{time}</span>

      {/* Dynamic Island / Speaker Pill */}
      <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center space-x-1 border border-slate-800">
        <div className="w-2 h-2 rounded-full bg-slate-800" />
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
      </div>

      <div className="flex items-center gap-1.5 text-slate-300">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <BatteryMedium className="w-3.5 h-3.5 text-emerald-400" />
      </div>
    </div>
  );
};
