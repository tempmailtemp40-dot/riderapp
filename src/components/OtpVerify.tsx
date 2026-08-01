import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';

export const OtpVerify: React.FC = () => {
  const { phoneNumber, role, navigateTo, t } = useApp();
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join('').length < 6) return;

    if (role === 'captain') {
      navigateTo('captain_type');
    } else {
      navigateTo('user_dashboard');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2 mt-4">
        <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t('verifyOtp')}</h1>
        <p className="text-xs text-slate-600 max-w-xs mx-auto">
          {t('verifyOtpSub')}{' '}
          <span className="font-bold text-slate-900">+91 {phoneNumber}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex items-center justify-between gap-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => { inputRefs.current[idx] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-12 h-14 text-center font-black text-xl text-slate-900 bg-white border-2 border-slate-200 focus:border-blue-600 rounded-xl shadow-xs focus:outline-hidden transition-all"
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-blue-700 font-semibold bg-blue-50 px-3 py-1.5 rounded-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Demo Auto-filled: 123456</span>
          </div>

          {timer > 0 ? (
            <span className="text-slate-500 font-medium">Resend in {timer}s</span>
          ) : (
            <button
              type="button"
              onClick={() => setTimer(30)}
              className="text-blue-700 font-bold hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Resend OTP
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
        >
          <span>{t('verifyBtn')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
