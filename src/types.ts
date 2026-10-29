export type CircuitType = 'all' | 'gokarna' | 'talakadu' | 'combined';

export type TravelPace = 'adventure' | 'relaxation' | 'heritage';

export type TravelGroup = 'solo' | 'couples' | 'family' | 'group';

export interface LocationDetail {
  id: string;
  name: string;
  kannadaName: string;
  circuit: 'gokarna' | 'talakadu';
  tagline: string;
  description: string;
  coordinates: { x: number; y: number; lat: number; lng: number }; // SVG map normalized coords & real geo
  bestTime: string;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  idealDuration: string;
  highlights: string[];
  insiderTip: string;
  category: 'beach' | 'cliff' | 'temple' | 'nature' | 'heritage' | 'river';
  imageUrl: string;
}

export interface DayItinerarySlot {
  timeSlot: 'Morning (06:00 - 10:00)' | 'Midday & Afternoon (11:00 - 15:30)' | 'Golden Hour & Sunset (16:00 - 18:45)' | 'Evening Starlight (19:30 - 22:00)';
  title: string;
  locationName: string;
  activity: string;
  insiderTip: string;
  transportInfo: string;
  estCostInr: number;
  highlightTag: string;
  circuit: 'gokarna' | 'talakadu';
}

export interface DayPlan {
  dayNumber: number;
  dateStr?: string;
  themeTitle: string;
  summary: string;
  circuit: 'gokarna' | 'talakadu';
  slots: DayItinerarySlot[];
  dayBudgetEstimateInr: number;
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  circuit: CircuitType;
  durationDays: number;
  pace: TravelPace;
  group: TravelGroup;
  originCity: string;
  arrivalSlot: string;
  days: DayPlan[];
  totalEstBudgetInr: number;
  packingKeyNotes: string[];
  recommendedSeason: string;
  createdAt: string;
}

export interface HotelRecommendation {
  id: string;
  name: string;
  circuit: 'gokarna' | 'talakadu';
  tier: 'budget' | 'comfort' | 'luxury';
  avgPricePerNight: number;
  rating: number;
  reviewCount: number;
  locationLabel: string;
  distanceToHighlights: string;
  description: string;
  amenities: string[];
  imageUrl: string;
  badge?: string;
}

export interface BudgetInput {
  travelers: number;
  nights: number;
  transportPerPerson: number;
  stayPerNightPerPerson: number;
  foodPerDayPerPerson: number;
  activitiesPerPerson: number;
}

export interface BudgetBreakdown {
  perPersonTotal: number;
  grandTotal: number;
  transportTotal: number;
  stayTotal: number;
  foodTotal: number;
  activitiesTotal: number;
  percentages: {
    transport: number;
    stay: number;
    food: number;
    activities: number;
  };
  recommendedTier: 'budget' | 'comfort' | 'luxury';
}

export interface KannadaPhrase {
  id: string;
  kannada: string;
  transliteration: string;
  meaning: string;
  situation: string;
  phoneticAudioText: string;
  category: 'greetings' | 'bargaining' | 'transit' | 'food' | 'emergency';
}

export interface PackingItem {
  id: string;
  label: string;
  category: 'Trekking & Cliffs' | 'Modest Temple Attire' | 'Sun & Coastal Gear' | 'River & Dune Protection' | 'Cash, UPI & Essentials' | 'Eco & Leave No Trace';
  targetCircuit: 'all' | 'gokarna' | 'talakadu';
  checked: boolean;
  essential: boolean;
}

export interface UserSession {
  isLoggedIn: boolean;
  user: {
    id: string;
    displayName: string;
    email: string;
    avatarUrl: string;
    membershipTier: 'Explorer' | 'Heritage Patron' | 'Cliff Nomad';
    memberSince: string;
  } | null;
  savedItineraries: GeneratedItinerary[];
  wishlistHotels: string[];
  customPackingItems: PackingItem[];
}
