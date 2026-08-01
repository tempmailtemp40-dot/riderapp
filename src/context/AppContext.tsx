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
import { db } from '../lib/firebase';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  increment,
  query,
  orderBy,
} from 'firebase/firestore';

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
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [savedVehicleIds, setSavedVehicleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('mytirri_saved_captains');
    return saved ? JSON.parse(saved) : ['v-101', 'v-103'];
  });
  const [contactHistory, setContactHistory] = useState<ContactHistoryItem[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [newVehicleDraft, setNewVehicleDraft] = useState<Partial<Vehicle>>({
    captainType: 'individual',
    acceptedPayments: ['Cash', 'UPI'],
  });
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(DEFAULT_FILTERS);

  // Real-time Firestore sync for Vehicles
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'vehicles'), (snapshot) => {
      if (snapshot.empty) {
        // Seed initial data if database is fresh
        INITIAL_VEHICLES.forEach(async (v) => {
          try {
            await setDoc(doc(db, 'vehicles', v.id), v);
          } catch (e) {
            console.error('Error seeding vehicle:', e);
          }
        });
      } else {
        const firestoreVehicles: Vehicle[] = [];
        snapshot.forEach((docSnap) => {
          firestoreVehicles.push(docSnap.data() as Vehicle);
        });
        setVehicles(firestoreVehicles);
      }
    }, (error) => {
      console.error('Firestore vehicles listener error:', error);
    });

    return () => unsub();
  }, []);

  // Real-time Firestore sync for Contact History
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'contact_history'), (snapshot) => {
      const historyItems: ContactHistoryItem[] = [];
      snapshot.forEach((docSnap) => {
        historyItems.push({ id: docSnap.id, ...docSnap.data() } as ContactHistoryItem);
      });
      // Sort newest first by timestamp or id
      historyItems.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setContactHistory(historyItems);
    }, (error) => {
      console.error('Firestore contact history listener error:', error);
    });

    return () => unsub();
  }, []);

  // Save savedVehicleIds to localStorage
  useEffect(() => {
    localStorage.setItem('mytirri_saved_captains', JSON.stringify(savedVehicleIds));
  }, [savedVehicleIds]);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaveCaptain = (vehicleId: string) => {
    setSavedVehicleIds((prev) =>
      prev.includes(vehicleId) ? prev.filter((id) => id !== vehicleId) : [...prev, vehicleId]
    );
  };

  const recordContact = async (vehicle: Vehicle, actionType: 'call' | 'whatsapp') => {
    const timestamp = Date.now();
    const newItem: Omit<ContactHistoryItem, 'id'> & { timestamp: number } = {
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
      timestamp,
    };

    try {
      await addDoc(collection(db, 'contact_history'), newItem);
      await updateDoc(doc(db, 'vehicles', vehicle.id), {
        phoneClicks: increment(1),
      });
    } catch (e) {
      console.error('Error recording contact to Firestore:', e);
      // Fallback local update
      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicle.id ? { ...v, phoneClicks: v.phoneClicks + 1 } : v))
      );
      setContactHistory((prev) => [{ id: 'h-' + timestamp, ...newItem }, ...prev]);
    }
  };

  const addVehicle = async (v: Vehicle) => {
    try {
      await setDoc(doc(db, 'vehicles', v.id), v);
    } catch (e) {
      console.error('Error adding vehicle to Firestore:', e);
      setVehicles((prev) => [v, ...prev]);
    }
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

