import React from 'react';
import { 
  Waves, Landmark, ArrowRight, Compass, MapPin, Calendar, 
  Presentation, Sparkles, Shield, ChevronRight, Mountain 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScrollReveal } from '../components/ScrollReveal';

export const OverviewPage: React.FC = () => {
  const { t, navigateToPage } = useApp();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        
        {/* Crisp monochrome background texture */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=2000&q=80"
            alt="Gokarna coastline cliffs"
            className="w-full h-full object-cover opacity-15 dark:opacity-20 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/95 to-white dark:from-zinc-950/80 dark:via-zinc-950/95 dark:to-zinc-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <ScrollReveal direction="down" delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-xs font-mono tracking-widest uppercase text-zinc-700 dark:text-zinc-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white animate-pulse" />
              {t.hero.badge}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.08] mb-6">
              {t.hero.titleLine1}
              <span className="block text-2xl sm:text-4xl md:text-5xl font-light text-zinc-600 dark:text-zinc-400 mt-2">
                {t.hero.titleLine2}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-10">
              {t.hero.subtitle}
            </p>
          </ScrollReveal>

          {/* Key Navigation CTA Buttons */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigateToPage('gokarna')}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium text-sm hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                <Waves className="w-4 h-4" />
                <span>{t.hero.exploreGokarna}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => navigateToPage('talakadu')}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-medium text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
              >
                <Landmark className="w-4 h-4" />
                <span>{t.hero.exploreTalakadu}</span>
              </button>

              <button
                onClick={() => navigateToPage('exhibition')}
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95 transition-all"
              >
                <Presentation className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span>{t.hero.exhibitionMode}</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Stats Ribbon */}
          <ScrollReveal direction="up" delay={0.25} className="w-full mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-left">
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
                <div className="text-xl font-bold font-serif text-zinc-950 dark:text-white">
                  {t.hero.statsCircuits}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {t.hero.statsCircuitsDesc}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
                <div className="text-xl font-bold font-serif text-zinc-950 dark:text-white">
                  {t.hero.statsDistance}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {t.hero.statsDistanceDesc}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
                <div className="text-xl font-bold font-serif text-zinc-950 dark:text-white">
                  {t.hero.statsHeritage}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {t.hero.statsHeritageDesc}
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* The Two Poles: Side by Side Showcase */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-zinc-950 dark:text-white mb-3">
              The Dual Poles of Karnataka
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
              A study in contrasts: high-saline Arabian breakers and sea cliffs versus quiet river currents and sand-buried sanctums.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Gokarna Card */}
          <ScrollReveal direction="right" delay={0.1}>
            <div 
              onClick={() => navigateToPage('gokarna')}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80"
                  alt="Gokarna Om Beach"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-white text-xs font-mono flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5" />
                  <span>Western Seaboard</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-zinc-950 dark:text-white mb-2">
                  {t.circuits.gokarnaTitle}
                </h3>
                <p className="text-xs uppercase font-mono text-zinc-500 mb-3">
                  {t.circuits.gokarnaSubtitle}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                  {t.circuits.gokarnaDesc}
                </p>
                <div className="flex items-center text-xs font-semibold text-zinc-950 dark:text-white group-hover:translate-x-1 transition-transform">
                  <span>{t.circuits.viewDeepDive}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Talakadu Card */}
          <ScrollReveal direction="left" delay={0.15}>
            <div 
              onClick={() => navigateToPage('talakadu')}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
                  alt="Talakadu Temple"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-white text-xs font-mono flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Southern Kaveri Basin</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-zinc-950 dark:text-white mb-2">
                  {t.circuits.talakaduTitle}
                </h3>
                <p className="text-xs uppercase font-mono text-zinc-500 mb-3">
                  {t.circuits.talakaduSubtitle}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                  {t.circuits.talakaduDesc}
                </p>
                <div className="flex items-center text-xs font-semibold text-zinc-950 dark:text-white group-hover:translate-x-1 transition-transform">
                  <span>{t.circuits.viewDeepDive}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Feature Gateway Pods */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-serif font-bold text-zinc-950 dark:text-white mb-2">
              Explore the Tooling Suite
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Interactive resources built for tourists, scholars, and exhibition visitors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div 
              onClick={() => navigateToPage('map')}
              className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-950 dark:text-white mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-zinc-950 dark:text-white mb-1">
                {t.nav.map}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Full-state satellite map with quiet minimal secondary districts and prominent focus on Gokarna & Talakadu.
              </p>
              <span className="text-xs font-semibold text-zinc-950 dark:text-white inline-flex items-center gap-1">
                Launch Map <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div 
              onClick={() => navigateToPage('planner')}
              className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-950 dark:text-white mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-zinc-950 dark:text-white mb-1">
                {t.nav.planner}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Interactive day-by-day scheduler, realistic transit cost estimator, and essential packing checklists.
              </p>
              <span className="text-xs font-semibold text-zinc-950 dark:text-white inline-flex items-center gap-1">
                Plan Expedition <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div 
              onClick={() => navigateToPage('exhibition')}
              className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-950 dark:text-white mb-4 group-hover:scale-110 transition-transform">
                <Presentation className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-zinc-950 dark:text-white mb-1">
                {t.nav.exhibition}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Step-by-step speaker script and interactive demo guide to present this website and Gokarna at your exhibition.
              </p>
              <span className="text-xs font-semibold text-zinc-950 dark:text-white inline-flex items-center gap-1">
                Open Exhibition Suite <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
