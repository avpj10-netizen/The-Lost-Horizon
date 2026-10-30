import React, { useState } from 'react';
import { calculateTripBudget, formatINR } from '../utils/budgetCalculator';
import { HOTELS_DATA } from '../data/hotels';
import { BudgetInput, HotelRecommendation, CircuitType } from '../types';
import { DollarSign, Home, Car, Utensils, Compass, Bookmark, Star, Check, ExternalLink, Printer, Zap } from 'lucide-react';

interface BudgetEstimatorProps {
  currentCircuit: CircuitType;
  wishlistHotels: string[];
  onToggleWishlistHotel: (hotelId: string) => void;
  onOpenMapsIntel?: (location: string) => void;
}

export const BudgetEstimator: React.FC<BudgetEstimatorProps> = ({
  currentCircuit,
  wishlistHotels,
  onToggleWishlistHotel,
  onOpenMapsIntel,
}) => {
  // Slider states
  const [travelers, setTravelers] = useState<number>(2);
  const [nights, setNights] = useState<number>(3);
  const [transportPerPerson, setTransportPerPerson] = useState<number>(2500);
  const [stayPerNightPerPerson, setStayPerNightPerPerson] = useState<number>(3500);
  const [foodPerDayPerPerson, setFoodPerDayPerPerson] = useState<number>(1000);
  const [activitiesPerPerson, setActivitiesPerPerson] = useState<number>(1500);

  // Hotel destination filter
  const [hotelCircuitFilter, setHotelCircuitFilter] = useState<'all' | 'gokarna' | 'talakadu'>(
    currentCircuit === 'gokarna' ? 'gokarna' : currentCircuit === 'talakadu' ? 'talakadu' : 'all'
  );

  const budget = calculateTripBudget({
    travelers,
    nights,
    transportPerPerson,
    stayPerNightPerPerson,
    foodPerDayPerPerson,
    activitiesPerPerson,
  });

  const filteredHotels = HOTELS_DATA.filter((h) => {
    if (hotelCircuitFilter !== 'all' && h.circuit !== hotelCircuitFilter) return false;
    return true;
  });

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-widest bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-400/30">
              Financial Architect
            </span>
            <span className="text-slate-500 dark:text-zinc-400 text-xs font-mono">• Real-Time Expense Calibration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 dark:text-white mt-2 tracking-tight">
            Budget Engine & Hotel Suggester
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 max-w-2xl mt-1">
            Calibrate transport, beach huts, Kaveri river resorts, and coastal feasts with instant per-person and group totals.
          </p>
        </div>

        <button
          onClick={handlePrintSummary}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 border border-white/15 shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Financial Sheet</span>
        </button>
      </div>

      {/* Main Calculator Grid: Sliders on left, Subtotals on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Dynamic Glass Sliders Column */}
        <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-gradient-to-b from-[#0a1a36]/85 to-[#040d1e]/90 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-300 font-semibold">
              Expense Parameters
            </span>
            <span className="text-xs font-mono text-zinc-300">
              {travelers} {travelers === 1 ? 'Traveler' : 'Travelers'} • {nights} Nights ({nights + 1} Days)
            </span>
          </div>

          {/* Quick Travelers & Nights Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-zinc-300">
                <span>Party Size</span>
                <span className="font-bold text-cyan-300 font-mono">{travelers} People</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-black/60 rounded-lg cursor-pointer"
                aria-label="Number of Travelers"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>Solo (1)</span>
                <span>Duo (2)</span>
                <span>Family (4)</span>
                <span>Group (12)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-zinc-300">
                <span>Nights Duration</span>
                <span className="font-bold text-cyan-300 font-mono">{nights} Nights</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={nights}
                onChange={(e) => setNights(parseInt(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-black/60 rounded-lg cursor-pointer"
                aria-label="Number of Nights"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>Weekend (1-2)</span>
                <span>Standard (3-4)</span>
                <span>Grand (7-10)</span>
              </div>
            </div>
          </div>

          {/* Slider 1: Transport per person */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Car className="w-3.5 h-3.5 text-blue-400" />
                Transport per Person (Bus / Train / Cab fuel)
              </span>
              <span className="font-bold text-white font-mono">{formatINR(transportPerPerson)}</span>
            </div>
            <input
              type="range"
              min="500"
              max="8000"
              step="250"
              value={transportPerPerson}
              onChange={(e) => setTransportPerPerson(parseInt(e.target.value))}
              className="w-full accent-blue-500 h-2 bg-black/60 rounded-lg cursor-pointer"
              aria-label="Transport cost per person"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>₹500 (KSRTC Ordinary)</span>
              <span>₹2,500 (AC Sleeper)</span>
              <span>₹8,000 (Private SUV hire)</span>
            </div>
          </div>

          {/* Slider 2: Stay per night per person */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Home className="w-3.5 h-3.5 text-cyan-400" />
                Stay per Night, per Person
              </span>
              <span className="font-bold text-white font-mono">{formatINR(stayPerNightPerPerson)}</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="250"
              value={stayPerNightPerPerson}
              onChange={(e) => setStayPerNightPerPerson(parseInt(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-black/60 rounded-lg cursor-pointer"
              aria-label="Stay cost per night per person"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>₹500 (Hostel Dorm)</span>
              <span>₹3,500 (Beach Cottage)</span>
              <span>₹10,000+ (Luxury Villa)</span>
            </div>
          </div>

          {/* Slider 3: Food & Dining per day per person */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Utensils className="w-3.5 h-3.5 text-indigo-400" />
                Food & Dining per Day, per Person
              </span>
              <span className="font-bold text-white font-mono">{formatINR(foodPerDayPerPerson)}</span>
            </div>
            <input
              type="range"
              min="300"
              max="3000"
              step="100"
              value={foodPerDayPerPerson}
              onChange={(e) => setFoodPerDayPerPerson(parseInt(e.target.value))}
              className="w-full accent-indigo-400 h-2 bg-black/60 rounded-lg cursor-pointer"
              aria-label="Food cost per day per person"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>₹300 (Thalis & Mess)</span>
              <span>₹1,000 (Beach Shacks)</span>
              <span>₹3,000 (Fine Dining)</span>
            </div>
          </div>

          {/* Slider 4: Activities & Extras */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                Activities & Extras per Person (Coracles, guides, watersports)
              </span>
              <span className="font-bold text-white font-mono">{formatINR(activitiesPerPerson)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="250"
              value={activitiesPerPerson}
              onChange={(e) => setActivitiesPerPerson(parseInt(e.target.value))}
              className="w-full accent-sky-400 h-2 bg-black/60 rounded-lg cursor-pointer"
              aria-label="Activities cost per person"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>₹0 (Free Treks)</span>
              <span>₹1,500 (Coracle + Boat)</span>
              <span>₹5,000 (Scuba + Speedboat)</span>
            </div>
          </div>
        </div>

        {/* Real-time Subtotals & Grand Total Card */}
        <div className="lg:col-span-5 rounded-3xl border border-white/20 bg-gradient-to-b from-[#0c2044]/90 to-[#040c1e]/90 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="pb-4 border-b border-white/10">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300 font-bold">
              Live Projected Expenditure
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
                {formatINR(budget.grandTotal)}
              </span>
              <span className="text-xs text-zinc-300 font-mono">Total for {travelers} Travelers</span>
            </div>
            <div className="mt-1 text-sm font-semibold text-cyan-300">
              {formatINR(budget.perPersonTotal)} <span className="text-xs text-zinc-400 font-normal">per traveler</span>
            </div>
          </div>

          {/* Progress Stack Bar of Expense Proportions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span>Cost Allocation Ratio</span>
              <span className="font-mono text-cyan-300 font-bold">100% Calibrated</span>
            </div>
            <div className="w-full h-3 rounded-full bg-black/60 flex overflow-hidden p-0.5 border border-white/15">
              <div
                style={{ width: `${budget.percentages.stay}%` }}
                className="h-full bg-cyan-400 rounded-l-full transition-all duration-300"
                title={`Stay: ${budget.percentages.stay}%`}
              />
              <div
                style={{ width: `${budget.percentages.food}%` }}
                className="h-full bg-blue-500 transition-all duration-300"
                title={`Food: ${budget.percentages.food}%`}
              />
              <div
                style={{ width: `${budget.percentages.transport}%` }}
                className="h-full bg-indigo-400 transition-all duration-300"
                title={`Transport: ${budget.percentages.transport}%`}
              />
              <div
                style={{ width: `${budget.percentages.activities}%` }}
                className="h-full bg-sky-300 rounded-r-full transition-all duration-300"
                title={`Activities: ${budget.percentages.activities}%`}
              />
            </div>
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-200 pt-1 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Stay: {formatINR(budget.stayTotal)} ({budget.percentages.stay}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Food: {formatINR(budget.foodTotal)} ({budget.percentages.food}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span>Transit: {formatINR(budget.transportTotal)} ({budget.percentages.transport}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-300" />
                <span>Extras: {formatINR(budget.activitiesTotal)} ({budget.percentages.activities}%)</span>
              </div>
            </div>
          </div>

          {/* AI Recommended Stay Tier Box */}
          <div className="p-4 rounded-2xl border border-white/10 bg-black/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-medium">
                Suggested Accommodation Tier
              </span>
              <span
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                  budget.recommendedTier === 'luxury'
                    ? 'bg-amber-400 text-black'
                    : budget.recommendedTier === 'comfort'
                    ? 'bg-blue-600 text-white'
                    : 'bg-cyan-400 text-black'
                }`}
              >
                {budget.recommendedTier.toUpperCase()} TIER
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {budget.recommendedTier === 'luxury'
                ? 'Your budget accommodates cliffside boutique wellness villas (like SwaSwara) and royal heritage palaces.'
                : budget.recommendedTier === 'comfort'
                ? 'Your budget aligns with ocean-facing wooden beach cottages at Kudle and riverside eco-resorts on the Kaveri.'
                : 'Your budget is ideal for atmospheric cliff hostels, beachfront dorms, and authentic homestay rooms.'}
            </p>
          </div>
        </div>
      </div>

      {/* AI Hotel Suggester Matrix */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white">
              AI Hotel & Sanctuary Recommendations
            </h3>
            <p className="text-xs text-zinc-300 mt-0.5">
              Curated stays cross-referenced with your budget tier and trip style
            </p>
          </div>

          {/* Hotel Circuit Filter (iOS Segmented Control) */}
          <div className="flex items-center p-1 rounded-2xl bg-black/60 border border-white/15 self-start sm:self-auto text-xs shadow-inner">
            <button
              onClick={() => setHotelCircuitFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                hotelCircuitFilter === 'all' ? 'bg-blue-600 text-white font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Regions
            </button>
            <button
              onClick={() => setHotelCircuitFilter('gokarna')}
              className={`px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                hotelCircuitFilter === 'gokarna' ? 'bg-cyan-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Gokarna (6)
            </button>
            <button
              onClick={() => setHotelCircuitFilter('talakadu')}
              className={`px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                hotelCircuitFilter === 'talakadu' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Talakadu & Mysuru (6)
            </button>
          </div>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => {
            const isWishlisted = wishlistHotels.includes(hotel.id);
            const isMatchingTier = hotel.tier === budget.recommendedTier;

            return (
              <div
                key={hotel.id}
                className={`rounded-2xl border bg-gradient-to-b from-[#0b1b38]/70 to-[#050e24]/80 backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-blue-400/50 hover:-translate-y-1 shadow-lg ${
                  isMatchingTier
                    ? 'border-blue-500/50 ring-1 ring-blue-400/40'
                    : 'border-white/15'
                }`}
              >
                {/* Image & Badges */}
                <div className="relative h-44 w-full overflow-hidden bg-black/60">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050e24] via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-black/70 text-white border border-white/20 backdrop-blur-md">
                      {hotel.tier.toUpperCase()} TIER
                    </span>
                    {hotel.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-600 text-white backdrop-blur-md">
                        {hotel.badge}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart/Bookmark Trigger */}
                  <button
                    onClick={() => onToggleWishlistHotel(hotel.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                      isWishlisted
                        ? 'bg-amber-400 text-black shadow-md'
                        : 'bg-black/60 text-white/90 hover:text-white hover:bg-black/80'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    aria-label={`Wishlist ${hotel.name}`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="text-zinc-300 text-[11px] font-medium truncate max-w-[200px]">
                      {hotel.locationLabel}
                    </span>
                    <div className="flex items-center gap-1 bg-black/80 px-2 py-0.5 rounded-md text-amber-300 font-mono text-[11px] font-bold">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>{hotel.rating}</span>
                      <span className="text-zinc-400 font-normal">({hotel.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Hotel Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-white">
                      {hotel.name}
                    </h4>
                    <p className="text-[11px] text-cyan-300 font-mono mt-0.5">
                      📍 {hotel.distanceToHighlights}
                    </p>
                    <p className="text-xs text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {hotel.amenities.slice(0, 3).map((am, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-zinc-300"
                      >
                        {am}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer: Price & Direct Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold font-mono text-white">
                        {formatINR(hotel.avgPricePerNight)}
                      </div>
                      <div className="text-[10px] text-zinc-400">avg / night / room</div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {onOpenMapsIntel && (
                        <button
                          onClick={() => onOpenMapsIntel(hotel.name)}
                          className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 transition-colors"
                          title="View Google Maps Reviews & Intel"
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onToggleWishlistHotel(hotel.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                          isWishlisted
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        {isWishlisted ? <Check className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                        <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                      </button>
                    </div>
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
