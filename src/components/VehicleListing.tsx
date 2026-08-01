import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Star,
  Bookmark,
  MessageSquare,
  PhoneCall,
  SlidersHorizontal,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';

export const VehicleListing: React.FC = () => {
  const {
    vehicles,
    searchFilters,
    savedVehicleIds,
    toggleSaveCaptain,
    recordContact,
    setSelectedVehicle,
    navigateTo,
    t,
  } = useApp();

  const filteredVehicles = vehicles.filter((v) => {
    if (searchFilters.city && v.city.toLowerCase() !== searchFilters.city.toLowerCase()) {
      return false;
    }
    if (
      searchFilters.mohalla &&
      v.mohalla.toLowerCase() !== searchFilters.mohalla.toLowerCase()
    ) {
      return false;
    }
    if (searchFilters.category !== 'All' && v.category !== searchFilters.category) {
      return false;
    }
    if (
      searchFilters.paymentMethod !== 'All' &&
      !v.acceptedPayments.includes(searchFilters.paymentMethod)
    ) {
      return false;
    }
    if (searchFilters.isVerifiedOnly && !v.isVerified) {
      return false;
    }
    if (searchFilters.searchQuery) {
      const q = searchFilters.searchQuery.toLowerCase();
      const matchName = v.driverName.toLowerCase().includes(q);
      const matchCity = v.city.toLowerCase().includes(q);
      const matchMohalla = v.mohalla.toLowerCase().includes(q);
      const matchCat = v.category.toLowerCase().includes(q);
      const matchNum = v.vehicleNumber.toLowerCase().includes(q);
      if (!matchName && !matchCity && !matchMohalla && !matchCat && !matchNum) return false;
    }
    return true;
  });

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 pb-24">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('user_dashboard')}
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              {searchFilters.category === 'All' ? 'All Vehicles' : searchFilters.category}
            </h1>
            <p className="text-xs text-slate-500">
              {filteredVehicles.length} listings found{' '}
              {searchFilters.city ? `in ${searchFilters.city}` : ''}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('search_transport')}
          className="p-2.5 bg-white border border-slate-200 text-slate-700 hover:border-blue-500 rounded-xl transition-colors shadow-2xs"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Active Filter Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {searchFilters.city && (
          <span className="text-[11px] font-bold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg shrink-0">
            📍 {searchFilters.city}
          </span>
        )}
        {searchFilters.mohalla && (
          <span className="text-[11px] font-bold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg shrink-0">
            🏡 {searchFilters.mohalla}
          </span>
        )}
        {searchFilters.category !== 'All' && (
          <span className="text-[11px] font-bold px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg shrink-0">
            🚙 {searchFilters.category}
          </span>
        )}
      </div>

      {/* Vehicles List */}
      {filteredVehicles.length === 0 ? (
        <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="font-extrabold text-slate-900 text-base">No transport found</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Try clearing some filters or searching for another city/mohalla nearby.
          </p>
          <button
            onClick={() => navigateTo('search_transport')}
            className="px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Adjust Search Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVehicles.map((v) => {
            const isSaved = savedVehicleIds.includes(v.id);
            return (
              <div
                key={v.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all p-3.5 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={v.driverPhoto}
                      alt={v.driverName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    {v.isFounderCaptain && (
                      <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full shadow-xs text-[10px]">
                        👑
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
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
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
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

                {/* Description snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {v.description}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
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
                      <span>WhatsApp</span>
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
      )}
    </div>
  );
};
