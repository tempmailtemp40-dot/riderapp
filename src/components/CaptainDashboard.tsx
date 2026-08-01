import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Eye,
  Search,
  PhoneCall,
  PlusCircle,
  Award,
  Sparkles,
  MapPin,
  Edit,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export const CaptainDashboard: React.FC = () => {
  const { vehicles, navigateTo, setSelectedVehicle, t } = useApp();

  // Aggregate stats across captain's vehicles
  const totalViews = vehicles.reduce((acc, v) => acc + v.totalViews, 0);
  const totalSearch = vehicles.reduce((acc, v) => acc + v.searchAppearances, 0);
  const totalClicks = vehicles.reduce((acc, v) => acc + v.phoneClicks, 0);

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-24">
      {/* Header Banner */}
      <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl shadow-xl relative overflow-hidden space-y-3">
        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />

        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-amber-950 uppercase tracking-wider mb-1">
              <Award className="w-3 h-3" /> Founder Captain
            </span>
            <h1 className="text-xl font-black tracking-tight">{t('captainDashTitle')}</h1>
            <p className="text-xs text-blue-200">Zero commission • 100% direct customer calls</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 font-bold border border-white/20">
            👑
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigateTo('add_vehicle_part1')}
          className="w-full py-2.5 bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-blue-700" />
          <span>{t('addMoreVehicle')}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Performance Analytics</h3>
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-1 text-center">
            <div className="w-8 h-8 mx-auto bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <p className="text-lg font-black text-slate-900">{totalViews}</p>
            <p className="text-[10px] font-semibold text-slate-500">{t('totalViews')}</p>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-1 text-center">
            <div className="w-8 h-8 mx-auto bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <p className="text-lg font-black text-slate-900">{totalSearch}</p>
            <p className="text-[10px] font-semibold text-slate-500">Searches</p>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-1 text-center">
            <div className="w-8 h-8 mx-auto bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <p className="text-lg font-black text-slate-900">{totalClicks}</p>
            <p className="text-[10px] font-semibold text-slate-500">{t('phoneClicks')}</p>
          </div>
        </div>
      </div>

      {/* Registered Vehicles List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('yourVehicles')}</h3>
          <span className="text-xs font-bold text-blue-700">{vehicles.length} Active</span>
        </div>

        <div className="space-y-3">
          {vehicles.map((v) => (
            <div
              key={v.id}
              onClick={() => {
                setSelectedVehicle(v);
                navigateTo('vehicle_details');
              }}
              className="p-3.5 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 shadow-2xs transition-all cursor-pointer flex items-center gap-3 group"
            >
              <img
                src={v.vehiclePhoto}
                alt={v.vehicleNumber}
                className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                    {v.category}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                    {v.availableStatus}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm truncate">{v.driverName}</h4>
                <p className="text-xs font-mono font-bold text-slate-600">{v.vehicleNumber}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{v.mohalla}, {v.city}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
