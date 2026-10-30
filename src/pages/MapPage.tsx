import React, { useState } from 'react';
import { KarnatakaSatelliteMap } from '../components/KarnatakaSatelliteMap';
import { useApp } from '../context/AppContext';
import { Compass, Waves, Landmark, Info, MapPin } from 'lucide-react';
import { MapsGroundingModal } from '../components/MapsGroundingModal';

export const MapPage: React.FC = () => {
  const { t, currentCircuit, setCurrentCircuit } = useApp();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isMapsModalOpen, setIsMapsModalOpen] = useState(false);
  const [mapsModalTarget, setMapsModalTarget] = useState('Om Beach Gokarna');

  const handleOpenMapsIntel = (location: string) => {
    setMapsModalTarget(location);
    setIsMapsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors pt-20">
      
      {/* Header bar */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">
              <Compass className="w-4 h-4" />
              <span>{t.map.subtitle}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-zinc-950 dark:text-white">
              {t.map.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
              {t.map.desc}
            </p>
          </div>

          {/* Quick Focus Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentCircuit('gokarna')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentCircuit === 'gokarna'
                  ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                  : 'border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Focus Gokarna</span>
            </button>

            <button
              onClick={() => setCurrentCircuit('talakadu')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentCircuit === 'talakadu'
                  ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                  : 'border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Focus Talakadu</span>
            </button>

            <button
              onClick={() => setCurrentCircuit('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentCircuit === 'all'
                  ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                  : 'border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
              }`}
            >
              All
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <KarnatakaSatelliteMap
          currentCircuit={currentCircuit}
          onSelectCircuit={setCurrentCircuit}
          onExploreLocation={(locId) => setSelectedLocation(locId)}
          onOpenMapsIntel={handleOpenMapsIntel}
        />
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
