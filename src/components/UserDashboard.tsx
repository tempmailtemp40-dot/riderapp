import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_CONFIG, CITIES_AND_MOHALLAS } from '../data/mockData';
import { VehicleCategory, Vehicle } from '../types';
import {
  Search,
  MapPin,
  PhoneCall,
  MessageSquare,
  Star,
  Bookmark,
  ShieldCheck,
  CheckCircle,
  Award,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    vehicles,
    navigateTo,
    setSelectedVehicle,
    savedVehicleIds,
    toggleSaveCaptain,
    recordContact,
    searchFilters,
    setSearchFilters,
    t,
  } = useApp();

  const [selectedCity, setSelectedCity] = useState<string>('Lucknow');

  const filteredVehicles = vehicles.filter((v) => {
    if (selectedCity && v.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (searchFilters.category !== 'All' && v.category !== searchFilters.category) {
      return false;
    }
    return true;
  });

  const handleCategorySelect = (catName: VehicleCategory) => {
    setSearchFilters((prev) => ({ ...prev, category: catName, city: selectedCity }));
    navigateTo('vehicle_listing');
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-24">
      {/* Search Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t('userDashTitle')}</h1>
            <p className="text-xs text-slate-500">{t('userDashSub')}</p>
          </div>
          <button
            onClick={() => navigateTo('search_transport')}
            className="p-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar Input */}
        <div
          onClick={() => navigateTo('search_transport')}
          className="relative flex items-center bg-white border border-slate-300 rounded-2xl p-3 shadow-xs cursor-pointer hover:border-blue-500 transition-colors"
        >
          <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
          <span className="text-sm font-medium text-slate-400 truncate">
            {t('searchPlaceholder')}
          </span>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {Object.keys(CITIES_AND_MOHALLAS).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                selectedCity === city
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>{city}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle Categories</h3>
          <button
            onClick={() => {
              setSearchFilters((prev) => ({ ...prev, category: 'All' }));
              navigateTo('vehicle_listing');
            }}
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-0.5"
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CATEGORIES_CONFIG.slice(0, 6).map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name)}
              className="p-3 bg-white border border-slate-200 hover:border-blue-500 rounded-2xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform shrink-0">
                {cat.icon}
              </span>
              <div className="min-w-0">
                <h4 className="font-extrabold text-slate-900 text-xs truncate group-hover:text-blue-700 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-[10px] text-slate-500 truncate">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zero Commission Trust Banner */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl shadow-md flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200">
            Direct Local Connection
          </span>
          <p className="text-xs font-bold">Call Drivers Directly • 0% Middleman Fee</p>
        </div>
        <Sparkles className="w-6 h-6 text-emerald-200 shrink-0" />
      </div>

      {/* Nearby Captains / Listings */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Captains in {selectedCity} ({filteredVehicles.length})
          </h3>
        </div>

        <div className="space-y-3">
          {filteredVehicles.map((v) => {
            const isSaved = savedVehicleIds.includes(v.id);
            return (
              <div
                key={v.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all space-y-3 p-3.5"
              >
                {/* Header: Driver Photo, Info, Save Button */}
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={v.driverPhoto}
                      alt={v.driverName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    {v.isFounderCaptain && (
                      <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full shadow-xs text-[10px]" title="Founder Captain">
                        👑
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                        {v.category}
                      </span>
                      <button
                        onClick={() => toggleSaveCaptain(v.id)}
                        className={`p-1.5 rounded-full transition-colors ${
                          isSaved ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    <h4
                      onClick={() => {
                        setSelectedVehicle(v);
                        navigateTo('vehicle_details');
                      }}
                      className="font-extrabold text-slate-900 text-base truncate hover:text-blue-700 cursor-pointer"
                    >
                      {v.driverName}
                    </h4>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 flex-wrap">
                      <span className="flex items-center gap-1 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        {v.mohalla}, {v.city}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {v.rating} ({v.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Photo Banner & Details */}
                <div
                  onClick={() => {
                    setSelectedVehicle(v);
                    navigateTo('vehicle_details');
                  }}
                  className="relative rounded-xl overflow-hidden cursor-pointer group"
                >
                  <img
                    src={v.vehiclePhoto}
                    alt={v.vehicleNumber}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-slate-900/80 text-white backdrop-blur-md rounded-lg">
                      {v.vehicleNumber}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 bg-emerald-600 text-white backdrop-blur-md rounded-lg">
                      {v.priceRate}
                    </span>
                  </div>
                </div>

                {/* Accepted Payments & Actions */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 gap-2">
                  <div className="flex items-center gap-1">
                    {v.acceptedPayments.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded-md"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${v.whatsappNumber?.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => recordContact(v, 'whatsapp')}
                      className="px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-extrabold text-xs rounded-xl flex items-center gap-1 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('whatsapp')}</span>
                    </a>

                    <a
                      href={`tel:${v.phone}`}
                      onClick={() => recordContact(v, 'call')}
                      className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{t('callNow')}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
