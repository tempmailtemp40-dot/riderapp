import React from 'react';
import { useApp } from '../context/AppContext';
import { CaptainType } from '../types';
import { User, Building2, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const CaptainTypeSelection: React.FC = () => {
  const { newVehicleDraft, setNewVehicleDraft, navigateTo, t } = useApp();

  const handleSelect = (type: CaptainType) => {
    setNewVehicleDraft((prev) => ({ ...prev, captainType: type }));
    navigateTo('add_vehicle_part1');
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2 mt-4">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t('captainTypeTitle')}</h1>
        <p className="text-xs text-slate-600 max-w-xs mx-auto">{t('captainTypeSub')}</p>
      </div>

      <div className="space-y-4">
        {/* Individual Driver */}
        <div
          onClick={() => handleSelect('individual')}
          className="group p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-600 bg-white hover:shadow-lg transition-all cursor-pointer relative"
        >
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-blue-100 text-blue-700 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                {t('individualCaptain')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t('individualDesc')}</p>
              <p className="text-[11px] font-semibold text-emerald-700 pt-1">
                ✓ Free Founder Captain Badge
              </p>
            </div>
          </div>
        </div>

        {/* Agency Captain */}
        <div
          onClick={() => handleSelect('agency')}
          className="group p-5 rounded-2xl border-2 border-slate-200 hover:border-indigo-600 bg-white hover:shadow-lg transition-all cursor-pointer relative"
        >
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-indigo-100 text-indigo-700 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-700 transition-colors">
                {t('agencyCaptain')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t('agencyDesc')}</p>
              <p className="text-[11px] font-semibold text-indigo-700 pt-1">
                ✓ Manage multiple vehicles under one business profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
