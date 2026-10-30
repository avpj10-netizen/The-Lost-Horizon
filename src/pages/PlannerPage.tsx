import React, { useState } from 'react';
import { Calendar, DollarSign, Briefcase, Sparkles, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ItineraryGenerator } from '../components/ItineraryGenerator';
import { BudgetEstimator } from '../components/BudgetEstimator';
import { ActionPods } from '../components/ActionPods';
import { MapsGroundingModal } from '../components/MapsGroundingModal';

export const PlannerPage: React.FC = () => {
  const { 
    t, 
    currentCircuit, 
    setCurrentCircuit, 
    session, 
    handleSaveItinerary, 
    handleToggleWishlistHotel 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'itinerary' | 'budget' | 'pods'>('itinerary');
  const [isMapsModalOpen, setIsMapsModalOpen] = useState(false);
  const [mapsModalTarget, setMapsModalTarget] = useState('Om Beach Gokarna');

  const handleOpenMapsIntel = (location: string) => {
    setMapsModalTarget(location);
    setIsMapsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors pt-20">
      
      {/* Top Header */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">
              <Compass className="w-4 h-4" />
              <span>{t.planner.subtitle}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-zinc-950 dark:text-white">
              {t.planner.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
              {t.planner.desc}
            </p>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex items-center bg-zinc-200/70 dark:bg-zinc-900 p-1 rounded-full border border-zinc-300/80 dark:border-zinc-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === 'itinerary'
                  ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Itinerary</span>
            </button>

            <button
              onClick={() => setActiveTab('budget')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === 'budget'
                  ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Budget & Stays</span>
            </button>

            <button
              onClick={() => setActiveTab('pods')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === 'pods'
                  ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Travel Pods</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'itinerary' && (
          <ItineraryGenerator
            currentCircuit={currentCircuit}
            onSaveItinerary={handleSaveItinerary}
            savedItineraries={session.savedItineraries || []}
            onOpenMapsIntel={handleOpenMapsIntel}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetEstimator
            currentCircuit={currentCircuit}
            wishlistHotels={session.wishlistHotels || []}
            onToggleWishlistHotel={handleToggleWishlistHotel}
            onOpenMapsIntel={handleOpenMapsIntel}
          />
        )}

        {activeTab === 'pods' && (
          <ActionPods
            currentCircuit={currentCircuit}
            customPackingItems={session.customPackingItems || []}
            onUpdatePackingItems={() => {}}
            onExploreCircuit={setCurrentCircuit}
          />
        )}
      </div>

      {/* Maps Grounding Modal */}
      <MapsGroundingModal
        isOpen={isMapsModalOpen}
        onClose={() => setIsMapsModalOpen(false)}
        targetLocation={mapsModalTarget}
      />

    </div>
  );
};
