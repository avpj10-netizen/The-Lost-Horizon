import React, { useState, useEffect } from 'react';
import { DynamicIsland } from './components/DynamicIsland';
import { KarnatakaSatelliteMap } from './components/KarnatakaSatelliteMap';
import { DestinationShowcase } from './components/DestinationShowcase';
import { ItineraryGenerator } from './components/ItineraryGenerator';
import { BudgetEstimator } from './components/BudgetEstimator';
import { ActionPods } from './components/ActionPods';
import { AuthModal } from './components/AuthModal';
import { MapsGroundingModal } from './components/MapsGroundingModal';
import { ScrollReveal } from './components/ScrollReveal';
import { CircuitType, UserSession, GeneratedItinerary, PackingItem } from './types';
import { DEFAULT_PACKING_ITEMS } from './data/packingChecklist';
import { Compass, Waves, Landmark, Sparkles, ArrowDown, MapPin, Navigation, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SESSION_STORAGE_KEY = 'the_lost_horizon_session_v2';

export default function App() {
  const [currentCircuit, setCurrentCircuit] = useState<CircuitType>('all');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  // Maps Grounding modal state
  const [isMapsModalOpen, setIsMapsModalOpen] = useState<boolean>(false);
  const [mapsModalTarget, setMapsModalTarget] = useState<string>('Om Beach Gokarna');

  // Authentication & Session State
  const [session, setSession] = useState<UserSession>(() => {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored session:', e);
    }
    return {
      isLoggedIn: false,
      user: null,
      savedItineraries: [],
      wishlistHotels: ['zostel-gokarna', 'talakadu-jaladhama-resort'],
      customPackingItems: DEFAULT_PACKING_ITEMS,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('Failed to write session:', e);
    }
  }, [session]);

  // Auth & Saved modal controls
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'auth' | 'saved'>('auth');

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSignIn = (userData: { displayName: string; email: string; avatarUrl: string; tier?: any }) => {
    setSession((prev) => ({
      ...prev,
      isLoggedIn: true,
      user: {
        id: `usr-${Date.now()}`,
        displayName: userData.displayName,
        email: userData.email,
        avatarUrl: userData.avatarUrl,
        membershipTier: userData.tier || 'Explorer',
        memberSince: 'October 2026',
      },
    }));
  };

  const handleSignOut = () => {
    setSession((prev) => ({
      ...prev,
      isLoggedIn: false,
      user: null,
    }));
  };

  const handleSaveItinerary = (itinerary: GeneratedItinerary) => {
    setSession((prev) => {
      const existing = prev.savedItineraries || [];
      const alreadySaved = existing.some((it) => it.id === itinerary.id);
      if (alreadySaved) return prev;
      return {
        ...prev,
        savedItineraries: [itinerary, ...existing],
      };
    });
  };

  const handleDeleteItinerary = (itineraryId: string) => {
    setSession((prev) => ({
      ...prev,
      savedItineraries: (prev.savedItineraries || []).filter((it) => it.id !== itineraryId),
    }));
  };

  const handleToggleWishlistHotel = (hotelId: string) => {
    setSession((prev) => {
      const list = prev.wishlistHotels || [];
      const nextList = list.includes(hotelId)
        ? list.filter((id) => id !== hotelId)
        : [...list, hotelId];
      return {
        ...prev,
        wishlistHotels: nextList,
      };
    });
  };

  const handleUpdatePackingItems = (items: PackingItem[]) => {
    setSession((prev) => ({
      ...prev,
      customPackingItems: items,
    }));
  };

  const handleExploreLocationFromMap = (locationId: string) => {
    setSelectedLocationId(locationId);
    navigateToSection('destinations');
  };

  const handleOpenMapsIntel = (locationName: string = 'Om Beach Gokarna') => {
    setMapsModalTarget(locationName);
    setIsMapsModalOpen(true);
  };

  // High-resolution photography of Gokarna and Talakadu for the background
  const heroBackgroundUrl =
    currentCircuit === 'talakadu'
      ? 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=85'
      : currentCircuit === 'gokarna'
      ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85'
      : 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=2400&q=85';

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200 antialiased overflow-x-hidden">
      {/* Native iOS Style Dynamic Island Floating Header */}
      <DynamicIsland
        currentCircuit={currentCircuit}
        onSelectCircuit={setCurrentCircuit}
        activeSection={activeSection}
        onNavigateSection={navigateToSection}
        session={session}
        onOpenAuth={() => {
          setAuthModalInitialTab('auth');
          setIsAuthModalOpen(true);
        }}
        onOpenSavedTrips={() => {
          setAuthModalInitialTab('saved');
          setIsAuthModalOpen(true);
        }}
        onSignOut={handleSignOut}
        onOpenMapsIntel={() => handleOpenMapsIntel('Karnataka Dual Corridor')}
      />

      {/* Main Content Area */}
      <main className="relative pt-20 sm:pt-24 pb-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-28">
        
        {/* ========================================================
            HERO SECTION: Pure Editorial Aesthetics & Dynamic Background
           ======================================================== */}
        <ScrollReveal className="w-full">
          <section
            id="hero"
            className="relative pt-6 sm:pt-12 pb-8 sm:pb-12 text-center space-y-6 sm:space-y-8 rounded-3xl overflow-hidden border border-white/15 bg-slate-950/85 shadow-2xl"
          >
            {/* Authentic Photographic Destination Background of Gokarna and Talakadu */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={heroBackgroundUrl}
                  src={heroBackgroundUrl}
                  alt="Karnataka Heritage Landscape"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 0.42, scale: 1.0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05] saturate-[1.1]"
                />
              </AnimatePresence>
              {/* Soft Vignette and Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/80 to-[#070b14]/60" />
              <div className="absolute inset-0 bg-radial from-transparent via-[#070b14]/50 to-[#070b14]" />
            </div>

            {/* Top Regional Switcher Bar */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/30 bg-slate-900/90 backdrop-blur-xl text-xs font-medium text-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>
                  {currentCircuit === 'gokarna'
                    ? 'Gokarna Coastline • Arabian Sea Cliffs'
                    : currentCircuit === 'talakadu'
                    ? 'Talakadu River Dunes • Kaveri Basin'
                    : 'Karnataka Dual Heritage Corridor • 518 km'}
                </span>
              </div>

              {/* Quick Destination Switcher Pills */}
              <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md text-xs font-medium text-zinc-300">
                <button
                  onClick={() => setCurrentCircuit('all')}
                  className={`px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                    currentCircuit === 'all'
                      ? 'bg-white text-slate-900 font-semibold shadow-sm'
                      : 'hover:text-white'
                  }`}
                >
                  Dual View
                </button>
                <button
                  onClick={() => setCurrentCircuit('gokarna')}
                  className={`px-3 py-1.5 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 ${
                    currentCircuit === 'gokarna'
                      ? 'bg-sky-500 text-white font-semibold shadow-sm'
                      : 'hover:text-sky-300'
                  }`}
                >
                  <Waves className="w-3.5 h-3.5" />
                  <span>Gokarna Coast</span>
                </button>
                <button
                  onClick={() => setCurrentCircuit('talakadu')}
                  className={`px-3 py-1.5 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 ${
                    currentCircuit === 'talakadu'
                      ? 'bg-sky-500 text-white font-semibold shadow-sm'
                      : 'hover:text-sky-300'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Talakadu Dunes</span>
                </button>
              </div>
            </div>

            {/* Master Title & Editorial Copy */}
            <div className="relative z-10 px-4 sm:px-8 space-y-3 pt-1">
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
                The Lost Horizon
              </h1>

              <p className="text-xs sm:text-base text-zinc-200 max-w-2xl mx-auto font-normal leading-relaxed">
                Where the secluded rocky cliffs and sacred Shiva temples of <strong className="text-sky-300 font-semibold">Gokarna</strong> converge with the sand-buried shrines and tranquil Kaveri coracles of <strong className="text-sky-300 font-semibold">Talakadu</strong>.
              </p>
            </div>

            {/* ========================================================
                STARTING DUAL CIRCUIT CARDS
                Same Unified White & iOS Blue Color Palette for Both
               ======================================================== */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto px-4 text-left pt-2">
              {/* Western Seaboard (Gokarna) */}
              <div
                onClick={() => {
                  setCurrentCircuit('gokarna');
                  navigateToSection('destinations');
                }}
                className="p-5 rounded-2xl border border-white/15 bg-slate-900/80 backdrop-blur-xl hover:border-sky-400/50 hover:bg-slate-900/95 transition-all duration-300 cursor-pointer group shadow-xl active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-sky-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Waves className="w-3.5 h-3.5 text-sky-400" />
                    Western Seaboard
                  </span>
                  <span className="text-xs text-zinc-400 font-sans">Uttara Kannada</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white mt-2 group-hover:text-sky-300 transition-colors">
                  Gokarna Cliffs & Coves
                </h3>
                <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                  Om Beach, Kudle crescent sands, the 4th-century Mahabaleshwar Atmalinga, and wild cliff trail scrambles.
                </p>
                <div className="mt-3 text-xs font-semibold text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Gokarna Highlights →
                </div>
              </div>

              {/* Southern Kaveri Basin (Talakadu) - Matching White & Blue Styling */}
              <div
                onClick={() => {
                  setCurrentCircuit('talakadu');
                  navigateToSection('destinations');
                }}
                className="p-5 rounded-2xl border border-white/15 bg-slate-900/80 backdrop-blur-xl hover:border-sky-400/50 hover:bg-slate-900/95 transition-all duration-300 cursor-pointer group shadow-xl active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-sky-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-sky-400" />
                    Southern Kaveri Basin
                  </span>
                  <span className="text-xs text-zinc-400 font-sans">Mysuru Valley</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white mt-2 group-hover:text-sky-300 transition-colors">
                  Talakadu Sand & Sanctums
                </h3>
                <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                  Panchalinga shrines buried under inland river sand dunes, circular Kaveri coracles, and ancient Hoysala masterworks.
                </p>
                <div className="mt-3 text-xs font-semibold text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Talakadu Highlights →
                </div>
              </div>
            </div>

            {/* Quick Action Anchor */}
            <div className="relative z-10 pt-2 pb-1 flex justify-center">
              <button
                onClick={() => navigateToSection('map')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-xs font-medium text-white transition-all shadow-md active:scale-95"
              >
                <span>View Official Karnataka District Map</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-sky-400" />
              </button>
            </div>
          </section>
        </ScrollReveal>

        {/* ========================================================
            SECTION 2: OFFICIAL KARNATAKA DISTRICT MAP & BACKGROUND
           ======================================================== */}
        <ScrollReveal className="w-full" delay={0.05}>
          <section id="map" className="scroll-mt-24 sm:scroll-mt-32">
            <KarnatakaSatelliteMap
              currentCircuit={currentCircuit}
              onSelectCircuit={setCurrentCircuit}
              onExploreLocation={handleExploreLocationFromMap}
              onOpenMapsIntel={handleOpenMapsIntel}
            />
          </section>
        </ScrollReveal>

        {/* ========================================================
            SECTION 3: DESTINATION SHOWCASE DEEP-DIVE
           ======================================================== */}
        <ScrollReveal className="w-full" delay={0.05}>
          <section id="destinations" className="scroll-mt-24 sm:scroll-mt-32">
            <DestinationShowcase
              currentCircuit={currentCircuit}
              onSelectCircuit={setCurrentCircuit}
              selectedLocationId={selectedLocationId}
              onSelectLocation={setSelectedLocationId}
              onOpenMapsIntel={handleOpenMapsIntel}
            />
          </section>
        </ScrollReveal>

        {/* ========================================================
            SECTION 4: BESPOKE ITINERARY PLANNER
           ======================================================== */}
        <ScrollReveal className="w-full" delay={0.05}>
          <section id="itinerary" className="scroll-mt-24 sm:scroll-mt-32">
            <ItineraryGenerator
              currentCircuit={currentCircuit}
              onSaveItinerary={handleSaveItinerary}
              savedItineraries={session.savedItineraries || []}
              onOpenMapsIntel={handleOpenMapsIntel}
            />
          </section>
        </ScrollReveal>

        {/* ========================================================
            SECTION 5: REAL-TIME BUDGET ESTIMATOR & HOTEL SUGGESTER
           ======================================================== */}
        <ScrollReveal className="w-full" delay={0.05}>
          <section id="budget" className="scroll-mt-24 sm:scroll-mt-32">
            <BudgetEstimator
              currentCircuit={currentCircuit}
              wishlistHotels={session.wishlistHotels || []}
              onToggleWishlistHotel={handleToggleWishlistHotel}
              onOpenMapsIntel={handleOpenMapsIntel}
            />
          </section>
        </ScrollReveal>

        {/* ========================================================
            SECTION 6: SUPPORTING ACTION PODS & FIELD TOOLS
           ======================================================== */}
        <ScrollReveal className="w-full" delay={0.05}>
          <section id="action-pods" className="scroll-mt-24 sm:scroll-mt-32">
            <ActionPods
              currentCircuit={currentCircuit}
              customPackingItems={session.customPackingItems || DEFAULT_PACKING_ITEMS}
              onUpdatePackingItems={handleUpdatePackingItems}
              onExploreCircuit={(circuit) => {
                setCurrentCircuit(circuit);
                navigateToSection('destinations');
              }}
            />
          </section>
        </ScrollReveal>
      </main>

      {/* Elegant Editorial Footer */}
      <footer className="border-t border-white/10 bg-slate-950/90 py-12 px-4 sm:px-6 text-center text-xs text-zinc-400 space-y-3">
        <div className="flex items-center justify-center gap-2 text-white font-serif font-bold text-sm">
          <Compass className="w-4 h-4 text-sky-400" />
          <span>The Lost Horizon • Karnataka Coastal & Heritage Explorer</span>
        </div>
        <p className="max-w-md mx-auto text-zinc-400 leading-relaxed">
          Crafted with Apple iOS spring micro-interactions, official Karnataka district cartography, and curated travel intelligence.
        </p>
        <p className="text-zinc-500">© 2026 The Lost Horizon. Celebrating the sacred heritage of Gokarna & Talakadu.</p>
      </footer>

      {/* Auth & Saved Trips Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        session={session}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onDeleteItinerary={handleDeleteItinerary}
        onRemoveWishlistHotel={handleToggleWishlistHotel}
        initialTab={authModalInitialTab}
      />

      {/* Google Maps Grounding Intelligence Modal */}
      <MapsGroundingModal
        isOpen={isMapsModalOpen}
        onClose={() => setIsMapsModalOpen(false)}
        targetLocation={mapsModalTarget}
      />
    </div>
  );
}
