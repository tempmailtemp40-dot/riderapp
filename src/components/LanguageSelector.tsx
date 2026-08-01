import React from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { Check, ArrowRight, Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, navigateTo, t } = useApp();

  const options: { id: Language; label: string; subLabel: string; flag: string }[] = [
    { id: 'en', label: 'English', subLabel: 'Default Language', flag: '🇬🇧' },
    { id: 'hi', label: 'हिंदी (Hindi)', subLabel: 'मायटिर्री - हर सफर का साथी', flag: '🇮🇳' },
    { id: 'ur', label: 'اردو (Urdu)', subLabel: 'مائی ٹری - ہر سفر کا ساتھی', flag: '🇵🇰' },
  ];

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2 mt-4">
        <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
          <Globe className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t('selectLanguage')}</h1>
        <p className="text-sm text-slate-600 max-w-xs mx-auto">{t('selectLanguageSub')}</p>
      </div>

      <div className="space-y-3 pt-2">
        {options.map((opt) => {
          const isSelected = language === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => setLanguage(opt.id)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className="text-3xl">{opt.flag}</span>
                <div>
                  <p className="font-bold text-slate-900 text-base">{opt.label}</p>
                  <p className="text-xs text-slate-500 font-medium">{opt.subLabel}</p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                }`}
              >
                {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigateTo('choose_role')}
        className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
      >
        <span>{t('continueBtn')}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
