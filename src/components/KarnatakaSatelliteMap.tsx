import React, { useState, useEffect } from 'react';
import { 
  Compass, Waves, Landmark, Route, ZoomIn, ZoomOut, RefreshCw, 
  MapPin, ArrowRight, CheckCircle2, Info, Sparkles, Navigation,
  Globe, Eye, ChevronRight, Camera, Mountain, ShieldCheck, Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CircuitType } from '../types';

interface KarnatakaSatelliteMapProps {
  currentCircuit: CircuitType;
  onSelectCircuit: (circuit: CircuitType) => void;
  onExploreLocation: (locationId: string) => void;
  onOpenMapsIntel: (location: string) => void;
}

export interface DistrictInfo {
  id: string;
  name: string;
  kannadaName: string;
  category: 'coastal' | 'heritage' | 'transit' | 'ghats' | 'plateau';
  description: string;
  pinLeft: string; // % relative to image
  pinTop: string;  // % relative to image
  width?: string;
  height?: string;
  attractions: string[];
  imageUrl: string;
  imageCaption: string;
  elevation: string;
  bestSeason: string;
}

export const ALL_DISTRICTS: DistrictInfo[] = [
  {
    id: 'uttara-kannada',
    name: 'Uttara Kannada (Gokarna)',
    kannadaName: 'ಉತ್ತರ ಕನ್ನಡ (ಗೋಕರ್ಣ)',
    category: 'coastal',
    description: 'Rugged granite headlands, secluded coves (Om, Kudle, Half Moon, Paradise), and the 4th-century Mahabaleshwar Shiva temple overlooking the turquoise Arabian Sea.',
    pinLeft: '24.8%',
    pinTop: '54.5%',
    width: '12%',
    height: '11%',
    attractions: ['Om Beach', 'Kudle Beach', 'Mahabaleshwar Temple', 'Half Moon Beach', 'Paradise Beach', 'Yana Caves', 'Mirjan Fort'],
    imageUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Om Beach & Secluded Granite Cliffs, Gokarna',
    elevation: 'Sea level - 550m (Sahyadri)',
    bestSeason: 'Oct - March',
  },
  {
    id: 'mysuru-talakadu',
    name: 'Mysuru & Chamarajanagar (Talakadu)',
    kannadaName: 'ಮೈಸೂರು - ಚಾಮರಾಜನಗರ (ತಲಕಾಡು)',
    category: 'heritage',
    description: 'Sand-dune buried Hoysala & Ganga shrines along the tranquil Kaveri river basin, where circular wicker coracles glide past centuries of folklore.',
    pinLeft: '59.5%',
    pinTop: '86.2%',
    width: '13%',
    height: '11%',
    attractions: ['Panchalinga Shrines', 'Talakadu Sand Dunes', 'Kaveri Coracle Rides', 'Keerthinarayana Temple', 'Shivanasamudra Falls', 'Somanathapura'],
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Excavated Sand-Buried Sanctums, Talakadu',
    elevation: '720m (Deccan Kaveri Basin)',
    bestSeason: 'Year-Round (Mornings Best)',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru (Transit Hub)',
    kannadaName: 'ಬೆಂಗಳೂರು',
    category: 'transit',
    description: 'Karnataka’s central transport hub. Connects to Talakadu via the 10-lane expressway (2.5 hrs) and Gokarna via coastal overnight trains & express sleepers.',
    pinLeft: '72.8%',
    pinTop: '77.5%',
    width: '9%',
    height: '8%',
    attractions: ['Kempegowda Int. Airport', 'KSR Central Station', 'Mysuru Expressway Corridor', 'Cubbon Park'],
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Bengaluru Gateway & Transit Expressway',
    elevation: '920m',
    bestSeason: 'All Year',
  },
  {
    id: 'shivamogga',
    name: 'Shivamogga (Western Ghats Spine)',
    kannadaName: 'ಶಿವಮೊಗ್ಗ',
    category: 'ghats',
    description: 'Lush rainforest passes, misty Sahyadri valleys, and Jog Falls along the scenic inland corridor connecting Gokarna down to Talakadu.',
    pinLeft: '36.8%',
    pinTop: '64.5%',
    width: '10%',
    height: '9%',
    attractions: ['Jog Falls', 'Agumbe Rainforest', 'Sharavathi Valley', 'Kavaledurga Fort'],
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Misty Western Ghats & Waterfalls, Shivamogga',
    elevation: '640m - 1,340m',
    bestSeason: 'July - Feb',
  },
  {
    id: 'dakshina-kannada',
    name: 'Dakshina Kannada & Udupi',
    kannadaName: 'ದಕ್ಷಿಣ ಕನ್ನಡ ಮತ್ತು ಉಡುಪಿ',
    category: 'coastal',
    description: 'Scenic coastal highway linking Gokarna down to pristine basaltic islands and renowned coastal culinary heritage.',
    pinLeft: '26.0%',
    pinTop: '79.2%',
    width: '9%',
    height: '9%',
    attractions: ['Udupi Krishna Matha', 'Malpe Beach', 'Maravanthe Ocean Highway', 'St. Mary’s Islands'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Maravanthe Ocean Highway & Coastal Seaboard',
    elevation: 'Coastal Belt',
    bestSeason: 'Oct - March',
  },
  {
    id: 'chikkamagaluru',
    name: 'Chikkamagaluru (Coffee Peaks)',
    kannadaName: 'ಚಿಕ್ಕಮಗಳೂರು',
    category: 'ghats',
    description: 'Home of Mullayanagiri, Karnataka’s highest peak, sprawling Arabica coffee estates, and tranquil mountain mist trails.',
    pinLeft: '40.0%',
    pinTop: '72.0%',
    width: '10%',
    height: '8%',
    attractions: ['Mullayanagiri Peak', 'Baba Budangiri', 'Kudremukh National Park', 'Bhadra Reserve'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Highlands & Coffee Slopes, Chikkamagaluru',
    elevation: '1,090m - 1,930m',
    bestSeason: 'Sept - April',
  },
  {
    id: 'kodagu',
    name: 'Kodagu / Coorg (Kaveri Origin)',
    kannadaName: 'ಕೊಡಗು (ಕಾವೇರಿ ಮೂಲ)',
    category: 'ghats',
    description: 'Talakaveri origin of the sacred river that flows eastward into Talakadu. Rolling spice plantations, waterfalls, and mist-wrapped ridges.',
    pinLeft: '38.5%',
    pinTop: '86.0%',
    width: '9%',
    height: '8%',
    attractions: ['Talakaveri Sanctuary', 'Abbey Falls', 'Raja’s Seat', 'Nagarhole Forest'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Talakaveri Source & Coorg Highlands',
    elevation: '900m - 1,750m',
    bestSeason: 'Oct - May',
  },
  {
    id: 'belagavi',
    name: 'Belagavi & Northern Ridges',
    kannadaName: 'ಬೆಳಗಾವಿ',
    category: 'plateau',
    description: 'Historic northern entrance to Karnataka with waterfalls, military forts, and gateway to Goa and coastal Uttara Kannada.',
    pinLeft: '26.0%',
    pinTop: '34.0%',
    width: '12%',
    height: '10%',
    attractions: ['Belgaum Fort', 'Gokak Falls', 'Kamal Basadi Temple'],
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Historic Fortresses & Northern Ridges',
    elevation: '762m',
    bestSeason: 'Winter & Monsoons',
  },
];

// Curated high-resolution destination photos for the map background
const DESTINATION_BACKGROUNDS: Record<string, { image: string; title: string; subtitle: string; tag: string }> = {
  gokarna: {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85',
    title: 'Gokarna Secluded Coastline',
    subtitle: 'Uttara Kannada Seaboard • Arabian Sea Cliffs',
    tag: 'Coastal Sanctuary',
  },
  talakadu: {
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=85',
    title: 'Talakadu River Dunes',
    subtitle: 'Kaveri River Valley • Ancient Hoysala Sanctums',
    tag: 'Living Heritage',
  },
  all: {
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=2400&q=85',
    title: 'Karnataka Dual Heritage Corridor',
    subtitle: 'From Arabian Sea Headlands to Kaveri Sand Shrines',
    tag: '518 km Scenic Highway',
  },
};

export const KarnatakaSatelliteMap: React.FC<KarnatakaSatelliteMapProps> = ({
  currentCircuit,
  onSelectCircuit,
  onExploreLocation,
  onOpenMapsIntel,
}) => {
  // Zoom mode: 'world' | 'macro' | 'gokarna' | 'talakadu'
  const [viewMode, setViewMode] = useState<'world' | 'macro' | 'gokarna' | 'talakadu'>('macro');
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictInfo | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo>(ALL_DISTRICTS[0]);
  const [showRouteAnimation, setShowRouteAnimation] = useState<boolean>(true);
  const [isCinematicZooming, setIsCinematicZooming] = useState<boolean>(false);

  // Synchronize external circuit changes
  useEffect(() => {
    if (currentCircuit === 'gokarna') {
      setViewMode('gokarna');
      setZoomLevel(1.55);
      setSelectedDistrict(ALL_DISTRICTS[0]);
    } else if (currentCircuit === 'talakadu') {
      setViewMode('talakadu');
      setZoomLevel(1.55);
      setSelectedDistrict(ALL_DISTRICTS[1]);
    } else {
      if (viewMode !== 'world') {
        setViewMode('macro');
        setZoomLevel(1.0);
      }
    }
  }, [currentCircuit]);

  // Determine current active place for the background
  const activePlaceKey =
    viewMode === 'gokarna'
      ? 'gokarna'
      : viewMode === 'talakadu'
      ? 'talakadu'
      : currentCircuit === 'gokarna'
      ? 'gokarna'
      : currentCircuit === 'talakadu'
      ? 'talakadu'
      : 'all';

  const currentBg = DESTINATION_BACKGROUNDS[activePlaceKey] || DESTINATION_BACKGROUNDS.all;

  // Handle zoom mode transitions
  const handleModeChange = (mode: 'world' | 'macro' | 'gokarna' | 'talakadu') => {
    setViewMode(mode);
    if (mode === 'world') {
      setZoomLevel(0.4);
    } else if (mode === 'gokarna') {
      setZoomLevel(1.55);
      setSelectedDistrict(ALL_DISTRICTS[0]);
      onSelectCircuit('gokarna');
    } else if (mode === 'talakadu') {
      setZoomLevel(1.55);
      setSelectedDistrict(ALL_DISTRICTS[1]);
      onSelectCircuit('talakadu');
    } else {
      setZoomLevel(1.0);
      onSelectCircuit('all');
    }
  };

  // Cinematic Earth-to-Karnataka zoom trigger
  const runCinematicZoomToKarnataka = () => {
    setIsCinematicZooming(true);
    setViewMode('world');
    setZoomLevel(0.35);

    setTimeout(() => {
      setZoomLevel(0.65);
    }, 600);

    setTimeout(() => {
      setViewMode('macro');
      setZoomLevel(1.0);
      setIsCinematicZooming(false);
    }, 1300);
  };

  const getMapTransformStyle = () => {
    if (viewMode === 'world') {
      return { transform: 'scale(1)', transformOrigin: 'center center' };
    }
    if (zoomLevel === 1.0) {
      return { transform: 'scale(1)', transformOrigin: 'center center' };
    }
    if (viewMode === 'gokarna') {
      return { transform: `scale(${zoomLevel}) translate(16%, -4%)`, transformOrigin: 'center center' };
    }
    if (viewMode === 'talakadu') {
      return { transform: `scale(${zoomLevel}) translate(-9%, -34%)`, transformOrigin: 'center center' };
    }
    return { transform: `scale(${zoomLevel})`, transformOrigin: 'center center' };
  };

  const activeDistrictToShow = hoveredDistrict || selectedDistrict;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl transition-all duration-700 bg-slate-950">
      
      {/* ========================================================
          BACKGROUND IMAGE OF GOKARNA & TALAKADU
          Cross-fade with elegant blur & vignette
         ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentBg.image}
            src={currentBg.image}
            alt={currentBg.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.38, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center filter blur-[1.5px] brightness-[0.6] saturate-[1.15]"
          />
        </AnimatePresence>
        
        {/* iOS Dark Glass Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/85 to-[#0b1324]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070b14]/65 to-[#070b14]" />
      </div>

      {/* Main Content on top of Background */}
      <div className="relative z-10 p-4 sm:p-7 lg:p-8 space-y-6">
        
        {/* ========================================================
            SECTION HEADER & VIEW CONTROLS
           ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sky-500/20 text-sky-300 border border-sky-400/30 backdrop-blur-md">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                Karnataka District Map & World View
              </span>
              <span className="text-zinc-400 text-xs hidden sm:inline">
                Hover over districts to scale up with subtle iOS blue glow
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Interactive Karnataka Corridor
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Experience the 518 km journey from the Arabian Sea cliffs of <span className="text-sky-300 font-medium">Gokarna</span> to the Kaveri river sand-dunes of <span className="text-sky-300 font-medium">Talakadu</span>.
            </p>
          </div>

          {/* iOS View Selector Pills (World -> Karnataka -> Gokarna -> Talakadu) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-lg self-start lg:self-auto">
            <button
              onClick={() => handleModeChange('world')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
                viewMode === 'world'
                  ? 'bg-sky-500 text-white font-semibold shadow-md'
                  : 'text-zinc-300 hover:text-white'
              }`}
              title="View Earth & Subcontinent"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>World Map</span>
            </button>
            <button
              onClick={() => handleModeChange('macro')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-95 ${
                viewMode === 'macro'
                  ? 'bg-white text-slate-900 font-semibold shadow-sm'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              All Karnataka
            </button>
            <button
              onClick={() => handleModeChange('gokarna')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
                viewMode === 'gokarna'
                  ? 'bg-sky-500 text-white font-semibold shadow-md'
                  : 'text-zinc-300 hover:text-sky-300'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Gokarna</span>
            </button>
            <button
              onClick={() => handleModeChange('talakadu')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
                viewMode === 'talakadu'
                  ? 'bg-sky-500 text-white font-semibold shadow-md'
                  : 'text-zinc-300 hover:text-sky-300'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Talakadu</span>
            </button>

            {/* Cinematic Zoom Button */}
            <button
              onClick={runCinematicZoomToKarnataka}
              disabled={isCinematicZooming}
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-medium bg-white/10 hover:bg-white/20 text-sky-200 border border-sky-400/20 transition-all active:scale-90 flex items-center gap-1"
              title="Fly from World to Karnataka"
            >
              <Play className="w-3 h-3 text-sky-400 fill-sky-400" />
              <span className="hidden sm:inline">Fly-In</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            MAP CANVAS & REGION OVERVIEW GRID
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Map Canvas (World View OR Authentic Karnataka District Map) */}
          <div className="lg:col-span-8 relative min-h-[460px] sm:min-h-[580px] rounded-2xl overflow-hidden border border-white/15 bg-slate-950/80 backdrop-blur-xl shadow-2xl flex items-center justify-center select-none group">
            
            {/* Top Bar Indicators */}
            <div className="absolute top-3 left-3 z-30 pointer-events-none flex flex-wrap items-center gap-2 bg-slate-900/90 border border-white/15 px-3 py-1.5 rounded-xl backdrop-blur-md text-xs font-medium text-white shadow-md">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>
                {viewMode === 'world'
                  ? 'Global Satellite Context • Indian Subcontinent'
                  : viewMode === 'gokarna'
                  ? 'Uttara Kannada Coastline • Gokarna'
                  : viewMode === 'talakadu'
                  ? 'Mysuru & Kaveri Basin • Talakadu'
                  : 'Karnataka Official 31 Districts'}
              </span>
            </div>

            {/* iOS Floating Zoom & Reset Dock */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-slate-900/90 border border-white/15 p-1 rounded-xl backdrop-blur-md shadow-lg">
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.4, +(z + 0.2).toFixed(2)))}
                className="p-1.5 rounded-lg hover:bg-white/15 text-zinc-300 hover:text-white transition-colors active:scale-90"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-zinc-300 px-1 font-semibold min-w-8 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.4, +(z - 0.2).toFixed(2)))}
                className="p-1.5 rounded-lg hover:bg-white/15 text-zinc-300 hover:text-white transition-colors active:scale-90"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1.0);
                  setViewMode('macro');
                  onSelectCircuit('all');
                }}
                className="p-1.5 rounded-lg hover:bg-white/15 text-zinc-300 hover:text-white transition-colors active:scale-90 border-l border-white/10 ml-0.5"
                title="Reset View"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ========================================================
                VIEW MODE 1: THE WHOLE WORLD MAP VIEW
                Zooms seamlessly into Karnataka with reticle
               ======================================================== */}
            {viewMode === 'world' ? (
              <div className="relative w-full h-full min-h-[460px] sm:min-h-[580px] flex items-center justify-center p-4 bg-[#030712] overflow-hidden">
                {/* Global World Map Satellite Background */}
                <div className="relative w-full max-w-4xl aspect-[2/1] rounded-2xl overflow-hidden border border-sky-500/20 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1800&q=80"
                    alt="World Earth Globe"
                    className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.1]"
                  />
                  
                  {/* Subtle Grid & Coordinate Overlays */}
                  <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/85" />

                  {/* Pulsing Target on India / Karnataka */}
                  <div
                    className="absolute cursor-pointer z-20 group"
                    style={{ left: '68%', top: '48%', transform: 'translate(-50%, -50%)' }}
                    onClick={() => {
                      setViewMode('macro');
                      setZoomLevel(1.0);
                    }}
                  >
                    <span className="absolute -inset-6 rounded-full bg-sky-400/25 animate-ping" />
                    <span className="absolute -inset-3 rounded-full border-2 border-sky-400/60 animate-pulse" />
                    
                    <div className="relative w-6 h-6 rounded-full bg-sky-500 border-2 border-white shadow-[0_0_20px_#38bdf8] flex items-center justify-center transition-transform group-hover:scale-125">
                      <Compass className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '6s' }} />
                    </div>

                    {/* Reticle Tooltip */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900/95 border border-sky-400/60 p-2.5 rounded-2xl shadow-2xl backdrop-blur-xl group-hover:scale-105 transition-all space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <MapPin className="w-3.5 h-3.5 text-sky-400" />
                        <span>Karnataka, India</span>
                      </div>
                      <div className="text-[10px] text-sky-300 font-mono">14.5° N, 74.3° E • Gokarna & Talakadu</div>
                      <div className="text-[10px] text-zinc-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/20">
                        Click to zoom directly into district map →
                      </div>
                    </div>
                  </div>

                  {/* Floating Action Button at Bottom of World Map */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setViewMode('macro');
                        setZoomLevel(1.0);
                      }}
                      className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all active:scale-95"
                    >
                      <ZoomIn className="w-4 h-4" />
                      <span>Zoom Into Karnataka Districts</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ========================================================
                  VIEW MODE 2: AUTHENTIC KARNATAKA DISTRICT MAP
                  With Hover Scale-Up Effect & Subtle Blue Glow Transition
                 ======================================================== */
              <div 
                className="relative max-w-full max-h-[580px] flex items-center justify-center transition-transform duration-700 ease-out p-3"
                style={getMapTransformStyle()}
              >
                {/* Official Karnataka District Map Image */}
                <div className="relative">
                  <img
                    src="/assets/aistudio/image_55f94387.png"
                    alt="Official Karnataka District Map"
                    className="max-h-[540px] sm:max-h-[560px] w-auto object-contain rounded-xl shadow-2xl filter contrast-[1.03] brightness-[1.01] border border-white/20"
                  />

                  {/* Soft Vignette Overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-sky-950/15 via-transparent to-sky-950/10 pointer-events-none mix-blend-overlay" />

                  {/* SVG Route Arc & Travel Corridor */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 476 645"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <linearGradient id="districtRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                      <filter id="subtleBlueGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.8" />
                      </filter>
                    </defs>

                    {showRouteAnimation && (
                      <g className="transition-opacity duration-500">
                        {/* Shadow Glow Arc */}
                        <path
                          d="M 120 355 Q 175 420 200 480 T 290 558"
                          fill="none"
                          stroke="#0284c7"
                          strokeWidth="6"
                          strokeOpacity="0.3"
                          strokeLinecap="round"
                        />
                        {/* Animated Dashed Pulse Route */}
                        <path
                          d="M 120 355 Q 175 420 200 480 T 290 558"
                          fill="none"
                          stroke="url(#districtRouteGradient)"
                          strokeWidth="3"
                          strokeDasharray="6 6"
                          strokeLinecap="round"
                        />
                        {/* Route Midpoint Badge */}
                        <g transform="translate(185, 455)">
                          <rect x="-35" y="-10" width="70" height="20" rx="6" fill="#0b1329" stroke="#38bdf8" strokeWidth="1" fillOpacity="0.9" />
                          <text x="0" y="3.5" fill="#f0f9ff" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                            518 KM DRIVE
                          </text>
                        </g>
                      </g>
                    )}
                  </svg>

                  {/* ========================================================
                      INTERACTIVE DISTRICT HOTSPOTS
                      Scale-up on Hover with subtle blue glow transition
                     ======================================================== */}
                  {ALL_DISTRICTS.map((dist) => {
                    const isHovered = hoveredDistrict?.id === dist.id;
                    const isSelected = selectedDistrict?.id === dist.id;
                    const isFocus = isHovered || isSelected;

                    return (
                      <div
                        key={dist.id}
                        className="absolute cursor-pointer z-30 group"
                        style={{
                          left: dist.pinLeft,
                          top: dist.pinTop,
                          transform: 'translate(-50%, -50%)',
                        }}
                        onClick={() => {
                          setSelectedDistrict(dist);
                          if (dist.id === 'uttara-kannada') {
                            handleModeChange('gokarna');
                            onExploreLocation('om-beach');
                          } else if (dist.id === 'mysuru-talakadu') {
                            handleModeChange('talakadu');
                            onExploreLocation('panchalinga-talakadu');
                          }
                        }}
                        onMouseEnter={() => setHoveredDistrict(dist)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                      >
                        {/* Subtle Blue Glow Halo (Visible on hover/focus) */}
                        <div
                          className={`absolute -inset-4 rounded-full transition-all duration-300 pointer-events-none ${
                            isFocus
                              ? 'opacity-100 scale-125'
                              : 'opacity-0 scale-90'
                          }`}
                          style={{
                            boxShadow: '0 0 25px 6px rgba(56, 189, 248, 0.65), inset 0 0 12px 2px rgba(56, 189, 248, 0.4)',
                            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
                          }}
                        />

                        {/* Interactive District Scaled Pin Icon */}
                        <div
                          className={`relative rounded-full border-2 border-white shadow-xl flex items-center justify-center transition-all duration-300 ease-out active:scale-95 ${
                            isFocus
                              ? 'w-7 h-7 bg-sky-400 scale-125 ring-4 ring-sky-400/40'
                              : dist.id === 'uttara-kannada' || dist.id === 'mysuru-talakadu'
                              ? 'w-5 h-5 bg-sky-500'
                              : 'w-3.5 h-3.5 bg-sky-600/80'
                          }`}
                        >
                          {dist.id === 'uttara-kannada' ? (
                            <Waves className="w-3.5 h-3.5 text-white" />
                          ) : dist.id === 'mysuru-talakadu' ? (
                            <Landmark className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>

                        {/* Persistent or Hover Label Badge with Blue Glow */}
                        <div
                          className={`absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-xl shadow-2xl backdrop-blur-xl border transition-all duration-300 pointer-events-none ${
                            isFocus
                              ? 'scale-110 bg-slate-900/95 border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.5)] z-40'
                              : dist.id === 'uttara-kannada' || dist.id === 'mysuru-talakadu'
                              ? 'bg-slate-900/85 border-white/20 text-white'
                              : 'opacity-0 group-hover:opacity-100 bg-slate-900/90 border-white/20 text-zinc-200'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold">{dist.name.split(' (')[0]}</span>
                            {dist.id === 'uttara-kannada' && (
                              <span className="text-[10px] text-sky-300 font-medium bg-sky-950/80 px-1 rounded">Gokarna</span>
                            )}
                            {dist.id === 'mysuru-talakadu' && (
                              <span className="text-[10px] text-sky-300 font-medium bg-sky-950/80 px-1 rounded">Talakadu</span>
                            )}
                          </div>
                          {isFocus && (
                            <div className="text-[9px] text-sky-300 font-mono">
                              {dist.attractions.length} attractions • Click to explore
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Route Summary Bar */}
            <div className="absolute bottom-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 border border-white/15 px-3 py-2 rounded-xl backdrop-blur-md shadow-lg text-xs">
              <div className="flex items-center gap-2">
                <Route className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-zinc-300">Corridor:</span>
                <span className="font-semibold text-white">Gokarna ↔ Talakadu</span>
                <span className="text-[10px] text-sky-200 bg-sky-950/80 border border-sky-500/30 px-2 py-0.5 rounded">
                  518 km • Scenic Sahyadri Drive
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRouteAnimation(!showRouteAnimation)}
                  className="text-zinc-400 hover:text-white transition-colors text-[11px]"
                >
                  {showRouteAnimation ? 'Hide Route Arc' : 'Show Route Arc'}
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT: REGIONAL OVERVIEW WITH LOCATION PHOTOGRAPHY
              Displays good images of that place & quick actions
             ======================================================== */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Active Region Highlights Card */}
            <div className="p-4 sm:p-5 rounded-2xl border border-white/15 bg-slate-900/80 backdrop-blur-xl shadow-xl space-y-3.5">
              
              {/* Card Header with District Badge */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider text-sky-300 font-semibold flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-sky-400" />
                  <span>Region Overview</span>
                </span>
                <span className="text-[11px] text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                  {activeDistrictToShow.kannadaName}
                </span>
              </div>

              {/* CURATED HIGH RESOLUTION PHOTO OF THAT PLACE */}
              <div className="relative rounded-xl overflow-hidden border border-white/15 shadow-md aspect-[16/9] group">
                <img
                  src={activeDistrictToShow.imageUrl}
                  alt={activeDistrictToShow.imageCaption}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
                  <span className="font-medium drop-shadow truncate">{activeDistrictToShow.imageCaption}</span>
                  <Camera className="w-3.5 h-3.5 text-sky-300 shrink-0 ml-1" />
                </div>
              </div>

              {/* District Information */}
              <div>
                <h4 className="text-lg font-serif font-bold text-white">{activeDistrictToShow.name}</h4>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed line-clamp-3">
                  {activeDistrictToShow.description}
                </p>
              </div>

              {/* Key Fast Stats Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-zinc-400 block text-[10px]">Elevation</span>
                  <span className="text-sky-300 font-medium truncate block">{activeDistrictToShow.elevation}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-zinc-400 block text-[10px]">Best Season</span>
                  <span className="text-white font-medium truncate block">{activeDistrictToShow.bestSeason}</span>
                </div>
              </div>

              {/* Key Attractions Pills */}
              <div>
                <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wide block mb-1.5">
                  Key Attractions:
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeDistrictToShow.attractions.slice(0, 4).map((att) => (
                    <span
                      key={att}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-zinc-300"
                    >
                      {att}
                    </span>
                  ))}
                  {activeDistrictToShow.attractions.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-sky-950/60 border border-sky-400/30 text-[10px] text-sky-300 font-semibold">
                      +{activeDistrictToShow.attractions.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    if (activeDistrictToShow.id === 'uttara-kannada') onExploreLocation('om-beach');
                    else if (activeDistrictToShow.id === 'mysuru-talakadu') onExploreLocation('panchalinga-talakadu');
                    else onExploreLocation('om-beach');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
                >
                  <span>Explore {activeDistrictToShow.name.split(' (')[0]} Highlights</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenMapsIntel(`${activeDistrictToShow.name} Karnataka`)}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all active:scale-95 text-center border border-white/10"
                >
                  Fetch Live Intel & Coordinates
                </button>
              </div>
            </div>

            {/* Quick Switch Cards: Gokarna vs Talakadu */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  handleModeChange('gokarna');
                  setSelectedDistrict(ALL_DISTRICTS[0]);
                }}
                className={`p-3 rounded-2xl text-left transition-all active:scale-95 border ${
                  viewMode === 'gokarna'
                    ? 'bg-sky-950/70 border-sky-400/80 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-1.5 text-sky-400 text-xs font-semibold">
                  <Waves className="w-3.5 h-3.5" />
                  <span>Coastal</span>
                </div>
                <div className="text-sm font-bold text-white mt-1">Gokarna</div>
                <div className="text-[11px] text-zinc-400">8 Landmarks</div>
              </button>

              <button
                onClick={() => {
                  handleModeChange('talakadu');
                  setSelectedDistrict(ALL_DISTRICTS[1]);
                }}
                className={`p-3 rounded-2xl text-left transition-all active:scale-95 border ${
                  viewMode === 'talakadu'
                    ? 'bg-sky-950/70 border-sky-400/80 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-1.5 text-sky-400 text-xs font-semibold">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Heritage</span>
                </div>
                <div className="text-sm font-bold text-white mt-1">Talakadu</div>
                <div className="text-[11px] text-zinc-400">6 Landmarks</div>
              </button>
            </div>

            {/* District Hubs Directory with interactive hover */}
            <div className="p-3.5 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-400" />
                  <span>Corridor Districts</span>
                </span>
                <span className="text-[10px] text-zinc-400">Hover to highlight</span>
              </div>

              <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1">
                {ALL_DISTRICTS.map((dist) => {
                  const isSelected = selectedDistrict.id === dist.id;
                  return (
                    <button
                      key={dist.id}
                      onClick={() => {
                        setSelectedDistrict(dist);
                        if (dist.id === 'uttara-kannada') handleModeChange('gokarna');
                        else if (dist.id === 'mysuru-talakadu') handleModeChange('talakadu');
                      }}
                      onMouseEnter={() => setHoveredDistrict(dist)}
                      onMouseLeave={() => setHoveredDistrict(null)}
                      className={`w-full p-2 rounded-xl text-left text-xs transition-all flex items-center justify-between border ${
                        isSelected
                          ? 'bg-sky-500/20 border-sky-400/40 text-white font-medium shadow-sm'
                          : 'bg-white/5 border-transparent text-zinc-300 hover:bg-white/10 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span className="truncate">{dist.name}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono ml-2 shrink-0">
                        {dist.attractions.length} spots
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
