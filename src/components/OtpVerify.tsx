import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, RefreshCw, Loader2, Phone } from 'lucide-react';

export const OtpVerify: React.FC = () => {
  const { phoneNumber, role, verifyOtp, sendOtp, navigateTo, t, isDemoOtpMode } = useApp();
  const [otp, setOtp] = useState(isDemoOtpMode ? ['1', '2', '3', '4', '5', '6'] : ['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [resendMsg, setResendMsg] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (error) setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim().replace(/\D/g, '').slice(0, 6);
    if (pasteData) {
      const newOtp = pasteData.split('').concat(Array(6 - pasteData.length).fill(''));
      setOtp(newOtp);
      const nextFocus = Math.min(pasteData.length, 5);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  const handleResend = async () => {
    if (timer > 0 || resending) return;
    setResending(true);
    setError('');
    setResendMsg('');
    const res = await sendOtp(phoneNumber, 'recaptcha-resend-container');
    setResending(false);
    if (res.success) {
      setTimer(60);
      setResendMsg('New SMS OTP sent successfully!');
    } else {
      setError(res.error || 'Failed to resend SMS OTP.');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setError('Please enter the full 6-digit code sent to your phone');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await verifyOtp(fullOtp);
      if (res.success) {
        if (role === 'captain') {
          navigateTo('captain_type');
        } else {
          navigateTo('user_dashboard');
        }
      } else {
        setError(res.error || 'Verification failed. Please check the 6-digit code.');
      }
    } catch (err: any) {
      setError('Verification error: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <div id="recaptcha-resend-container"></div>

      {isDemoOtpMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 leading-relaxed shadow-xs">
          <p className="font-bold flex items-center gap-1.5 text-amber-800">
            <span>ℹ️</span> Firebase Phone Provider Notice
          </p>
          <p className="mt-1 text-amber-700">
            Phone Auth is disabled in Firebase Console (Authentication &gt; Sign-in method &gt; Phone). Fallback code <strong className="font-extrabold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">123456</strong> has been auto-filled for testing.
          </p>
        </div>
      )}

      <div className="text-center space-y-2 mt-4">
        <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t('verifyOtp')}</h1>
        <p className="text-xs text-slate-600 max-w-xs mx-auto">
          {t('verifyOtpSub')}{' '}
          <span className="font-bold text-slate-900">+91 {phoneNumber}</span>
        </p>
        <button
          type="button"
          onClick={() => navigateTo('otp_phone')}
          className="text-xs font-semibold text-blue-700 hover:underline inline-flex items-center gap-1"
        >
          <Phone className="w-3 h-3" /> Change Number
        </button>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex items-center justify-between gap-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => { inputRefs.current[idx] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              disabled={loading}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center font-black text-xl text-slate-900 bg-white border-2 border-slate-200 focus:border-blue-600 rounded-xl shadow-xs focus:outline-hidden transition-all disabled:bg-slate-50"
            />
          ))}
        </div>

        {error && (
          <p className="text-xs font-semibold text-rose-600 text-center leading-relaxed bg-rose-50 p-2.5 rounded-xl border border-rose-200">
            {error}
          </p>
        )}

        {resendMsg && (
          <p className="text-xs font-semibold text-emerald-700 text-center bg-emerald-50 p-2 rounded-lg border border-emerald-200">
            {resendMsg}
          </p>
        )}

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">SMS Sent via Firebase</span>

          {timer > 0 ? (
            <span className="text-slate-500 font-medium">Resend in {timer}s</span>
          ) : (
            <button
              type="button"
              disabled={resending}
              onClick={handleResend}
              className="text-blue-700 font-bold hover:underline flex items-center gap-1 disabled:opacity-50"
            >
              {resending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              <span>Resend OTP</span>
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || otp.join('').length < 6}
          className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying Code...</span>
            </>
          ) : (
            <>
              <span>{t('verifyBtn')}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

