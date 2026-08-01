import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LanguageSelector } from './components/LanguageSelector';
import { RoleSelector } from './components/RoleSelector';
import { OtpPhone } from './components/OtpPhone';
import { OtpVerify } from './components/OtpVerify';
import { CaptainTypeSelection } from './components/CaptainTypeSelection';
import { AddVehicleFormPart1 } from './components/AddVehicleFormPart1';
import { AddVehicleFormPart2 } from './components/AddVehicleFormPart2';
import { RegistrationSuccess } from './components/RegistrationSuccess';
import { CaptainDashboard } from './components/CaptainDashboard';
import { UserDashboard } from './components/UserDashboard';
import { SearchTransport } from './components/SearchTransport';
import { VehicleListing } from './components/VehicleListing';
import { VehicleDetails } from './components/VehicleDetails';
import { BookingHistory } from './components/BookingHistory';
import { SavedCaptains } from './components/SavedCaptains';
import { UserProfile } from './components/UserProfile';

const MainContent: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'language_selection':
        return <LanguageSelector />;
      case 'choose_role':
        return <RoleSelector />;
      case 'otp_phone':
        return <OtpPhone />;
      case 'otp_verify':
        return <OtpVerify />;
      case 'captain_type':
        return <CaptainTypeSelection />;
      case 'add_vehicle_part1':
        return <AddVehicleFormPart1 />;
      case 'add_vehicle_part2':
        return <AddVehicleFormPart2 />;
      case 'registration_success':
        return <RegistrationSuccess />;
      case 'captain_dashboard':
        return <CaptainDashboard />;
      case 'user_dashboard':
        return <UserDashboard />;
      case 'search_transport':
        return <SearchTransport />;
      case 'vehicle_listing':
        return <VehicleListing />;
      case 'vehicle_details':
        return <VehicleDetails />;
      case 'booking_history':
        return <BookingHistory />;
      case 'saved_captains':
        return <SavedCaptains />;
      case 'user_profile':
        return <UserProfile />;
      default:
        return <LanguageSelector />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-md w-full mx-auto">{renderScreen()}</main>
      <BottomNav />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
