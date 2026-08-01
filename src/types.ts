export type Language = 'en' | 'hi' | 'ur';

export type UserRole = 'captain' | 'user' | null;

export type CaptainType = 'individual' | 'agency';

export type VehicleCategory =
  | 'Cab'
  | 'E-Rickshaw'
  | 'Bike'
  | 'Reda'
  | 'Bike Reda'
  | 'Chhota Hathi / ACE'
  | 'Tata 407/408'
  | 'Bus'
  | 'Tractor Trolley'
  | 'Heavy Vehicle';

export type PaymentMethod = 'Cash' | 'UPI' | 'Card';

export type BadgeType = 'Founder Captain' | 'Verified Captain' | 'Top Rated Captain';

export interface Vehicle {
  id: string;
  driverName: string;
  driverPhoto: string;
  vehiclePhoto: string;
  phone: string;
  whatsappNumber?: string;
  city: string;
  mohalla: string;
  category: VehicleCategory;
  vehicleNumber: string;
  captainType: CaptainType;
  agencyName?: string;
  acceptedPayments: PaymentMethod[];
  description: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isFounderCaptain: boolean;
  priceRate: string;
  availableStatus: 'Available Now' | 'On Trip' | 'Scheduled Only';
  totalViews: number;
  searchAppearances: number;
  phoneClicks: number;
  registeredDate: string;
}

export interface ContactHistoryItem {
  id: string;
  vehicleId: string;
  driverName: string;
  category: VehicleCategory;
  city: string;
  mohalla: string;
  date: string;
  phone: string;
  actionType: 'call' | 'whatsapp';
  vehiclePhoto: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  city: string;
}

export interface SearchFilters {
  category: VehicleCategory | 'All';
  city: string;
  mohalla: string;
  paymentMethod: PaymentMethod | 'All';
  isVerifiedOnly: boolean;
  searchQuery: string;
  minRating: number;
}

export type Screen =
  | 'language_selection'
  | 'choose_role'
  | 'otp_phone'
  | 'otp_verify'
  | 'captain_type'
  | 'add_vehicle_part1'
  | 'add_vehicle_part2'
  | 'registration_success'
  | 'captain_dashboard'
  | 'user_dashboard'
  | 'search_transport'
  | 'vehicle_listing'
  | 'vehicle_details'
  | 'booking_history'
  | 'saved_captains'
  | 'user_profile';
