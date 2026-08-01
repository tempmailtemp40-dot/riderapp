import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserRole,
  Screen,
  Vehicle,
  ContactHistoryItem,
  SearchFilters,
} from '../types';
import { INITIAL_VEHICLES, TRANSLATIONS } from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
  vehicles: Vehicle[];
  savedVehicleIds: string[];
  toggleSaveCaptain: (vehicleId: string) => void;
  contactHistory: ContactHistoryItem[];
  recordContact: (vehicle: Vehicle, actionType: 'call' | 'whatsapp') => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (v: Vehicle | null) => void;
  newVehicleDraft: Partial<Vehicle>;
  setNewVehicleDraft: React.Dispatch<React.SetStateAction<Partial<Vehicle>>>;
  addVehicle: (v: Vehicle) => void;
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetSearchFilters: () => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
}

const DEFAULT_FILTERS: SearchFilters = {
  category: 'All',
  city: '',
  mohalla: '',
  paymentMethod: 'All',
  isVerifiedOnly: false,
  searchQuery: '',
  minRating: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [role, setRole] = useState<UserRole>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [currentScreen, setCurrentScreen] = useState<Screen>('language_selection');
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('mytirri_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });
  const [savedVehicleIds, setSavedVehicleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('mytirri_saved_captains');
    return saved ? JSON.parse(saved) : ['v-101', 'v-103'];
  });
  const [contactHistory, setContactHistory] = useState<ContactHistoryItem[]>(() => {
    const saved = localStorage.getItem('mytirri_contact_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [newVehicleDraft, setNewVehicleDraft] = useState<Partial<Vehicle>>({
    captainType: 'individual',
    acceptedPayments: ['Cash', 'UPI'],
  });
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(DEFAULT_FILTERS);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mytirri_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('mytirri_saved_captains', JSON.stringify(savedVehicleIds));
  }, [savedVehicleIds]);

  useEffect(() => {
    localStorage.setItem('mytirri_contact_history', JSON.stringify(contactHistory));
  }, [contactHistory]);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaveCaptain = (vehicleId: string) => {
    setSavedVehicleIds((prev) =>
      prev.includes(vehicleId) ? prev.filter((id) => id !== vehicleId) : [...prev, vehicleId]
    );
  };

  const recordContact = (vehicle: Vehicle, actionType: 'call' | 'whatsapp') => {
    // Increment phone clicks on vehicle
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicle.id ? { ...v, phoneClicks: v.phoneClicks + 1 } : v
      )
    );

    const newItem: ContactHistoryItem = {
      id: 'h-' + Date.now(),
      vehicleId: vehicle.id,
      driverName: vehicle.driverName,
      category: vehicle.category,
      city: vehicle.city,
      mohalla: vehicle.mohalla,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      phone: vehicle.phone,
      actionType,
      vehiclePhoto: vehicle.vehiclePhoto,
    };

    setContactHistory((prev) => [newItem, ...prev]);
  };

  const addVehicle = (v: Vehicle) => {
    setVehicles((prev) => [v, ...prev]);
  };

  const resetSearchFilters = () => {
    setSearchFilters(DEFAULT_FILTERS);
  };

  const t = (key: keyof typeof TRANSLATIONS['en']): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    return langDict[key] || TRANSLATIONS['en'][key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        role,
        setRole,
        phoneNumber,
        setPhoneNumber,
        currentScreen,
        navigateTo,
        vehicles,
        savedVehicleIds,
        toggleSaveCaptain,
        contactHistory,
        recordContact,
        selectedVehicle,
        setSelectedVehicle,
        newVehicleDraft,
        setNewVehicleDraft,
        addVehicle,
        searchFilters,
        setSearchFilters,
        resetSearchFilters,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
