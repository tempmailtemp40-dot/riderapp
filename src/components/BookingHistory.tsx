import React from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, MessageSquare, Clock, MapPin, ChevronRight, Trash2 } from 'lucide-react';

export const BookingHistory: React.FC = () => {
  const { contactHistory, navigateTo, vehicles, setSelectedVehicle, recordContact, t } = useApp();

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t('contactHistory')}</h1>
          <p className="text-xs text-slate-500">Captains and drivers you previously contacted</p>
        </div>
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          {contactHistory.length} Contacts
        </span>
      </div>

      {contactHistory.length === 0 ? (
        <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl mx-auto flex items-center justify-center text-xl">
            📞
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">No contact history yet</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            When you call or WhatsApp a driver on MyTirri, your recent contacts will be saved here for easy access.
          </p>
          <button
            onClick={() => navigateTo('user_dashboard')}
            className="px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Find Nearby Transport
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {contactHistory.map((item) => {
            const vehicle = vehicles.find((v) => v.id === item.vehicleId);
            return (
              <div
                key={item.id}
                className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:shadow-xs transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        item.vehiclePhoto ||
                        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=300'
                      }
                      alt={item.driverName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                        {item.category}
                      </span>
                      <h4
                        onClick={() => {
                          if (vehicle) {
                            setSelectedVehicle(vehicle);
                            navigateTo('vehicle_details');
                          }
                        }}
                        className="font-extrabold text-slate-900 text-sm truncate hover:text-blue-700 cursor-pointer"
                      >
                        {item.driverName}
                      </h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {item.mohalla}, {item.city}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" /> {item.date}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                    {item.actionType === 'call' ? (
                      <PhoneCall className="w-3 h-3 text-blue-600" />
                    ) : (
                      <MessageSquare className="w-3 h-3 text-emerald-600" />
                    )}
                    Action: {item.actionType === 'call' ? 'Phone Call' : 'WhatsApp Message'}
                  </span>

                  <a
                    href={`tel:${item.phone}`}
                    onClick={() => {
                      if (vehicle) recordContact(vehicle, 'call');
                    }}
                    className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-xs"
                  >
                    <PhoneCall className="w-3 h-3" /> Call Again
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
