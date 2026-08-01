import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCategory } from '../types';
import { CATEGORIES_CONFIG, CITIES_AND_MOHALLAS } from '../data/mockData';
import { Camera, MapPin, User, Truck, ArrowRight, ShieldCheck, Upload } from 'lucide-react';

export const AddVehicleFormPart1: React.FC = () => {
  const { newVehicleDraft, setNewVehicleDraft, phoneNumber, navigateTo, t } = useApp();

  const [driverName, setDriverName] = useState(newVehicleDraft.driverName || '');
  const [phone, setPhone] = useState(newVehicleDraft.phone || phoneNumber || '9876543210');
  const [city, setCity] = useState(newVehicleDraft.city || 'Lucknow');
  const [mohalla, setMohalla] = useState(newVehicleDraft.mohalla || 'Aminabad');
  const [category, setCategory] = useState<VehicleCategory>(newVehicleDraft.category || 'E-Rickshaw');
  const [vehicleNumber, setVehicleNumber] = useState(newVehicleDraft.vehicleNumber || 'UP 32 ER 8899');
  const [driverPhoto, setDriverPhoto] = useState(
    newVehicleDraft.driverPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  );
  const [vehiclePhoto, setVehiclePhoto] = useState(
    newVehicleDraft.vehiclePhoto || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
  );

  const availableMohallas = CITIES_AND_MOHALLAS[city] || ['Main Chowk', 'Station Road', 'Civil Lines', 'Market Area'];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setNewVehicleDraft((prev) => ({
      ...prev,
      driverName: driverName || 'Captain ' + (phone.slice(-4) || 'User'),
      phone,
      whatsappNumber: phone,
      city,
      mohalla,
      category,
      vehicleNumber,
      driverPhoto,
      vehiclePhoto,
    }));
    navigateTo('add_vehicle_part2');
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-20">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Step 1 of 2
          </span>
          <span className="text-xs font-semibold text-slate-500">Basic Info</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t('addVehicleTitle')}</h1>
        <p className="text-xs text-slate-600">Register your vehicle to get direct calls from local customers.</p>
      </div>

      <form onSubmit={handleNext} className="space-y-5">
        {/* Photo Uploads */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">{t('driverPhoto')}</label>
            <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-2 bg-white text-center cursor-pointer transition-colors group">
              <img
                src={driverPhoto}
                alt="Driver"
                className="w-full h-24 object-cover rounded-xl shadow-xs group-hover:opacity-90"
              />
              <button
                type="button"
                onClick={() =>
                  setDriverPhoto(
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
                  )
                }
                className="mt-1 text-[10px] font-bold text-blue-700 flex items-center justify-center gap-1 w-full"
              >
                <Camera className="w-3 h-3" /> Change Photo
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">{t('vehiclePhoto')}</label>
            <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-2 bg-white text-center cursor-pointer transition-colors group">
              <img
                src={vehiclePhoto}
                alt="Vehicle"
                className="w-full h-24 object-cover rounded-xl shadow-xs group-hover:opacity-90"
              />
              <button
                type="button"
                onClick={() =>
                  setVehiclePhoto(
                    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600'
                  )
                }
                className="mt-1 text-[10px] font-bold text-blue-700 flex items-center justify-center gap-1 w-full"
              >
                <Camera className="w-3 h-3" /> Change Photo
              </button>
            </div>
          </div>
        </div>

        {/* Driver Name */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">{t('driverName')} *</label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              required
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              placeholder="e.g. Mohd. Salim Khan"
              className="w-full pl-10 pr-4 py-3 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">{t('mobileNumber')} *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-hidden"
          />
        </div>

        {/* City & Mohalla */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">{t('city')} *</label>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                const mohallas = CITIES_AND_MOHALLAS[e.target.value] || [];
                if (mohallas.length > 0) setMohalla(mohallas[0]);
              }}
              className="w-full px-3 py-3 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-hidden"
            >
              {Object.keys(CITIES_AND_MOHALLAS).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">{t('mohalla')} *</label>
            <select
              value={mohalla}
              onChange={(e) => setMohalla(e.target.value)}
              className="w-full px-3 py-3 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-hidden"
            >
              {availableMohallas.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vehicle Category Picker */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">{t('vehicleCategory')} *</label>
          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {CATEGORIES_CONFIG.map((cat) => (
              <div
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-2.5 ${
                  category === cat.name
                    ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <div className="overflow-hidden">
                  <p className="text-xs truncate">{cat.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Number */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">{t('vehicleNumber')} *</label>
          <input
            type="text"
            required
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            placeholder="UP 32 ER 8899"
            className="w-full px-4 py-3 text-sm font-mono font-extrabold tracking-wider text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-hidden"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
        >
          <span>Continue to Part 2</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
