import React from 'react';
import { 
  Landmark, Waves, MapPin, Compass, ArrowRight, ShieldCheck, 
  Calendar, Ship, Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScrollReveal } from '../components/ScrollReveal';

export const TalakaduPage: React.FC = () => {
  const { t, navigateToPage } = useApp();

  const shrines = [
    {
      name: 'Vaidyeshwara Temple (ವೈದ್ಯೇಶ್ವರ)',
      era: '14th Century Chola & Hoysala',
      feature: 'Chief temple of the Panchalinga circuit with magnificent granite carvings',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      description: 'The monumental epicenter of Talakadu. Houses Lord Vaidyanatheshwara (the Divine Healer). Features colossal dvarapalas (guardians) carved out of single monolithic stone pillars and ornate Hoysala stone lathe work.',
    },
    {
      name: 'Keerthinarayana Temple (ಕೀರ್ತಿನಾರಾಯಣ)',
      era: '1117 AD Hoysala Dynasty',
      feature: 'Built by King Vishnuvardhana after conquering Talakadu from the Cholas',
      image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80',
      description: 'An architectural marvel unearthed from beneath 30 feet of river silt and sand. Features an imposing 9-foot idol of Lord Narayana standing upon a lotus pedestal with Garuda and celestial dancers.',
    },
    {
      name: 'Pataleshwara Temple (ಪಾತಾಳೇಶ್ವರ)',
      era: '8th Century Western Ganga',
      feature: 'Subterranean lingam that changes hue from red at dawn to white at noon',
      image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
      description: 'Situated inside a deep sand depression reached by a steep stairway. One of the oldest recorded shrines of the Western Ganga dynasty, where the Shivalinga displays mysterious optical shifts across the day.',
    },
    {
      name: 'Somanathapura Keshava Temple (ಸೋಮನಾಥಪುರ)',
      era: '1268 AD UNESCO World Heritage',
      feature: 'Tripartite stellate (16-point star) soapstone jewel',
      image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80',
      description: 'Located 28 km upstream along the Kaveri, this Hoysala apex marvel features 3 sanctums and friezes depicting caparisoned elephants, cavalry, mythical makaras, and the entire Ramayana and Mahabharata.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors pt-20">
      
      {/* Hero Header */}
      <section className="relative py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">
            <Landmark className="w-4 h-4" />
            <span>Southern Kaveri Basin Circuit • Mysuru & Chamarajanagar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 dark:text-white mb-4">
            {t.talakadu.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
            {t.talakadu.heroDesc}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-zinc-500" />
              Panchalinga Mahotsava once every 12 years
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-zinc-500" />
              Ganga, Chola, Hoysala & Vijayanagara Eras
            </span>
            <span className="flex items-center gap-1.5">
              <Ship className="w-4 h-4 text-zinc-500" />
              Kaveri River Coracle Sanctuary
            </span>
          </div>
        </div>
      </section>

      {/* The Famous Curse of Alamelamma */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <ScrollReveal direction="up">
          <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              Historical Mystery & Folklore
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 dark:text-white mb-4">
              {t.talakadu.curseTitle}
            </h2>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 font-serif italic text-zinc-800 dark:text-zinc-200 text-base mb-4 border-l-2 border-zinc-950 dark:border-white">
              "Talakadu maralagi, Malangi maduvagi, Mysooru doregalaige makkalagalade hogali"
            </div>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {t.talakadu.curseDesc}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Shrines of Talakadu */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 dark:text-white mb-2">
            The Sand-Buried Sanctums & Hoysala Masterpieces
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Archaeological marvels recovered from the river dunes along the banks of the sacred Kaveri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shrines.map((shrine, idx) => (
            <ScrollReveal key={shrine.name} direction="up" delay={idx * 0.1}>
              <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col h-full">
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={shrine.image}
                    alt={shrine.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-sm text-white text-[11px] font-mono">
                    {shrine.era}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-zinc-950 dark:text-white mb-1">
                      {shrine.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 mb-3">
                      {shrine.feature}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {shrine.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-zinc-950 dark:text-white">
                    <button
                      onClick={() => navigateToPage('map')}
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Pinpoint on District Map</span>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Kaveri Coracle Experience */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              River Exploration
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 dark:text-white mb-4">
              {t.talakadu.coracleTitle}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              {t.talakadu.coracleDesc}
            </p>
            <div className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                <span>Traditional hand-woven bamboo hull lined with waterproof resin</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                <span>Gentle circular 360° spin over serene Kaveri sand shoals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                <span>Life jackets provided; sunrise runs (06:30 - 08:30) optimal for birdwatching</span>
              </div>
            </div>

            <button
              onClick={() => navigateToPage('planner')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Add Coracle Ride to Itinerary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full md:w-80 h-64 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
              alt="River waters"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
};
