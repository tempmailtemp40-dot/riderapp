import React from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Phone,
  Globe,
  RefreshCw,
  Bookmark,
  History,
  PlusCircle,
  ShieldCheck,
  Info,
  Sparkles,
  Award,
  ChevronRight,
  LogOut,
} from 'lucide-react';

export const UserProfile: React.FC = () => {
  const {
    phoneNumber,
    role,
    setRole,
    language,
    setLanguage,
    navigateTo,
    savedVehicleIds,
    contactHistory,
    t,
  } = useApp();

  const toggleRole = () => {
    if (role === 'captain') {
      setRole('user');
      navigateTo('user_dashboard');
    } else {
      setRole('captain');
      navigateTo('captain_dashboard');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-5 pb-24">
      {/* Header Profile Card */}
      <div className="p-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-2xl flex items-center justify-center border-2 border-white/20 shadow-md">
            {role === 'captain' ? '👑' : '👤'}
          </div>
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg">
                {role === 'captain' ? 'Captain Profile' : 'Passenger Account'}
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 bg-blue-500/30 text-blue-200 rounded-full border border-blue-400/30 uppercase">
                {role}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono font-semibold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-400" /> +91 {phoneNumber || '9876543210'}
            </p>
          </div>
        </div>

        {/* Role Switcher Action */}
        <button
          onClick={toggleRole}
          className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs rounded-xl flex items-center justify-between transition-colors shadow-2xs"
        >
          <span className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-blue-400" />
            <span>Switch to {role === 'captain' ? 'Passenger Mode' : 'Captain Mode'}</span>
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Language Preferences */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">App Preferences</h3>
        
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">App Language</p>
              <p className="text-[11px] text-slate-500 uppercase">Current: {language}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                language === 'en' ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                language === 'hi' ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              HI
            </button>
            <button
              onClick={() => setLanguage('ur')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                language === 'ur' ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              UR
            </button>
          </div>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shortcuts</h3>

        <div
          onClick={() => navigateTo('saved_captains')}
          className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-800">Saved Captains</span>
          </div>
          <span className="text-xs font-bold text-slate-500">{savedVehicleIds.length}</span>
        </div>

        <div
          onClick={() => navigateTo('booking_history')}
          className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <History className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-800">Contact History</span>
          </div>
          <span className="text-xs font-bold text-slate-500">{contactHistory.length}</span>
        </div>

        {role === 'captain' && (
          <div
            onClick={() => navigateTo('add_vehicle_part1')}
            className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800">Add New Vehicle</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        )}
      </div>

      {/* About MyTirri */}
      <div className="p-4 bg-slate-100 rounded-2xl space-y-2 text-xs text-slate-600">
        <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
          <Info className="w-4 h-4 text-blue-600" />
          <span>About MyTirri</span>
        </div>
        <p className="leading-relaxed">
          MyTirri – Har Safar Ka Saathi is a local transport discovery platform connecting passengers directly with nearby vehicle owners across Tier-2 & Tier-3 towns with 0% commission.
        </p>
        <p className="font-semibold text-slate-500 text-[11px] pt-1">Version: MVP v1.0 • Built for India</p>
      </div>

      <button
        onClick={() => navigateTo('language_selection')}
        className="w-full py-3 bg-white border border-rose-200 text-rose-600 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-rose-50 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Reset / Log Out</span>
      </button>
    </div>
  );
};
