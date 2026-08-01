import React from 'react';
import { useApp } from '../context/AppContext';
import { Bookmark, MapPin, Star, MessageSquare, PhoneCall, ChevronRight } from 'lucide-react';

export const SavedCaptains: React.FC = () => {
  const {
    vehicles,
    savedVehicleIds,
    toggleSaveCaptain,
    recordContact,
    setSelectedVehicle,
    navigateTo,
    t,
  } = useApp();

  const savedVehicles = vehicles.filter((v) => savedVehicleIds.includes(v.id));

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t('savedCaptains')}</h1>
          <p className="text-xs text-slate-500">Bookmarked drivers for quick booking</p>
        </div>
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          {savedVehicles.length} Saved
        </span>
      </div>

      {savedVehicles.length === 0 ? (
        <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl mx-auto flex items-center justify-center text-xl">
            🔖
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">No saved captains yet</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Tap the bookmark icon on any vehicle listing to save your favorite local drivers here.
          </p>
          <button
            onClick={() => navigateTo('user_dashboard')}
            className="px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Explore Drivers
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {savedVehicles.map((v) => (
            <div
              key={v.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition-all p-3.5 space-y-3"
            >
              <div className="flex items-start gap-3">
                <img
                  src={v.driverPhoto}
                  alt={v.driverName}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                      {v.category}
                    </span>
                    <button
                      onClick={() => toggleSaveCaptain(v.id)}
                      className="text-amber-500 p-1 hover:bg-amber-50 rounded-full"
                    >
                      <Bookmark className="w-4 h-4 fill-amber-500" />
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

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      {v.mohalla}, {v.city}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {v.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-600">
                  {v.vehicleNumber}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${v.whatsappNumber?.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => recordContact(v, 'whatsapp')}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-extrabold text-xs rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${v.phone}`}
                    onClick={() => recordContact(v, 'call')}
                    className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
