import React, { useState } from 'react';
import { 
  Waves, MapPin, Compass, Sparkles, ArrowRight, ShieldCheck, 
  Calendar, Sunset, Mountain, Clock, ChevronRight, Eye 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScrollReveal } from '../components/ScrollReveal';

export const GokarnaPage: React.FC = () => {
  const { t, navigateToPage } = useApp();
  const [activeBeachIndex, setActiveBeachIndex] = useState(0);

  const beaches = [
    {
      name: 'Om Beach (ಓಂ ಬೀಚ್)',
      shape: 'Naturally shaped like the sacred Sanskrit syllable ॐ',
      vibe: 'Iconic, cafe culture, sunset cliff views',
      image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
      description: 'The defining crescent of Gokarna, where two semicircular bays meet at a jagged rocky outcrop, resembling the auspicious Om symbol. Popular for water sports, beachside shacks (Namaste Cafe), and evening tide pools.',
      keyPoints: ['Twin crescent bays', 'Namaste Cafe overlook', 'Dolphin sightings at 06:30', 'Speedboat rides to Half Moon'],
    },
    {
      name: 'Kudle Beach (ಕುಡ್ಲೆ ಬೀಚ್)',
      shape: 'Broad kilometer-long golden sand crescent',
      vibe: 'Bohemian, backpacker hub, sunset drum circles',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      description: 'Nestled between steep granite hillocks, Kudle is reached by a short hike down from the main road. Known for gentle evening surf, candlelit beach dinners, and expansive ocean horizons.',
      keyPoints: ['Gentle swimming waters', 'Sunset acoustic music sessions', 'Scenic hill path access', 'Laid-back flea market vibe'],
    },
    {
      name: 'Half Moon Beach (ಹಾಫ್ ಮೂನ್ ಬೀಚ್)',
      shape: 'Secluded crescent cove guarded by cliffs',
      vibe: 'Intimate, uncrowded, raw coastal nature',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
      description: 'Inaccessible by paved roads, Half Moon is reached exclusively via the cliff trek over the headlands from Om Beach or by local fishing boat. A sanctuary for quiet swimming and reading.',
      keyPoints: ['Trek-only or boat access', 'No road traffic or vehicles', 'Pristine turquoise water', 'Cozy cliffside huts'],
    },
    {
      name: 'Paradise Beach (ಪ್ಯಾರಡೈಸ್ ಬೀಚ್)',
      shape: 'Raw, rocky cove fringed with coconut palms',
      vibe: 'Off-grid wilderness, star gazing',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      description: 'Also known as Full Moon Beach, this southern-most beach is 70% rock and 30% white sand. A serene paradise where fresh water freshwater springs trickle down from the cliffs into the sea.',
      keyPoints: ['Southernmost trek terminus', 'Freshwater natural well', 'Bioluminescence on moonless nights', 'Rugged boulder formations'],
    },
    {
      name: 'Gokarna Main Beach (ಗೋಕರ್ಣ ಮುಖ್ಯ ಬೀಚ್)',
      shape: 'Endless open coastline adjoining the holy town',
      vibe: 'Pilgrimage rituals, sacred sea baths, long walks',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      description: 'The ceremonial shore where pilgrims take a holy dip in the Arabian Sea before proceeding barefoot through the agrahara streets to the Mahabaleshwar Temple.',
      keyPoints: ['Adjoins holy Mahabaleshwar agrahara', 'Holy pre-temple sea bath tradition', 'Traditional wooden chariot processions', 'Magnificent morning horizon'],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors pt-20">
      
      {/* Hero Header */}
      <section className="relative py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">
            <Waves className="w-4 h-4" />
            <span>Western Seaboard Circuit • Uttara Kannada</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 dark:text-white mb-4">
            {t.gokarna.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
            {t.gokarna.heroDesc}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-zinc-500" />
              {t.gokarna.bestSeason}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-zinc-500" />
              4th Century Kadamba Heritage
            </span>
            <span className="flex items-center gap-1.5">
              <Mountain className="w-4 h-4 text-zinc-500" />
              Sahyadri Meets Arabian Sea
            </span>
          </div>
        </div>
      </section>

      {/* The Mythological Legend of the Atmalinga */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <ScrollReveal direction="up">
          <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              Sacred Heritage & Lore
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 dark:text-white mb-4">
              {t.gokarna.legendTitle}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              {t.gokarna.legendDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60">
                <span className="font-bold text-zinc-950 dark:text-white block mb-1">
                  Kotitirtha Sacred Tank
                </span>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A rectangular 6-acre freshwater tank in the heart of town where holy priests and travelers perform ablutions before temple entry.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60">
                <span className="font-bold text-zinc-950 dark:text-white block mb-1">
                  Maha Ganapati Temple
                </span>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Dedicated to the 5-year-old cowherd boy incarnation of Ganesha, featuring a 1.3-meter black granite idol bearing a dent from Ravana's frustration.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Interactive 5-Beach Explorer */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <ScrollReveal direction="up">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 dark:text-white mb-2">
              {t.gokarna.beachesTitle}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {t.gokarna.beachesDesc}
            </p>
          </div>
        </ScrollReveal>

        {/* Beach Selector Pills */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-6 no-scrollbar">
          {beaches.map((beach, index) => (
            <button
              key={beach.name}
              onClick={() => setActiveBeachIndex(index)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeBeachIndex === index
                  ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-md'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {beach.name.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Selected Beach Showcase Card */}
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative h-72 lg:h-96">
              <img
                src={beaches[activeBeachIndex].image}
                alt={beaches[activeBeachIndex].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-white text-xs font-mono">
                {beaches[activeBeachIndex].vibe}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold text-zinc-950 dark:text-white mb-2">
                  {beaches[activeBeachIndex].name}
                </h3>
                <p className="text-xs font-mono text-zinc-500 mb-4">
                  {beaches[activeBeachIndex].shape}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                  {beaches[activeBeachIndex].description}
                </p>

                <div className="space-y-2 mb-6">
                  {beaches[activeBeachIndex].keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-zinc-100 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <button
                  onClick={() => navigateToPage('map')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950 dark:text-white hover:underline"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Locate on District Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coastal Cliff Trekking Guide */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 dark:text-white mb-2">
                {t.gokarna.cliffTrek}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                {t.gokarna.cliffTrekDesc}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs font-mono text-zinc-400 mb-1">LEG 1 • 2.0 KM</div>
              <h4 className="text-base font-bold text-zinc-950 dark:text-white mb-2">Gokarna to Kudle</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Climb the southern cliff steps behind Rama Temple. Sweeping panoramas of the town beach before descending into Kudle valley.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs font-mono text-zinc-400 mb-1">LEG 2 • 1.5 KM</div>
              <h4 className="text-base font-bold text-zinc-950 dark:text-white mb-2">Kudle to Om Beach</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Ascend a breezy plateau trail past flowering shrubs. Descend into the left ear of Om Beach near Namaste Cafe.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs font-mono text-zinc-400 mb-1">LEG 3 • 2.5 KM</div>
              <h4 className="text-base font-bold text-zinc-950 dark:text-white mb-2">Om to Half Moon</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The rugged stretch: narrow dirt paths contouring jagged ocean cliffs. Sturdy footwear recommended.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs font-mono text-zinc-400 mb-1">LEG 4 • 2.5 KM</div>
              <h4 className="text-base font-bold text-zinc-950 dark:text-white mb-2">Half Moon to Paradise</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Forest and boulder hopping trail ending at the pristine seclusion of Paradise Beach. Water available at spring.
              </p>
            </div>
          </div>

          {/* Exhibition Quick Link */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigateToPage('exhibition')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <span>View Exhibition Presentation Notes for Gokarna</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
