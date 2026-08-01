import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { SteeringWheel, Users, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const RoleSelector: React.FC = () => {
  const { setRole, navigateTo, t } = useApp();

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    navigateTo('otp_phone');
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2 mt-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Step 2 of 4
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t('chooseRoleTitle')}</h1>
        <p className="text-xs text-slate-600 max-w-xs mx-auto">{t('chooseRoleSub')}</p>
      </div>

      <div className="space-y-4">
        {/* Become a Captain Option */}
        <div
          onClick={() => handleSelectRole('captain')}
          className="group p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-600 bg-gradient-to-br from-white to-blue-50/30 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-md group-hover:scale-110 transition-transform shrink-0">
              <span className="text-2xl">🚗</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">
                  {t('becomeCaptain')}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                  FREE Registration
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{t('becomeCaptainDesc')}</p>
              
              <div className="pt-2 flex items-center gap-3 text-[11px] font-semibold text-blue-800">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> 0% Commission
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Founder Badge
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue as User Option */}
        <div
          onClick={() => handleSelectRole('user')}
          className="group p-5 rounded-2xl border-2 border-slate-200 hover:border-indigo-600 bg-white hover:shadow-lg transition-all cursor-pointer relative"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-md group-hover:scale-110 transition-transform shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-indigo-700 transition-colors">
                {t('continueUser')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t('continueUserDesc')}</p>
              <p className="text-[11px] font-semibold text-indigo-700 pt-1">
                Direct Driver Call & WhatsApp • No Middleman Fees
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center gap-2.5 text-xs text-amber-900">
        <span className="text-lg shrink-0">💡</span>
        <p className="leading-snug">
          You can switch between Passenger and Captain mode anytime from your Profile menu.
        </p>
      </div>
    </div>
  );
};
