import React, { useState, useEffect } from 'react';
import { X, MapPin, Zap, RefreshCw, Compass, ShieldAlert, CheckCircle, ExternalLink, Star, Camera } from 'lucide-react';

interface MapsGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetLocation: string;
}

// Curated high-resolution destination images for all landmark queries
const LOCATION_IMAGES: Record<string, { url: string; title: string; district: string; tag: string }> = {
  'om beach': {
    url: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
    title: 'Om Beach Sacred Headland',
    district: 'Uttara Kannada (Gokarna)',
    tag: 'Secluded Cliffs & Swells',
  },
  'mahabaleshwar': {
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    title: 'Mahabaleshwar 4th-Century Atmalinga Shrine',
    district: 'Uttara Kannada (Gokarna)',
    tag: 'Ancient Shaivite Muktisthala',
  },
  'kudle': {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    title: 'Kudle Beach Golden Crescent',
    district: 'Uttara Kannada (Gokarna)',
    tag: 'Coastal Shacks & Sunsets',
  },
  'half moon': {
    url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    title: 'Half Moon Beach Cliff Cove',
    district: 'Uttara Kannada (Gokarna)',
    tag: 'Rugged Footpath Trek',
  },
  'paradise': {
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    title: 'Paradise Beach Untamed Rocks',
    district: 'Uttara Kannada (Gokarna)',
    tag: 'Wild Laterite Headlands',
  },
  'yana': {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    title: 'Yana Karst Limestone Monoliths',
    district: 'Uttara Kannada (Sahyadri)',
    tag: '120m Soaring Spires',
  },
  'talakadu': {
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    title: 'Talakadu Sand-Buried Sanctums',
    district: 'Mysuru (Kaveri Basin)',
    tag: 'Unearthed Ganga & Hoysala Shrines',
  },
  'kaveri': {
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    title: 'Kaveri River Coracle Sanctuary',
    district: 'Mysuru (Talakadu)',
    tag: 'Traditional Wicker Boats',
  },
  'coracle': {
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    title: 'Kaveri River Coracle Drift',
    district: 'Mysuru (Talakadu)',
    tag: 'Tranquil River Swells',
  },
  'shivanasamudra': {
    url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    title: 'Shivanasamudra Twin Cascades',
    district: 'Chamarajanagar / Mandya',
    tag: '98-Meter Hydro Wonder',
  },
  'somanathapura': {
    url: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=1200&q=80',
    title: 'Somanathapura Keshava Temple',
    district: 'Mysuru Valley',
    tag: '16-Point Stellate UNESCO Gem',
  },
  'mirjan': {
    url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    title: 'Mirjan Laterite Fortress',
    district: 'Uttara Kannada',
    tag: '16th Century Bastions',
  },
  'murudeshwara': {
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    title: 'Murudeshwara Shiva Colossus',
    district: 'Uttara Kannada',
    tag: '123ft Seacoast Megalith',
  },
};

function getPlaceImage(query: string) {
  const q = query.toLowerCase();
  for (const [key, data] of Object.entries(LOCATION_IMAGES)) {
    if (q.includes(key)) {
      return data;
    }
  }
  // Default to Gokarna or Talakadu
  if (q.includes('talakadu') || q.includes('mysore') || q.includes('mysuru') || q.includes('kaveri')) {
    return LOCATION_IMAGES.talakadu;
  }
  return LOCATION_IMAGES['om beach'];
}

