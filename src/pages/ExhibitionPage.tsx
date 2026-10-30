import React, { useState } from 'react';
import { 
  Presentation, Play, ChevronLeft, ChevronRight, Copy, Check, 
  Sparkles, Waves, Landmark, ShieldCheck, MapPin, Compass, 
  HelpCircle, Volume2, Maximize2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScrollReveal } from '../components/ScrollReveal';

export const ExhibitionPage: React.FC = () => {
  const { t, navigateToPage } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const slides = [
    {
      title: 'The Lost Horizon: Project Introduction',
      subtitle: 'The Thesis & Dual Regional Dichotomy',
      tag: 'SLIDE 1 OF 5',
      image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
      keyPoints: [
        'Problem: Mainstream tourism treats Karnataka as just Bengaluru or Hampi, overlooking its most astonishing geological and cultural contrasts.',
        'Solution: A curated digital gateway connecting two opposite geographical poles: the jagged coastal granite cliffs of Gokarna and the sand-buried river temples of Talakadu.',
        'Architecture: Built with responsive spatial mapping, multilingual i18n (English, Kannada, Hindi), real-time budget forecasting, and an immersive monochrome design.',
      ],
      verbalCue: 'Good morning/afternoon everyone. Welcome to "The Lost Horizon". Our project explores Karnataka through a lens rarely seen: a direct dialogue between two contrasting extremes of nature and history—the salty cliffs of Gokarna on the Arabian Sea, and the sand-drowned temples of Talakadu on the Kaveri river.',
    },
    {
      title: 'Spotlight on Gokarna: The Geography & 5 Beaches',
      subtitle: 'Where the Sahyadri Mountains Plunge into the Arabian Sea',
      tag: 'SLIDE 2 OF 5',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      keyPoints: [
        'Geological Wonder: The Western Ghats run right into the ocean, creating a sequence of 5 crescent coves separated by rugged red laterite headlands.',
        'Om Beach: Naturally carved in the silhouette of the sacred Sanskrit syllable ॐ, dividing the bay into twin semicircular calm lagoons.',
        'The Cliff Trek: An 8.5 km continuous trek connecting Gokarna Main Beach, Kudle, Om, Half Moon, and Paradise Beach without roads.',
      ],
      verbalCue: 'Here is what makes Gokarna extraordinary. Geographically, it is one of the rare places in India where the Western Ghats mountain range meets the Arabian Sea directly. This creates five crescent beaches linked by clifftop trails rather than highway traffic. Notice Om Beach—it is naturally carved in the shape of the sacred symbol Om, which you can clearly observe from satellite imagery.',
    },
    {
      title: 'Gokarna Sacred Lore: The Atmalinga & Ravana',
      subtitle: 'The 4th-Century Kadamba Spiritual Heritage',
      tag: 'SLIDE 3 OF 5',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      keyPoints: [
        'Atmalinga Myth: Ravana was carrying Lord Shiva’s all-powerful Atmalinga to Lanka with the rule that it must never touch the ground. Lord Ganesha disguised himself as a cowherd and placed it here at sunset.',
        'The Name "Go-Karna": Means "Ear of the Cow"—the shape of the landmass where the sacred river Gangavali and Aghanashini meet.',
        'Living Agrahara: Unlike abandoned ruins, Gokarna retains unbroken 1,600-year-old Vedic chants, Kotitirtha ablutions, and Dravidian stone architecture.',
      ],
      verbalCue: 'Spiritually, Gokarna is revered alongside Varanasi. The legend tells us Ravana acquired the sacred Atmalinga from Mount Kailash under the rule never to place it on earth. Ganesha, disguised as a young cowherd, outwitted Ravana right here at sunset. When Ravana tried to yank it free, it rooted permanently into the rock, giving birth to the 4th-century Mahabaleshwar temple.',
    },
    {
      title: 'The Contrast: Talakadu Sand-Buried Sanctums',
      subtitle: 'The 1610 AD Curse of Alamelamma & Panchalinga',
      tag: 'SLIDE 4 OF 5',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      keyPoints: [
        'Geological Anomaly: Over 30 historic stone temples lie submerged under rolling sand dunes next to the Kaveri River, an environment usually found in deserts.',
        'The Curse of Alamelamma: In 1610 AD, the Queen of Srirangapatna leapt into the Kaveri after uttering the curse: "May Talakadu turn to sand; may Malangi turn to a whirlpool; may Mysore kings bear no direct heirs."',
        'Excavated Wonders: Shrines like Vaidyeshwara and Keerthinarayana have been carefully dug out by archaeologists from beneath 30 feet of river sand.',
      ],
      verbalCue: 'To contrast Gokarna’s sea cliffs, our website takes the visitor 500 km southeast to Talakadu. Here, an inexplicable natural anomaly exists: over thirty ancient temples buried beneath towering river sand dunes. For centuries, this was attributed to the famous 1610 curse of Queen Alamelamma. Visitors ride traditional circular wicker coracles on the Kaveri to explore these excavated sanctums.',
    },
    {
      title: 'Interactive System Architecture & Live Capabilities',
      subtitle: 'Modern Web Engineering for Cultural Preservation',
      tag: 'SLIDE 5 OF 5',
      image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80',
      keyPoints: [
        'Trilingual Translation: Instant UI & narrative translation between English, ಕನ್ನಡ Kannada, and हिन्दी Hindi.',
        'Focused District Cartography: Subtle minimalist secondary districts with highlighted beacons for Gokarna and Talakadu.',
        'Bespoke Planning Engine: Dynamic transit budgets, multi-day itinerary generation, and local stay curations.',
      ],
      verbalCue: 'Our platform is engineered as a production-grade web application. It features a complete trilingual translation engine in English, Kannada, and Hindi, a focused district map that eliminates cognitive clutter, and an automated travel budget estimator. Now, let me demonstrate live how a visitor seamlessly explores both destinations.',
    },
  ];

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors pt-20">
      
      {/* Header Banner */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-[11px] font-mono uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white animate-pulse" />
              {t.exhibition.badge}
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-zinc-950 dark:text-white">
              {t.exhibition.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
              {t.exhibition.desc}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateToPage('gokarna')}
              className="px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold hover:bg-zinc-100 text-zinc-800 dark:text-zinc-200"
            >
              Go to Gokarna Page
            </button>
            <button
              onClick={() => navigateToPage('map')}
              className="px-4 py-2 rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90"
            >
              Show District Map
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Exhibition Slide Deck */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
          
          {/* Deck Top Bar */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Presentation className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-zinc-700 dark:text-zinc-300 uppercase">
                {currentSlide.tag}
              </span>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                disabled={currentSlideIndex === 0}
                className="p-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-30 hover:bg-zinc-100"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-xs font-mono px-2 text-zinc-600 dark:text-zinc-400">
                {currentSlideIndex + 1} / {slides.length}
              </div>

              <button
                onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                disabled={currentSlideIndex === slides.length - 1}
                className="p-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-30 hover:bg-zinc-100"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slide Visual & Key Points */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-6 h-64 lg:h-96 relative overflow-hidden bg-zinc-950">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <span className="text-white text-xs font-mono bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
                  Exhibition Visual Asset
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-950 dark:text-white mb-1">
                  {currentSlide.title}
                </h2>
                <p className="text-xs font-mono text-zinc-500 mb-6">
                  {currentSlide.subtitle}
                </p>

                <div className="space-y-3 mb-6">
                  {currentSlide.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress indicator */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                <span>Slide {currentSlideIndex + 1} of {slides.length}</span>
                <div className="flex gap-1">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlideIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentSlideIndex 
                          ? 'bg-zinc-950 dark:bg-white w-6' 
                          : 'bg-zinc-300 dark:bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Speaker Notes Verbal Script */}
          <div className="p-6 bg-zinc-50 dark:bg-zinc-800/40 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500">
                <Volume2 className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span>{t.exhibition.speakerNotes} (Read This Aloud to Visitors)</span>
              </div>
              <button
                onClick={() => copyToClipboard(currentSlide.verbalCue, `slide-${currentSlideIndex}`)}
                className="flex items-center gap-1 text-xs font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                title="Copy Verbal Script"
              >
                {copiedSection === `slide-${currentSlideIndex}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 italic font-sans leading-relaxed bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
              "{currentSlide.verbalCue}"
            </p>
          </div>

        </div>
      </section>

      {/* Comprehensive Gokarna Exhibition Guide Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-12 text-center">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-zinc-950 dark:text-white mb-3">
              {t.exhibition.gokarnaDeepDiveTitle}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Follow this 4-step narrative blueprint at your booth to make your presentation memorable and authoritative.
            </p>
          </div>

          {/* 4 Pillars of Gokarna */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <div className="text-xs font-mono uppercase text-zinc-400 mb-1">PILLAR 1 • THE GEOGRAPHY</div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">
                The Cow's Ear & 5 Crescent Beaches
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                <strong>What to say:</strong> "Notice the name <em>Go-Karna</em> literally translates to 'Cow's Ear'. The geographical landmass curls between two river mouths—Gangavali and Aghanashini—creating a natural ear-shaped peninsula. Its 5 secluded beaches (Main, Kudle, Om, Half Moon, Paradise) are linked by an 8.5 km cliff trail where no cars can go."
              </p>
              <div className="text-[11px] font-mono text-zinc-500 bg-zinc-50 dark:bg-zinc-800 p-2.5 rounded-lg">
                Key Visual to Show: Show Om Beach on the District Map or photo.
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <div className="text-xs font-mono uppercase text-zinc-400 mb-1">PILLAR 2 • THE LEGEND</div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">
                Ravana & The Atmalinga Origin
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                <strong>What to say:</strong> "Visitors love a compelling story. Tell them how Ravana earned Shiva’s supreme Atmalinga through fierce penance. The condition was he could never set it on the ground. At sunset here, Ganesha tricked Ravana into handing it over, placing it into the bedrock. This is why the 4th-century Mahabaleshwar temple was built around this rooted lingam."
              </p>
              <div className="text-[11px] font-mono text-zinc-500 bg-zinc-50 dark:bg-zinc-800 p-2.5 rounded-lg">
                Key Visual to Show: Mahabaleshwar Temple & Kotitirtha tank.
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <div className="text-xs font-mono uppercase text-zinc-400 mb-1">PILLAR 3 • THE DUALITY</div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">
                Ancient Vedic Sanctum meets Bohemian Haven
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                <strong>What to say:</strong> "Gokarna’s unique charm is its peaceful coexistence. On one hand, you have 1,600-year-old Vedic agrahara traditions with priests chanting in Sanskrit. Just across the hillock at Kudle and Om beaches, you have international travelers enjoying acoustic sunset circles, yoga, and fresh coconut water in complete harmony."
              </p>
              <div className="text-[11px] font-mono text-zinc-500 bg-zinc-50 dark:bg-zinc-800 p-2.5 rounded-lg">
                Key Visual to Show: Kudle sunset and Om Beach cliff.
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <div className="text-xs font-mono uppercase text-zinc-400 mb-1">PILLAR 4 • THE CONTRAST</div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">
                Why Bridge Gokarna with Talakadu?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                <strong>What to say:</strong> "Most travel portals show disconnected lists. Our website bridges the two most poetic mysteries of Karnataka: Gokarna where rock and water triumph, and Talakadu where wind and river sand bury 30 temples under dunes. It gives travelers a complete 5-day cultural arc across the state."
              </p>
              <div className="text-[11px] font-mono text-zinc-500 bg-zinc-50 dark:bg-zinc-800 p-2.5 rounded-lg">
                Key Visual to Show: The Itinerary Generator tab.
              </div>
            </div>

          </div>

          {/* Frequently Asked Questions by Judges / Visitors */}
          <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-zinc-950 dark:text-white mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-zinc-500" />
              <span>Questions Judges or Visitors Will Ask You (and How to Answer)</span>
            </h3>

            <div className="space-y-6 text-xs sm:text-sm">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="font-bold text-zinc-950 dark:text-white mb-1">
                  Q1: "Why did you build this website?"
                </div>
                <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  <strong>Answer:</strong> "We wanted to solve cultural fragmentation in travel. Karnataka has incredible heritage that goes unnoticed. By connecting the dramatic coast of Gokarna with the sand mystery of Talakadu, we created an educational and practical expedition tool that inspires sustainable tourism."
                </div>
              </div>

              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="font-bold text-zinc-950 dark:text-white mb-1">
                  Q2: "What is unique about the design and tech stack?"
                </div>
                <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  <strong>Answer:</strong> "Instead of cluttered generic templates, we used an architectural monochrome design with high typographic contrast. We implemented full multilingual support in English, Kannada, and Hindi so locals and tourists alike can connect with the stories. It also features client-side route tabs, an interactive satellite map, and budget forecasting."
                </div>
              </div>

              <div>
                <div className="font-bold text-zinc-950 dark:text-white mb-1">
                  Q3: "Can a tourist actually use this to plan a trip right now?"
                </div>
                <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  <strong>Answer:</strong> "Yes! The 'Planner & Budget' page dynamically generates customizable day-by-day itineraries with real transit options (overnight trains, KSRTC sleeper buses), realistic per-person cost calculations in INR, hotel recommendations, and packing lists."
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
