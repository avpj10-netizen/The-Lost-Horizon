import React, { useState } from 'react';
import { DESTINATIONS_DATA } from '../data/destinations';
import { LocationDetail, CircuitType } from '../types';
import { MapPin, Clock, Users, Compass, Lightbulb, CheckCircle2, X, Navigation, Waves, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DestinationShowcaseProps {
  currentCircuit: CircuitType;
  onSelectCircuit: (circuit: CircuitType) => void;
  selectedLocationId?: string | null;
  onSelectLocation?: (locationId: string) => void;
  onOpenMapsIntel?: (location: string) => void;
}

export const DestinationShowcase: React.FC<DestinationShowcaseProps> = ({
  currentCircuit,
  onSelectCircuit,
  selectedLocationId,
  onSelectLocation,
  onOpenMapsIntel,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'gokarna' | 'talakadu'>(
    currentCircuit === 'gokarna' ? 'gokarna' : currentCircuit === 'talakadu' ? 'talakadu' : 'all'
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [modalLocation, setModalLocation] = useState<LocationDetail | null>(null);

  // Sync tab with external circuit changes
  React.useEffect(() => {
    if (currentCircuit === 'gokarna' || currentCircuit === 'talakadu') {
      setActiveTab(currentCircuit);
    }
  }, [currentCircuit]);

  // If a location is requested from external (like clicking radar pin on map)
  React.useEffect(() => {
    if (selectedLocationId) {
      const match = DESTINATIONS_DATA.find((d) => d.id === selectedLocationId);
      if (match) {
        setModalLocation(match);
      }
    }
  }, [selectedLocationId]);

  const filteredLocations = DESTINATIONS_DATA.filter((loc) => {
    if (activeTab !== 'all' && loc.circuit !== activeTab) return false;
    if (categoryFilter !== 'all' && loc.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="w-full space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-white border border-slate-300 dark:border-white/15 backdrop-blur-md">
              Curated Destination Guide
            </span>
            <span className="text-slate-500 dark:text-zinc-400 text-xs">• 14 Handpicked Wonders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
            Dual Heritage Showcase
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
            Uncommercialized cliff trails, 4th-century Shaivite sanctuaries, subterranean karst monoliths, and sand-buried Hoysala treasures along the Kaveri river.
          </p>
        </div>

        {/* Circuit Switcher Tabs (Apple iOS Segmented Control) */}
        <div className="flex items-center p-1 rounded-2xl bg-black/50 border border-white/15 self-start md:self-auto backdrop-blur-xl shadow-lg">
          <button
            onClick={() => {
              setActiveTab('all');
              onSelectCircuit('all');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-95 ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 font-semibold shadow-sm'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            All Wonders (14)
          </button>
          <button
            onClick={() => {
              setActiveTab('gokarna');
              onSelectCircuit('gokarna');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
              activeTab === 'gokarna'
                ? 'bg-sky-500 text-white font-semibold shadow-sm'
                : 'text-zinc-300 hover:text-sky-300'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Gokarna (8)</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('talakadu');
              onSelectCircuit('talakadu');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
              activeTab === 'talakadu'
                ? 'bg-sky-500 text-white font-semibold shadow-sm'
                : 'text-zinc-300 hover:text-sky-300'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Talakadu (6)</span>
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: 'all', label: 'All Highlights' },
          { id: 'beach', label: 'Coves & Beaches' },
          { id: 'cliff', label: 'Coastal Cliffs' },
          { id: 'temple', label: 'Ancient Temples' },
          { id: 'heritage', label: 'Hoysala Shrines' },
          { id: 'nature', label: 'Karst Caves & Falls' },
          { id: 'river', label: 'River Coracles' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all active:scale-95 border ${
              categoryFilter === cat.id
                ? 'bg-white text-slate-900 border-white font-semibold shadow-sm'
                : 'bg-white/5 text-zinc-300 border-white/10 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Destination Grid with iOS Motion Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((loc, idx) => {
          const isGokarna = loc.circuit === 'gokarna';
          return (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setModalLocation(loc)}
              className="group relative rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900/70 backdrop-blur-xl overflow-hidden hover:border-slate-300 dark:hover:border-white/30 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-2xl cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={loc.imageUrl}
                  alt={loc.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md border ${
                      isGokarna
                        ? 'bg-sky-950/80 text-sky-200 border-sky-400/40'
                        : 'bg-amber-950/80 text-amber-200 border-amber-400/40'
                    }`}
                  >
                    {isGokarna ? 'Gokarna Coast' : 'Talakadu Dunes'}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-black/60 text-zinc-200 border border-white/15 backdrop-blur-md">
                    {loc.idealDuration}
                  </span>
                </div>

                {/* Kannada Script Watermark */}
                <div className="absolute bottom-2 right-3 text-xs font-serif text-white/80 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                  {loc.kannadaName}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-zinc-300 mt-0.5">
                    {loc.tagline}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                    {loc.description}
                  </p>
                </div>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                  {loc.highlights.slice(0, 3).map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-white/5 text-[10px] text-zinc-300 border border-white/5"
                    >
                      {h}
                    </span>
                  ))}
                  {loc.highlights.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-zinc-400">
                      +{loc.highlights.length - 3} more
                    </span>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Best: {loc.bestTime.split('(')[0]}</span>
                  </div>
                  <span
                    className={`text-xs font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ${
                      isGokarna ? 'text-sky-400' : 'text-amber-400'
                    }`}
                  >
                    View Details →
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Location Detail Modal */}
      {modalLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-slate-900 p-6 sm:p-8 shadow-2xl text-white space-y-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalLocation(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header & Hero Banner */}
            <div className="relative -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 h-64 sm:h-72 overflow-hidden rounded-t-3xl">
              <img
                src={modalLocation.imageUrl}
                alt={modalLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-4 left-6 sm:left-8 right-6">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-3 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      modalLocation.circuit === 'gokarna'
                        ? 'bg-sky-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {modalLocation.circuit === 'gokarna' ? 'Gokarna Coast' : 'Talakadu Dunes'}
                  </span>
                  <span className="text-xs text-white/90 font-serif">
                    {modalLocation.kannadaName}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {modalLocation.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300">
                  {modalLocation.tagline}
                </p>
              </div>
            </div>

            {/* Narrative */}
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
              {modalLocation.description}
            </p>

            {/* Insider Tip Callout Box */}
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                modalLocation.circuit === 'gokarna'
                  ? 'bg-sky-950/40 border-sky-500/30 text-sky-100'
                  : 'bg-amber-950/40 border-amber-500/30 text-amber-100'
              }`}
            >
              <Lightbulb
                className={`w-5 h-5 shrink-0 mt-0.5 ${
                  modalLocation.circuit === 'gokarna' ? 'text-sky-300' : 'text-amber-300'
                }`}
              />
              <div>
                <span className="font-semibold block text-xs tracking-wider uppercase mb-1">
                  Local Field Recommendation
                </span>
                <p className="text-xs leading-relaxed opacity-95">
                  {modalLocation.insiderTip}
                </p>
              </div>
            </div>

            {/* Practical Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400 block text-[10px]">Optimal Timing</span>
                <span className="font-semibold text-white mt-0.5 block">{modalLocation.bestTime}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400 block text-[10px]">Visit Duration</span>
                <span className="font-semibold text-white mt-0.5 block">{modalLocation.idealDuration}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400 block text-[10px]">Crowd Level</span>
                <span className="font-semibold text-white mt-0.5 block">{modalLocation.crowdLevel}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400 block text-[10px]">Category</span>
                <span className="font-semibold text-white mt-0.5 block capitalize">{modalLocation.category}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              {onOpenMapsIntel && (
                <button
                  onClick={() => {
                    setModalLocation(null);
                    onOpenMapsIntel(modalLocation.name);
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all active:scale-95 flex items-center justify-center gap-1.5 border border-white/10"
                >
                  <Navigation className="w-3.5 h-3.5 text-sky-400" />
                  <span>Check Live Transit Route</span>
                </button>
              )}

              <button
                onClick={() => setModalLocation(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-zinc-200 text-xs font-semibold transition-all active:scale-95 shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
