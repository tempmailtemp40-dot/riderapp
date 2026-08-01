import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

export const OtpPhone: React.FC = () => {
  const { phoneNumber, setPhoneNumber, navigateTo, t } = useApp();
  const [inputPhone, setInputPhone] = useState(phoneNumber || '9876543210');
  const [error, setError] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputPhone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setError('');
    setPhoneNumber(cleaned);
    navigateTo('otp_verify');
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2 mt-4">
        <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
          <Phone className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t('enterMobile')}</h1>
        <p className="text-xs text-slate-600 max-w-xs mx-auto">{t('enterMobileSub')}</p>
      </div>

      <form onSubmit={handleSendOtp} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {t('mobileNumber')}
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 font-bold text-slate-500 text-sm border-r border-slate-300 pr-2.5 flex items-center gap-1">
              🇮🇳 +91
            </span>
            <input
              type="tel"
              maxLength={10}
              value={inputPhone}
              onChange={(e) => {
                setInputPhone(e.target.value);
                if (error) setError('');
              }}
              placeholder="9876543210"
              className="w-full pl-24 pr-4 py-3.5 text-base font-bold text-slate-900 bg-white border-2 border-slate-200 rounded-2xl focus:border-blue-600 focus:outline-hidden transition-all shadow-xs"
            />
          </div>
          {error && <p className="text-xs font-semibold text-rose-600 mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
        >
          <span>{t('sendOtp')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-center gap-2 text-xs font-medium text-slate-600">
        <Lock className="w-3.5 h-3.5 text-slate-500" />
        <span>Your mobile number is kept private & strictly secure.</span>
      </div>
    </div>
  );
};
