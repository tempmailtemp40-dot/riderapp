import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Globe, User, ShieldCheck, ArrowLeft, Bus, PhoneCall, Sparkles } from 'lucide-react';
import { Language } from '../types';

export const Header: React.FC = () => {
  const { language, setLanguage, role, currentScreen, navigateTo, t } = useApp();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const isAuthScreen = [
    'language_selection',
    'choose_role',
    'otp_phone',
    'otp_verify',
    'captain_type',
    'add_vehicle_part1',
    'add_vehicle_part2',
    'registration_success',
  ].includes(currentScreen);

  const getBackDestination = () => {
    switch (currentScreen) {
      case 'otp_phone':
        return 'choose_role';
      case 'otp_verify':
        return 'otp_phone';
      case 'captain_type':
        return 'otp_verify';
      case 'add_vehicle_part1':
        return 'captain_type';
      case 'add_vehicle_part2':
        return 'add_vehicle_part1';
      case 'vehicle_listing':
        return 'user_dashboard';
      case 'vehicle_details':
        return 'vehicle_listing';
      case 'search_transport':
        return 'user_dashboard';
      default:
        return role === 'captain' ? 'captain_dashboard' : 'user_dashboard';
    }
  };

  const showBackButton = !['language_selection', 'choose_role', 'user_dashboard', 'captain_dashboard'].includes(currentScreen);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button
              onClick={() => navigateTo(getBackDestination())}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div
            onClick={() => {
              if (role === 'captain') navigateTo('captain_dashboard');
              else if (role === 'user') navigateTo('user_dashboard');
              else navigateTo('language_selection');
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">MyTirri</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200/60 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  0% Commission
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{t('tagline')}</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/80"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span className="uppercase">{language}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 flex items-center justify-between ${
                    language === 'en' ? 'text-blue-700 font-bold bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  English <span>🇬🇧</span>
                </button>
                <button
                  onClick={() => {
                    setLanguage('hi');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 flex items-center justify-between ${
                    language === 'hi' ? 'text-blue-700 font-bold bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  हिंदी (Hindi) <span>🇮🇳</span>
                </button>
                <button
                  onClick={() => {
                    setLanguage('ur');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 flex items-center justify-between ${
                    language === 'ur' ? 'text-blue-700 font-bold bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  اردو (Urdu) <span>🇵🇰</span>
                </button>
              </div>
            )}
          </div>

          {!isAuthScreen && (
            <button
              onClick={() => navigateTo('user_profile')}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors relative"
            >
              <User className="w-5 h-5" />
              {role === 'captain' && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
