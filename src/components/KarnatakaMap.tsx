import React, { useState } from 'react';
import { Compass, Eye, ShieldCheck, Waves, Mountain, Landmark, Navigation2, ArrowRight } from 'lucide-react';
import { CircuitType } from '../types';

interface KarnatakaMapProps {
  currentCircuit: CircuitType;
  onSelectCircuit: (circuit: CircuitType) => void;
  onExploreLocation: (locationId: string) => void;
}

export const KarnatakaMap: React.FC<KarnatakaMapProps> = ({
  currentCircuit,
  onSelectCircuit,
  onExploreLocation,
}) => {
  const [hoveredPin, setHoveredPin] = useState<'gokarna' | 'talakadu' | null>(null);
  const [mapZoom, setMapZoom] = useState<'macro' | 'gokarna' | 'talakadu'>('macro');

  // SVG viewBox configurations
  const viewBoxes = {
    macro: '0 0 520 720',
    gokarna: '40 220 220 220',
    talakadu: '180 520 240 200',
  };

  const handleFocus = (focus: 'macro' | 'gokarna' | 'talakadu') => {
    setMapZoom(focus);
    if (focus === 'gokarna') onSelectCircuit('gokarna');
    else if (focus === 'talakadu') onSelectCircuit('talakadu');
    else onSelectCircuit('all');
  };

  return (
    <div className="relative w-full rounded-3xl border border-white/10 bg-[#071310]/80 backdrop-blur-2xl p-4 sm:p-8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Background ambient radial glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Controls & Telemetry HUD */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Interactive Cartography
            </span>
            <span className="text-zinc-400 text-xs font-mono">• WGS-84 Dual Vector Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 tracking-tight">
            Karnataka Geographic Dashboard
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mt-1">
            Traverse 518 km from the jagged laterite sea cliffs of <strong className="text-emerald-400 font-medium">Gokarna</strong> on the Arabian Sea to the mysterious windblown sand dunes and ancient Hoysala shrines of <strong className="text-amber-400 font-medium">Talakadu</strong> on the Kaveri.
          </p>
        </div>

        {/* Viewport switch controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/50 border border-white/10 self-stretch md:self-auto justify-center">
          <button
            onClick={() => handleFocus('macro')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${
              mapZoom === 'macro'
                ? 'bg-white/15 text-white shadow-inner border border-white/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Karnataka
          </button>
          <button
            onClick={() => handleFocus('gokarna')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
              mapZoom === 'gokarna'
                ? 'bg-emerald-500 text-black font-semibold shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                : 'text-zinc-400 hover:text-emerald-300'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Zoom Gokarna
          </button>
          <button
            onClick={() => handleFocus('talakadu')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
              mapZoom === 'talakadu'
                ? 'bg-amber-400 text-black font-semibold shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'text-zinc-400 hover:text-amber-300'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Zoom Talakadu
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative mt-6 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Vector SVG Map Container */}
        <div className="relative w-full lg:w-3/5 h-[420px] sm:h-[500px] flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 p-2 overflow-hidden">
          {/* Compass Rose */}
          <div className="absolute top-4 right-4 z-20 flex flex-col items-center bg-[#0c1c19]/90 border border-white/10 px-2.5 py-2 rounded-xl backdrop-blur-md shadow-lg pointer-events-none">
            <Compass className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] font-mono font-bold text-zinc-300 mt-0.5">N</span>
          </div>

          {/* Map Coordinates Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* SVG Canvas */}
          <svg
            viewBox={viewBoxes[mapZoom]}
            className="w-full h-full max-h-[480px] object-contain transition-all duration-700 ease-out"
          >
            <defs>
              {/* Karnataka Terrain Gradient */}
              <linearGradient id="karnatakaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d2923" />
                <stop offset="50%" stopColor="#091b17" />
                <stop offset="100%" stopColor="#12251a" />
              </linearGradient>

              {/* Arabian Sea Shimmer */}
              <linearGradient id="arabianSea" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#0a2a2c" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#041214" stopOpacity="0.1" />
              </linearGradient>

              {/* Coastal emerald glow */}
              <radialGradient id="emeraldGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#040908" stopOpacity="0" />
              </radialGradient>

              {/* Dune amber glow */}
              <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#040908" stopOpacity="0" />
              </radialGradient>

              {/* Radar Pulse Keyframe Filter Effect */}
              <filter id="glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-amber" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Arabian Sea Body (Western Coast) */}
            <path
              d="M 0,0 L 160,0 L 120,220 L 80,310 L 95,430 L 130,550 L 0,550 Z"
              fill="url(#arabianSea)"
              opacity="0.45"
            />
            {/* Water label */}
            <text x="30" y="320" fill="#2dd4bf" opacity="0.3" fontSize="12" fontFamily="monospace" transform="rotate(-75 30 320)">
              ARABIAN SEA (Laccadive Sea)
            </text>

            {/* Main Karnataka State Vector Boundary */}
            {/* Realistic stylized polygon capturing Bidar in NE, Belagavi/Goa border, Karwar-Gokarna-Mangalore coast, Kodagu/Western Ghats, Mysuru/Talakadu southern tip, Chamarajanagar, and eastern Kolar/Ballari frontier */}
            <path
              d="M 330,25 
                 C 345,20 375,45 365,70 
                 C 355,90 395,115 410,145 
                 C 425,175 410,210 395,230 
                 C 380,250 405,290 390,320 
                 C 375,350 415,390 400,430 
                 C 385,465 415,500 390,530 
                 C 370,555 350,580 340,610 
                 C 330,640 310,670 280,685 
                 C 255,700 230,695 210,670 
                 C 195,650 170,640 155,615 
                 C 140,590 130,550 120,520 
                 C 105,480 95,440 85,400 
                 C 75,355 70,330 75,300 
                 C 80,265 95,240 110,210 
                 C 125,180 145,150 160,120 
                 C 175,90 205,75 240,65 
                 C 275,55 310,35 330,25 Z"
              fill="url(#karnatakaGradient)"
              stroke="#34d399"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              className="drop-shadow-[0_0_20px_rgba(52,211,153,0.15)]"
            />

            {/* Western Ghats Mountain Ridge Texture Line */}
            <path
              d="M 120,200 Q 110,260 98,310 T 115,440 T 150,560 T 180,630"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeOpacity="0.3"
            />

            {/* Sacred Kaveri River Course */}
            {/* Winding from Talakaveri (Kodagu) through Mysuru, Srirangapatna, Talakadu, and Shivanasamudra out toward Tamil Nadu */}
            <path
              d="M 160,590 
                 Q 190,595 215,610 
                 T 245,630 
                 T 270,650 
                 T 305,645 
                 T 350,660"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeOpacity="0.75"
              strokeLinecap="round"
            />
            {/* Kaveri River Label */}
            <text x="220" y="618" fill="#38bdf8" opacity="0.65" fontSize="10" fontFamily="sans-serif" fontStyle="italic">
              Kaveri River ~~~~
            </text>

            {/* Connectivity Transit Arc (Gokarna to Talakadu) */}
            <path
              d="M 85,310 Q 140,480 270,650"
              fill="none"
              stroke="#c084fc"
              strokeWidth="1.8"
              strokeDasharray="6 6"
              strokeOpacity={currentCircuit === 'combined' || currentCircuit === 'all' ? 0.7 : 0.25}
              className="animate-pulse"
            />

            {/* Major Landmark Geographic Nodes */}
            {/* Bengaluru */}
            <g transform="translate(320, 560)">
              <circle r="3" fill="#a1a1aa" opacity="0.7" />
              <text x="8" y="3" fill="#d4d4d8" fontSize="9" fontFamily="monospace">
                Bengaluru (Capital)
              </text>
            </g>

            {/* Mysuru */}
            <g transform="translate(230, 635)">
              <circle r="2.5" fill="#a1a1aa" opacity="0.7" />
              <text x="-48" y="3" fill="#d4d4d8" fontSize="9" fontFamily="monospace">
                Mysuru
              </text>
            </g>

            {/* Hampi / Vijayanagara */}
            <g transform="translate(260, 290)">
              <circle r="2.5" fill="#a1a1aa" opacity="0.6" />
              <text x="7" y="3" fill="#71717a" fontSize="8" fontFamily="monospace">
                Hampi
              </text>
            </g>

            {/* ========================================================
                RADAR PIN 1: GOKARNA (North-West Coast, Uttara Kannada)
               ======================================================== */}
            <g
              transform="translate(85, 310)"
              className="cursor-pointer group"
              onClick={() => {
                handleFocus('gokarna');
                onExploreLocation('om-beach');
              }}
              onMouseEnter={() => setHoveredPin('gokarna')}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* Dual-ring Pulsing Radar Animation */}
              <circle r="26" fill="url(#emeraldGlow)" opacity="0.4" />
              <circle
                r="18"
                fill="none"
                stroke="#34d399"
                strokeWidth="1.5"
                strokeOpacity="0.6"
                className="animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"
              />
              <circle
                r="10"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeOpacity="0.8"
                className="animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_1.2s]"
              />
              {/* Solid Pin Anchor */}
              <circle
                r="5.5"
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth="2"
                filter="url(#glow-emerald)"
                className="transition-transform group-hover:scale-125"
              />

              {/* Pin Banner */}
              <g transform="translate(14, -6)">
                <rect
                  x="0"
                  y="-12"
                  width="85"
                  height="22"
                  rx="6"
                  fill="#0c231f"
                  stroke="#34d399"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />
                <text x="6" y="2" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  ⚓ GOKARNA
                </text>
              </g>
            </g>

            {/* ========================================================
                RADAR PIN 2: TALAKADU (Southern Kaveri Basin, Mysuru)
               ======================================================== */}
            <g
              transform="translate(270, 650)"
              className="cursor-pointer group"
              onClick={() => {
                handleFocus('talakadu');
                onExploreLocation('panchalinga-talakadu');
              }}
              onMouseEnter={() => setHoveredPin('talakadu')}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* Dual-ring Pulsing Amber Radar Animation */}
              <circle r="26" fill="url(#amberGlow)" opacity="0.4" />
              <circle
                r="18"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeOpacity="0.6"
                className="animate-[ping_2.8s_cubic-bezier(0,0,0.2,1)_infinite]"
              />
              <circle
                r="10"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeOpacity="0.8"
                className="animate-[ping_2.8s_cubic-bezier(0,0,0.2,1)_infinite_1.4s]"
              />
              {/* Solid Pin Anchor */}
              <circle
                r="5.5"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="2"
                filter="url(#glow-amber)"
                className="transition-transform group-hover:scale-125"
              />

              {/* Pin Banner */}
              <g transform="translate(14, -6)">
                <rect
                  x="0"
                  y="-12"
                  width="85"
                  height="22"
                  rx="6"
                  fill="#231b0c"
                  stroke="#fbbf24"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />
                <text x="6" y="2" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  🏛️ TALAKADU
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Dynamic Telemetry & Dual Wonder Comparison HUD */}
        <div className="w-full lg:w-2/5 flex flex-col gap-4">
          {/* Quick Hub Telemetry Card */}
          <div className="p-5 rounded-2xl border border-white/10 bg-[#0c1c19]/90 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Navigation2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">
                  Active Radar Coordinates
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                {hoveredPin === 'gokarna'
                  ? '14.524° N, 74.316° E'
                  : hoveredPin === 'talakadu'
                  ? '12.189° N, 77.032° E'
                  : '518 km Dual Corridor'}
              </span>
            </div>

            {/* Live Contextual Preview */}
            <div className="mt-4">
              {hoveredPin === 'gokarna' || mapZoom === 'gokarna' || currentCircuit === 'gokarna' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif font-bold text-emerald-300">
                      Gokarna • Uttara Kannada Coast
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Arabian Sea Cliffs
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Sacred granite headlands shaped into the divine Devanagari ॐ. Home to the 4th-century Mahabaleshwar Atmalinga, bioluminescent waters, and the rugged 5-beach cliff trek.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                    <div className="text-zinc-400">
                      Terrain: <span className="text-emerald-300 font-medium">Granite & Laterite</span>
                    </div>
                    <div className="text-zinc-400">
                      Key Highlights: <span className="text-emerald-300 font-medium">Om, Kudle, Yana</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onExploreLocation('om-beach')}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                  >
                    Launch Gokarna Deep-Dive Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : hoveredPin === 'talakadu' || mapZoom === 'talakadu' || currentCircuit === 'talakadu' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif font-bold text-amber-300">
                      Talakadu • Southern Kaveri Basin
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Sand Dunes & River Coracles
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    An archaeological wonder where 30+ Ganga & Hoysala stone temples lie submerged under windblown river dunes along the Kaveri bend, steeped in the legendary 1610 curse.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                    <div className="text-zinc-400">
                      Terrain: <span className="text-amber-300 font-medium">River Dunes & Soapstone</span>
                    </div>
                    <div className="text-zinc-400">
                      Key Highlights: <span className="text-amber-300 font-medium">Panchalinga, Coracles</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onExploreLocation('panchalinga-talakadu')}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                  >
                    Launch Talakadu Deep-Dive Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif font-bold text-white">
                      The Dual Heritage Corridor
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      Full Circuit
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Click either radar pin or use the quick buttons below to experience Karnataka's stark geographical contrast: cliff-bound ocean sunsets vs riverbank sand-buried mysteries.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleFocus('gokarna')}
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium text-center transition-all active:scale-95"
                    >
                      Focus Gokarna
                    </button>
                    <button
                      onClick={() => handleFocus('talakadu')}
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-medium text-center transition-all active:scale-95"
                    >
                      Focus Talakadu
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Dual Metric Strips */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                <Waves className="w-4 h-4" />
                <span>Coast & Spires</span>
              </div>
              <div className="text-lg font-serif font-bold text-white mt-1">Gokarna</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">5 Beaches • Yana Caves • Atmalinga</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-medium">
                <Landmark className="w-4 h-4" />
                <span>Sands & Rivers</span>
              </div>
              <div className="text-lg font-serif font-bold text-white mt-1">Talakadu</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Panchalinga • Coracles • Falls</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
