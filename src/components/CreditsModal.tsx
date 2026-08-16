import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import {
  Sparkles,
  Zap,
  Gift,
  CheckCircle2,
  TrendingUp,
  X,
  ShieldCheck,
  Star,
  Award,
  Layers,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPayment?: (planName: string, amountINR: number, credits: number) => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose, onOpenPayment }) => {
  const { aiCredits, addCredit, addNotification } = useResume();
  const [claimedKey, setClaimedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'free' | 'buy_upi'>('free');

  if (!isOpen) return null;

  const handleClaim = (amount: number, packName: string, key: string) => {
    addCredit(amount);
    setClaimedKey(key);
    addNotification(`🎉 Successfully added +${amount} AI Credits! (${packName})`, 'success');
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setClaimedKey(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg sm:text-xl">AI Credits & Refill Center</h3>
              <p className="text-xs text-slate-500">
                Claim free credits to power your resume bullet polisher, ATS checks, and mock interviews.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CURRENT BALANCE BANNER */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 text-white shadow-lg shadow-amber-500/20 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
              Current Available Balance
            </span>
            <div className="text-3xl font-black">{aiCredits} Credits</div>
            <span className="text-[11px] text-amber-100 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> High-speed Gemini 2.5 / 3.7 active
            </span>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
            <Flame className="w-7 h-7 animate-pulse" />
          </div>
        </div>

        {/* TAB SELECTOR */}
        <div className="flex rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('free')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'free'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Claim Free Refills</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('buy_upi')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'buy_upi'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🇮🇳 Buy Packs (UPI / 9035066863)</span>
          </button>
        </div>

        {/* TAB 1: FREE REFILL TIERS */}
        {activeTab === 'free' ? (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Claim Free Refill Packs
            </label>

            {/* Tier 1: Daily Boost */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">Daily Refresh Booster</div>
                  <div className="text-[11px] text-slate-500">Perfect for bullet point fine-tuning</div>
                </div>
              </div>

              <button
                onClick={() => handleClaim(50, 'Daily Booster', 'daily')}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                {claimedKey === 'daily' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>+50 Free</span>
                  </>
                )}
              </button>
            </div>

            {/* Tier 2: Pro Career Pack */}
            <div className="p-4 rounded-xl border-2 border-amber-400 bg-amber-50/40 transition-all flex items-center justify-between gap-3 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xs sm:text-sm text-slate-900">Pro Career Pack</span>
                    <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 font-extrabold text-[9px] rounded uppercase">
                      Popular
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">Complete multi-role resume & cover letter overhaul</div>
                </div>
              </div>

              <button
                onClick={() => handleClaim(150, 'Pro Career Pack', 'pro')}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1 cursor-pointer shrink-0"
              >
                {claimedKey === 'pro' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>+150 Free</span>
                  </>
                )}
              </button>
            </div>

            {/* Tier 3: Unlimited Evaluator Supercharge */}
            <div className="p-4 rounded-xl border border-purple-200 hover:border-purple-400 hover:bg-purple-50/30 transition-all flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">Executive Evaluator Pack</div>
                  <div className="text-[11px] text-slate-500">Extensive mock interview prep & unlimited versions</div>
                </div>
              </div>

              <button
                onClick={() => handleClaim(500, 'Executive Evaluator Pack', 'super')}
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                {claimedKey === 'super' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-3.5 h-3.5" />
                    <span>+500 Free</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* TAB 2: BUY PACKS VIA INDIAN UPI TO 9035066863 or youanusha1997@oksbi */
          <div className="space-y-3 animate-in fade-in">
            <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-blue-900 font-bold">UPI ID:</span>
                <span className="font-mono font-black text-blue-900 bg-white px-2 py-0.5 rounded border border-blue-200">
                  youanusha1997@oksbi
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Phone:</span>
                <span className="font-mono font-semibold text-slate-700">
                  +91 9035066863
                </span>
              </div>
            </div>

            {/* Pack 1 */}
            <div className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 flex items-center justify-between gap-3 bg-white">
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900">150 AI Credits Pack</div>
                <div className="text-[11px] text-slate-500">Instant UPI to youanusha1997@oksbi</div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenPayment) onOpenPayment('150 AI Credits Pack', 99, 150);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1"
              >
                <span>Pay ₹99</span>
              </button>
            </div>

            {/* Pack 2 */}
            <div className="p-3.5 rounded-xl border-2 border-blue-500 bg-blue-50/20 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xs sm:text-sm text-slate-900">500 Credits + Pro Plan</span>
                  <span className="px-1.5 py-0.2 bg-blue-600 text-white font-extrabold text-[9px] rounded uppercase">Best Value</span>
                </div>
                <div className="text-[11px] text-slate-600">Full unlock of ATS and Cover Letters</div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenPayment) onOpenPayment('ResumeAI Pro Acceleration Plan', 499, 500);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs flex items-center gap-1"
              >
                <span>Pay ₹499</span>
              </button>
            </div>

            {/* Pack 3 */}
            <div className="p-3.5 rounded-xl border border-purple-300 bg-purple-50/30 flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-xs sm:text-sm text-purple-950">1,500 Credits + Executive</div>
                <div className="text-[11px] text-purple-700">Unlimited Voice Mock Interviews & SLA</div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenPayment) onOpenPayment('Executive Career Acceleration Plan', 1299, 1500);
                }}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1"
              >
                <span>Pay ₹1,299</span>
              </button>
            </div>
          </div>
        )}

        {/* USAGE GUIDE INFO */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>AI Token Costs:</span>
          </div>
          <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-[11px]">
            <div>• Google XYZ Bullet: <span className="font-bold text-slate-800">1 Credit</span></div>
            <div>• Summary Variants: <span className="font-bold text-slate-800">1 Credit</span></div>
            <div>• ATS Match Audit: <span className="font-bold text-slate-800">1 Credit</span></div>
            <div>• STAR Mock Q&A: <span className="font-bold text-slate-800">1 Credit</span></div>
          </div>
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Done
        </button>

      </div>
    </div>
  );
};
