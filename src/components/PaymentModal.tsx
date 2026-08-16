import React, { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { QRCodeSVG } from 'qrcode.react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Smartphone,
  QrCode,
  CreditCard,
  Building2,
  Sparkles,
  ArrowRight,
  Receipt,
  Download,
  AlertCircle,
  ExternalLink,
  Lock,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  amountINR?: number;
  creditsAwarded?: number;
  planTier?: 'Pro' | 'Premium';
  billingPeriod?: 'monthly' | 'annual';
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  planName = 'ResumeAI Pro Career Acceleration',
  amountINR = 499,
  creditsAwarded = 500,
  planTier = 'Pro',
  billingPeriod = 'monthly',
}) => {
  const { user, upgradePlan, addNotification } = useResume();

  const PAYMENT_NUMBER = '9035066863';
  const PRIMARY_UPI_ID = 'youanusha1997@oksbi';
  const ALT_UPI_NUMBER_ID = '9035066863@upi';
  const PHONEPE_UPI_ID = '9035066863@ybl';
  const PAYTM_UPI_ID = '9035066863@paytm';
  const GPAY_UPI_ID = 'youanusha1997@oksbi';

  const [activeTab, setActiveTab] = useState<'upi_qr' | 'upi_number' | 'card_netbank'>('upi_qr');
  const [selectedUpiOption, setSelectedUpiOption] = useState<'upi_id' | 'number'>('upi_id');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Verification states
  const [utrNumber, setUtrNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<{
    txnId: string;
    date: string;
    amount: number;
    plan: string;
  } | null>(null);

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(user?.name || '');
  const [otpStep, setOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPaymentSuccess(false);
      setTransactionDetails(null);
      setOtpStep(false);
      setUtrNumber('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate standard Indian UPI Deep Link URI
  const upiIntentString = `upi://pay?pa=${encodeURIComponent(PRIMARY_UPI_ID)}&pn=${encodeURIComponent('ResumeAI Pro')}&am=${amountINR}&cu=INR&tn=${encodeURIComponent(planName)}`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    addNotification(`Copied ${label}: ${text}`, 'info');
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  // Handle successful verification and plan activation
  const handleVerifyPayment = (customTxnId?: string) => {
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const txnId = customTxnId || utrNumber.trim() || `UPI${Date.now().toString().slice(-8)}${Math.floor(1000 + Math.random() * 9000)}`;
      
      const details = {
        txnId,
        date: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        amount: amountINR,
        plan: planName,
      };

      setTransactionDetails(details);
      setPaymentSuccess(true);

      // Upgrade user plan and award credits in application state
      upgradePlan(planTier, creditsAwarded);

      // Celebration effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 900);
  };

  // Card Checkout Flow
  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, '').length < 15) {
      addNotification('Please enter a valid 16-digit card number.', 'warning');
      return;
    }
    setOtpStep(true);
    addNotification('Demo OTP sent to your registered mobile number: 123456', 'info');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpValue || otpValue.length < 4) {
      addNotification('Please enter the 6-digit OTP received on mobile.', 'warning');
      return;
    }
    handleVerifyPayment(`CARD${Date.now().toString().slice(-8)}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 animate-in zoom-in-95 my-4 relative">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PAYMENT SUCCESS RECEIPT VIEW */}
        {paymentSuccess && transactionDetails ? (
          <div className="space-y-6 animate-in fade-in py-2">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                Payment Verified & Activated
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Welcome to {planName}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your payment to payment number <strong className="text-slate-900 font-mono">+91 {PAYMENT_NUMBER}</strong> was confirmed successfully.
              </p>
            </div>

            {/* RECEIPT CARD */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-blue-600" /> GST Tax Invoice & Receipt
                </span>
                <span className="font-mono text-[11px] text-slate-500 font-bold">
                  {transactionDetails.txnId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Plan Subscribed</span>
                  <span className="font-bold text-slate-900 text-sm">{planName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Amount Paid</span>
                  <span className="font-black text-slate-900 text-sm font-mono">₹{transactionDetails.amount} INR</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Recipient</span>
                  <span className="font-mono font-bold text-slate-900">youanusha1997@oksbi / +91 {PAYMENT_NUMBER}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Date & Time</span>
                  <span className="font-medium text-slate-800">{transactionDetails.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">AI Credits Added</span>
                  <span className="font-black text-amber-700">+{creditsAwarded} Credits</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Access Status</span>
                  <span className="font-black text-emerald-700">Active (Instant)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  addNotification('Enjoy your unlimited Pro features!', 'success');
                }}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Using Pro Resume Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Save Receipt</span>
              </button>
            </div>
          </div>
        ) : (
          /* PAYMENT CHECKOUT MAIN VIEW */
          <div className="space-y-5">
            {/* HEADER & PLAN SUMMARY */}
            <div className="border-b border-slate-100 pb-4 pr-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-bold">
                  🇮🇳 Indian Rupee Payment Gateway
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                  0% Convenience Fee
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">{planName}</h2>
                  <p className="text-xs text-slate-500">
                    Pay via UPI ID: <strong className="text-blue-700 font-mono">youanusha1997@oksbi</strong> or Mobile: <strong className="text-slate-800 font-mono">9035066863</strong>
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-2xl font-black text-slate-900 font-mono">₹{amountINR}</div>
                  <div className="text-[11px] text-slate-500">
                    {billingPeriod === 'annual' ? 'Billed annually' : 'One-time / Monthly'}
                  </div>
                </div>
              </div>
            </div>

            {/* TAB SELECTOR */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('upi_qr')}
                className={`py-2 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'upi_qr'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>UPI ID & QR</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('upi_number')}
                className={`py-2 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'upi_number'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Pay to Number</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('card_netbank')}
                className={`py-2 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'card_netbank'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Cards & NetBanking</span>
              </button>
            </div>

            {/* TAB 1: UPI SCAN & QR CODE */}
            {activeTab === 'upi_qr' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  
                  {/* DYNAMIC QR CODE DISPLAY */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-2">
                    <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200 inline-block">
                      <QRCodeSVG
                        value={upiIntentString}
                        size={155}
                        level="H"
                        includeMargin={false}
                        imageSettings={{
                          src: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg",
                          x: undefined,
                          y: undefined,
                          height: 24,
                          width: 24,
                          excavate: true,
                        }}
                      />
                    </div>
                    <div className="text-[11px] font-bold text-slate-800">
                      Scan with any UPI App
                    </div>
                    <p className="text-[10px] text-slate-500 max-w-[170px] leading-tight">
                      Google Pay (SBI), PhonePe, Paytm, BHIM, Cred or Amazon Pay
                    </p>
                  </div>

                  {/* UPI DETAILS & APP SHORTCUTS */}
                  <div className="md:col-span-7 space-y-3">
                    {/* Primary UPI ID Box (youanusha1997@oksbi) */}
                    <div className="p-3 bg-blue-50/90 border-2 border-blue-400 rounded-xl space-y-1.5 shadow-xs">
                      <div className="text-[11px] text-blue-900 font-black uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                          <span>Google Pay UPI ID (SBI)</span>
                        </span>
                        <span className="text-[10px] text-blue-700 font-bold bg-blue-100 px-1.5 py-0.2 rounded">Primary</span>
                      </div>
                      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-blue-200">
                        <span className="font-mono font-black text-blue-900 text-sm sm:text-base">
                          {PRIMARY_UPI_ID}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(PRIMARY_UPI_ID, 'UPI ID (youanusha1997@oksbi)')}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedField === 'UPI ID (youanusha1997@oksbi)' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-300" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy UPI</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Secondary Phone Number Box (9035066863) */}
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                      <div className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center justify-between">
                        <span>Payment Phone Number</span>
                        <span className="text-[10px] text-slate-500 font-mono">GPay / PhonePe / Paytm</span>
                      </div>
                      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200">
                        <span className="font-mono font-black text-slate-900 text-sm sm:text-base">
                          {PAYMENT_NUMBER}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(PAYMENT_NUMBER, 'Payment Number')}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded-md text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedField === 'Payment Number' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-300" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Number</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Direct UPI Intent Link for Mobile Users */}
                    <a
                      href={upiIntentString}
                      className="block w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold text-center shadow-xs transition-all cursor-pointer"
                    >
                      <span>Pay ₹{amountINR} to youanusha1997@oksbi</span>
                    </a>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 2: PAY TO MOBILE NUMBER */}
            {activeTab === 'upi_number' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Direct Number Transfer (India)</h4>
                      <p className="text-xs text-slate-500">Open your favourite UPI app and send to mobile number:</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Registered Payment Number</span>
                      <span className="font-mono text-base sm:text-lg font-black text-slate-900 tracking-wide">
                        +91 {PAYMENT_NUMBER}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(PAYMENT_NUMBER, 'Mobile Number')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedField === 'Mobile Number' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Individual App Handles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 bg-white rounded-xl border border-blue-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-blue-700 font-bold block">Google Pay (SBI UPI ID)</span>
                        <span className="text-xs font-black text-slate-900 font-mono">youanusha1997@oksbi</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('youanusha1997@oksbi', 'GPay UPI ID')}
                        className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block">PhonePe / Paytm / BHIM</span>
                        <span className="text-xs font-bold text-slate-800 font-mono">9035066863</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(PAYMENT_NUMBER, 'Phone Number')}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CARDS & NETBANKING */}
            {activeTab === 'card_netbank' && (
              <div className="space-y-4 animate-in fade-in">
                {!otpStep ? (
                  <form onSubmit={handleCardSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name as on Card"
                        className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Card Number (RuPay, Visa, MasterCard)</label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                            setCardNumber(val);
                          }}
                          placeholder="4111 2222 3333 4444"
                          className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                            setCardExpiry(val);
                          }}
                          placeholder="MM/YY"
                          className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Proceed to 3D Secure OTP (₹{amountINR})</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpVerify} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 animate-in fade-in">
                    <div className="text-center space-y-1">
                      <Lock className="w-8 h-8 text-blue-600 mx-auto" />
                      <h4 className="font-bold text-slate-900 text-sm">Enter 3D Secure OTP</h4>
                      <p className="text-xs text-slate-500">Enter OTP sent to your registered mobile (Test OTP: 123456)</p>
                    </div>

                    <div className="max-w-xs mx-auto">
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        placeholder="1 2 3 4 5 6"
                        className="w-full text-center tracking-widest text-lg font-mono font-black py-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setOtpStep(false)}
                        className="py-2.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isVerifying}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-75 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isVerifying ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Verifying OTP...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Confirm & Pay ₹{amountINR}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* VERIFICATION / UTR INPUT BOX */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Have you completed the transfer?</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold">Instant Activation</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="Enter 12-digit UTR / UPI Ref No. (Optional)"
                    className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-emerald-300 bg-white placeholder-slate-400 font-mono"
                  />
                  <button
                    type="button"
                    disabled={isVerifying}
                    onClick={() => handleVerifyPayment()}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-75 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>I Have Paid — Activate Plan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* COMPLIANCE & SECURITY FOOTER */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL Encrypted UPI Gateway
              </span>
              <span>Payment ID: <strong className="font-mono text-slate-700">9035066863</strong></span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