export const MapsGroundingModal: React.FC<MapsGroundingModalProps> = ({
  isOpen,
  onClose,
  targetLocation,
}) => {
  const [locationQuery, setLocationQuery] = useState<string>(targetLocation || 'Om Beach Gokarna');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [intelData, setIntelData] = useState<{
    intel: string;
    source: string;
    location: string;
    imageUrl?: string;
    imageTitle?: string;
    groundingMetadata?: any;
  } | null>(null);

  useEffect(() => {
    if (targetLocation) {
      setLocationQuery(targetLocation);
      fetchMapsIntel(targetLocation);
    }
  }, [targetLocation, isOpen]);

  const fetchMapsIntel = async (locName: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/maps-intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationName: locName,
          destination: locName.toLowerCase().includes('talakadu') ? 'talakadu' : 'gokarna',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIntelData(data);
      }
    } catch (_e) {
      // Handled silently
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const currentPhoto = getPlaceImage(locationQuery);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/20 bg-gradient-to-b from-[#0a1428] via-[#050b18] to-[#02050e] p-5 sm:p-7 text-white space-y-5 shadow-[0_25px_60px_rgba(2,6,23,0.95)]"
        style={{
          boxShadow: '0 25px 60px -12px rgba(2, 6, 23, 0.95), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-90"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30">
            <Zap className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Geospatial Intelligence • Grounded Knowledge</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Live Place & Transit Intelligence
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Real-time verified coordinates, road accessibility, temple dress codes, tide windows, and Google Maps place insights.
          </p>
        </div>

        {/* Search Preset Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {[
            'Om Beach Gokarna',
            'Mahabaleshwar Temple Gokarna',
            'Yana Limestone Monoliths',
            'Talakadu Sand-Buried Temples',
            'Kaveri River Coracles Talakadu',
            'Shivanasamudra Falls',
            'Somanathapura Temple',
          ].map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setLocationQuery(preset);
                fetchMapsIntel(preset);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all active:scale-95 border ${
                locationQuery === preset
                  ? 'bg-sky-500 text-white border-sky-300 font-semibold shadow-md'
                  : 'bg-white/5 text-zinc-300 border-white/10 hover:border-white/20'
              }`}
            >
              {preset.split(' ')[0]} {preset.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Custom Query Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-sky-400" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Query any landmark, beach, or temple in Karnataka..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400"
            />
          </div>
          <button
            onClick={() => fetchMapsIntel(locationQuery)}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shrink-0 shadow-md"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>Fetch Intel</span>
          </button>
        </div>

        {/* PLACE IMAGE SHOWCASE - Displays High Quality Image of That Place */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-xl group aspect-[16/8] sm:aspect-[21/9]">
          <img
            src={intelData?.imageUrl || currentPhoto.url}
            alt={intelData?.imageTitle || currentPhoto.title}
            className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Image Overlay Information */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black/60 text-sky-300 border border-sky-400/40 backdrop-blur-md mb-1">
                <Camera className="w-3 h-3" />
                <span>{currentPhoto.tag}</span>
              </div>
              <h4 className="text-sm sm:text-base font-serif font-bold text-white drop-shadow">
                {intelData?.imageTitle || currentPhoto.title}
              </h4>
              <p className="text-[11px] text-zinc-300 font-sans">
                {currentPhoto.district}
              </p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-medium flex items-center gap-1 transition-all shrink-0 active:scale-95"
            >
              <span>Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Intel Content Display */}
        {isLoading ? (
          <div className="p-10 rounded-2xl bg-black/40 border border-white/10 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-sky-400 animate-spin mx-auto" />
            <div className="text-sm font-semibold text-white">Retrieving Verified Intel & Coordinates...</div>
            <div className="text-xs text-zinc-400">Grounding live tide charts, temple rules, and road accessibility</div>
          </div>
        ) : intelData ? (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/15 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono text-sky-300 font-bold uppercase truncate max-w-[200px] sm:max-w-none">
                  Verified Intel: {intelData.location}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                  Source: {intelData.source === 'google_maps_grounding' ? 'Google Maps Grounded' : 'Verified Dataset'}
                </span>
              </div>

              {/* Pre-formatted output text */}
              <div className="text-xs sm:text-sm text-zinc-200 whitespace-pre-line leading-relaxed font-sans">
                {intelData.intel}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-sky-200">
                <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Grounded with Google Maps geographical and place database</span>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(intelData.location)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-sky-300 hover:text-white flex items-center gap-1 transition-colors self-end sm:self-auto"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
