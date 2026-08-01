import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Search, Bookmark, History, User, PlusCircle } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo, role, savedVehicleIds } = useApp();

  const isAuthFlow = [
    'language_selection',
    'choose_role',
    'otp_phone',
    'otp_verify',
    'captain_type',
    'add_vehicle_part1',
    'add_vehicle_part2',
    'registration_success',
  ].includes(currentScreen);

  if (isAuthFlow) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {/* Home / Dashboard */}
        <button
          onClick={() => navigateTo(role === 'captain' ? 'captain_dashboard' : 'user_dashboard')}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-all ${
            ['user_dashboard', 'captain_dashboard'].includes(currentScreen)
              ? 'text-blue-700 font-bold bg-blue-50/80 scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* Search */}
        <button
          onClick={() => navigateTo('search_transport')}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-all ${
            ['search_transport', 'vehicle_listing'].includes(currentScreen)
              ? 'text-blue-700 font-bold bg-blue-50/80 scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Search</span>
        </button>

        {/* Add Vehicle for Captain OR Saved Captains for User */}
        {role === 'captain' ? (
          <button
            onClick={() => navigateTo('add_vehicle_part1')}
            className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-all ${
              ['add_vehicle_part1', 'add_vehicle_part2'].includes(currentScreen)
                ? 'text-blue-700 font-bold bg-blue-50/80 scale-105'
                : 'text-emerald-600 font-semibold hover:text-emerald-800'
            }`}
          >
            <PlusCircle className="w-5 h-5 mb-0.5 text-emerald-600" />
            <span className="text-[10px]">Add Vehicle</span>
          </button>
        ) : (
          <button
            onClick={() => navigateTo('saved_captains')}
            className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-all relative ${
              currentScreen === 'saved_captains'
                ? 'text-blue-700 font-bold bg-blue-50/80 scale-105'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Saved</span>
            {savedVehicleIds.length > 0 && (
              <span className="absolute top-1 right-3.5 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {savedVehicleIds.length}
              </span>
            )}
          </button>
        )}

        {/* Contact History */}
        <button
          onClick={() => navigateTo('booking_history')}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-all ${
            currentScreen === 'booking_history'
              ? 'text-blue-700 font-bold bg-blue-50/80 scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">History</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => navigateTo('user_profile')}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-all ${
            currentScreen === 'user_profile'
              ? 'text-blue-700 font-bold bg-blue-50/80 scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </div>
  );
};
