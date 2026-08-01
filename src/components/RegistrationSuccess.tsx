import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export const RegistrationSuccess: React.FC = () => {
  const { navigateTo, t } = useApp();

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 text-center pt-8">
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
        <div className="w-24 h-24 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/30">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t('regSuccessTitle')}</h1>
        <p className="text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">{t('regSuccessSub')}</p>
      </div>

      {/* Badge Card */}
      <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl shadow-md space-y-3 text-left">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-xs">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
              Special Award
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">Founder Captain Badge</h3>
          </div>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          Your listing is live on MyTirri! Passengers in your mohalla can now find you and call you directly with 0% commission.
        </p>
      </div>

      <button
        onClick={() => navigateTo('captain_dashboard')}
        className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
      >
        <span>{t('goToDashboard')}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
