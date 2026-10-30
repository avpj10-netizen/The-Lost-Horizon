import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
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
import { Compass, Waves, Landmark, Sparkles, ArrowDown, MapPin, Navigation, ArrowRight, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SESSION_STORAGE_KEY = 'the_lost_horizon_session_v4';

const MainAppContent: React.FC = () => {
  const { t, theme } = useApp();
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
      const current = prev.wishlistHotels || [];
      const exists = current.includes(hotelId);
      return {
        ...prev,
        wishlistHotels: exists ? current.filter((id) => id !== hotelId) : [...current, hotelId],
      };
    });
  };

  const handleUpdatePackingItems = (items: PackingItem[]) => {
    setSession((prev) => ({
      ...prev,
      customPackingItems: items,
    }));
  };

  const handleOpenMapsIntel = (location: string) => {
    setMapsModalTarget(location);
    setIsMapsModalOpen(true);
  };

  // Background image toggle for hero based on selected circuit
  const heroBackgrounds = {
    all: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=2000&q=80',
    gokarna: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=2000&q=80',
    talakadu: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=80',
    combined: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-slate-900 transition-colors">
      
      {/* Top Floating Dynamic Navigation Island */}
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
        onOpenMapsIntel={() => handleOpenMapsIntel('Om Beach Gokarna')}
      />

      {/* ========================================================
          HERO CINEMATIC SECTION
         ======================================================== */}
      <section
        id="hero"
        className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
      >
        {/* Dynamic Background Image with Smooth Crossfade */}
        <div className="absolute inset-0 z-0">
          <img
            key={currentCircuit}
            src={heroBackgrounds[currentCircuit] || heroBackgrounds.all}
            alt="Karnataka Heritage"
            className="w-full h-full object-cover transition-opacity duration-1000 animate-in fade-in"
          />
          {/* Light & Dark Adaptive Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/85 via-slate-50/75 to-slate-50 dark:from-slate-950/85 dark:via-slate-950/75 dark:to-slate-950 transition-colors" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <ScrollReveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/40 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-slate-700 dark:text-zinc-200 mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-slate-950 dark:text-white leading-[1.08] mb-6">
              {t.hero.titleLine1}
              <span className="block text-2xl sm:text-4xl md:text-5xl font-light text-slate-700 dark:text-zinc-300 mt-2">
                {t.hero.titleLine2}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="max-w-2xl text-base sm:text-lg text-slate-700 dark:text-zinc-300 leading-relaxed mb-10">
              {t.hero.subtitle}
            </p>
          </ScrollReveal>

          {/* Quick Action Navigation Buttons */}
          <ScrollReveal direction="up" delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setCurrentCircuit('gokarna');
                  navigateToSection('destinations');
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-semibold text-xs sm:text-sm hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                <Waves className="w-4 h-4" />
                <span>{t.hero.exploreGokarna}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => {
                  setCurrentCircuit('talakadu');
                  navigateToSection('destinations');
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/40 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all shadow-sm backdrop-blur-md"
              >
                <Landmark className="w-4 h-4" />
                <span>{t.hero.exploreTalakadu}</span>
              </button>

              <button
                onClick={() => navigateToSection('map')}
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-slate-300 dark:border-white/20 bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-zinc-200 font-semibold text-xs sm:text-sm hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95 transition-all shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>{t.hero.interactiveMap}</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Stats Ribbon */}
          <ScrollReveal direction="up" delay={0.3} className="w-full mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-white/15 text-left">
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                <div className="text-xl font-bold font-serif text-slate-950 dark:text-white">
                  {t.hero.statsCircuits}
                </div>
                <div className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
                  {t.hero.statsCircuitsDesc}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                <div className="text-xl font-bold font-serif text-slate-950 dark:text-white">
                  {t.hero.statsDistance}
                </div>
                <div className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
                  {t.hero.statsDistanceDesc}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                <div className="text-xl font-bold font-serif text-slate-950 dark:text-white">
                  {t.hero.statsHeritage}
                </div>
                <div className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
                  {t.hero.statsHeritageDesc}
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================
          DESTINATIONS SHOWCASE SECTION
         ======================================================== */}
      <section id="destinations" className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal direction="up">
          <DestinationShowcase
            currentCircuit={currentCircuit}
            onSelectCircuit={setCurrentCircuit}
            selectedLocationId={selectedLocationId}
            onSelectLocation={(locId) => setSelectedLocationId(locId)}
            onOpenMapsIntel={handleOpenMapsIntel}
          />
        </ScrollReveal>
      </section>

      {/* ========================================================
          KARNATAKA DISTRICT MAP SECTION
         ======================================================== */}
      <section id="map" className="max-w-7xl mx-auto px-2 sm:px-4 py-16 border-t border-slate-200 dark:border-slate-800">
        <ScrollReveal direction="up">
          <KarnatakaSatelliteMap
            currentCircuit={currentCircuit}
            onSelectCircuit={setCurrentCircuit}
            onExploreLocation={(locId) => setSelectedLocationId(locId)}
            onOpenMapsIntel={handleOpenMapsIntel}
          />
        </ScrollReveal>
      </section>

      {/* ========================================================
          ITINERARY GENERATOR SECTION
         ======================================================== */}
      <section id="itinerary" className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-200 dark:border-slate-800">
        <ScrollReveal direction="up">
          <ItineraryGenerator
            currentCircuit={currentCircuit}
            onSaveItinerary={handleSaveItinerary}
            savedItineraries={session.savedItineraries || []}
            onOpenMapsIntel={handleOpenMapsIntel}
          />
        </ScrollReveal>
      </section>

      {/* ========================================================
          BUDGET & HOTEL ESTIMATOR SECTION
         ======================================================== */}
      <section id="budget" className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-200 dark:border-slate-800">
        <ScrollReveal direction="up">
          <BudgetEstimator
            currentCircuit={currentCircuit}
            wishlistHotels={session.wishlistHotels || []}
            onToggleWishlistHotel={handleToggleWishlistHotel}
            onOpenMapsIntel={handleOpenMapsIntel}
          />
        </ScrollReveal>
      </section>

      {/* ========================================================
          ACTION PODS: PHRASEBOOK, PACKING & QUIZ
         ======================================================== */}
      <section id="pods" className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-200 dark:border-slate-800">
        <ScrollReveal direction="up">
          <ActionPods
            currentCircuit={currentCircuit}
            customPackingItems={session.customPackingItems || []}
            onUpdatePackingItems={handleUpdatePackingItems}
            onExploreCircuit={setCurrentCircuit}
          />
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 px-4 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Compass className="w-4 h-4 text-slate-800 dark:text-zinc-200" />
              <span className="font-serif font-bold text-sm uppercase text-slate-900 dark:text-white">
                {t.appName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {t.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600 dark:text-zinc-400">
            <button onClick={() => navigateToSection('hero')} className="hover:text-slate-900 dark:hover:text-white">
              {t.nav.overview}
            </button>
            <button onClick={() => navigateToSection('destinations')} className="hover:text-slate-900 dark:hover:text-white">
              Wonders
            </button>
            <button onClick={() => navigateToSection('map')} className="hover:text-slate-900 dark:hover:text-white">
              {t.nav.map}
            </button>
            <button onClick={() => navigateToSection('itinerary')} className="hover:text-slate-900 dark:hover:text-white">
              Planner
            </button>
            <button onClick={() => navigateToSection('budget')} className="hover:text-slate-900 dark:hover:text-white">
              Budget
            </button>
            <button onClick={() => navigateToSection('pods')} className="hover:text-slate-900 dark:hover:text-white">
              Travel Pods
            </button>
          </div>

          <div className="text-xs text-slate-400 dark:text-zinc-500 font-mono">
            Karnataka Expedition • 2026
          </div>
        </div>
      </footer>

      {/* Auth & Saved Trips Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalInitialTab}
        session={session}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onDeleteItinerary={handleDeleteItinerary}
        onRemoveWishlistHotel={handleToggleWishlistHotel}
      />

      {/* Google Maps Grounding Modal */}
      <MapsGroundingModal
        isOpen={isMapsModalOpen}
        onClose={() => setIsMapsModalOpen(false)}
        targetLocation={mapsModalTarget}
      />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
