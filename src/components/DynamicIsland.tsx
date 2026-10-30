import React, { useState, useEffect } from 'react';
import { 
  Compass, Waves, Landmark, Sparkles, User, Bookmark, MapPin, 
  Calendar, DollarSign, Briefcase, Sun, Moon, Globe, ChevronDown, Check, Menu, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CircuitType, UserSession } from '../types';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../utils/i18n';

interface DynamicIslandProps {
  currentCircuit: CircuitType;
  onSelectCircuit: (circuit: CircuitType) => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  session: UserSession;
  onOpenAuth: () => void;
  onOpenSavedTrips: () => void;
  onSignOut: () => void;
  onOpenMapsIntel: () => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  currentCircuit,
  onSelectCircuit,
  activeSection,
  onNavigateSection,
  session,
  onOpenAuth,
  onOpenSavedTrips,
  onSignOut,
  onOpenMapsIntel,
}) => {
  const { t, theme, toggleTheme, language, setLanguage } = useApp();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCircuitDropdownOpen, setIsCircuitDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const savedCount = (session.savedItineraries?.length || 0) + (session.wishlistHotels?.length || 0);

  const navSections = [
    { id: 'hero', label: t.nav.overview },
    { id: 'destinations', label: 'Wonders' },
    { id: 'map', label: t.nav.map },
    { id: 'itinerary', label: 'Planner' },
    { id: 'budget', label: 'Budget' },
    { id: 'pods', label: 'Pods' },
  ];

  const languages: { code: SupportedLanguage; label: string; nativeName: string; flag: string }[] = [
    { code: 'en', label: 'English', nativeName: 'EN', flag: '🇬🇧' },
    { code: 'kn', label: 'ಕನ್ನಡ', nativeName: 'ಕನ್ನಡ', flag: '🟡' },
    { code: 'hi', label: 'हिन्दी', nativeName: 'हिन्दी', flag: '🇮🇳' },
  ];

  const circuits = [
    { id: 'all' as CircuitType, label: 'All Circuits', icon: Sparkles, color: 'text-sky-500' },
    { id: 'gokarna' as CircuitType, label: 'Gokarna Coast', icon: Waves, color: 'text-cyan-500' },
    { id: 'talakadu' as CircuitType, label: 'Talakadu Basin', icon: Landmark, color: 'text-amber-500' },
  ];

  const currentCircuitObj = circuits.find(c => c.id === currentCircuit) || circuits[0];
  const CurrentCircuitIcon = currentCircuitObj.icon;

  return (
    <header className="fixed top-2 sm:top-3.5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 w-full max-w-6xl ${
          theme === 'light'
            ? 'bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_36px_-10px_rgba(15,23,42,0.1),0_2px_4px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)]'
            : 'bg-slate-950/85 backdrop-blur-2xl border border-white/15 shadow-[0_16px_44px_-10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)]'
        } ${scrolled ? 'scale-[0.99] shadow-xl' : ''}`}
      >
        {/* ========================================================
            ZONE 1: BRAND LOGO & TITLE (Clean & Uncluttered)
           ======================================================== */}
        <button
          onClick={() => onNavigateSection('hero')}
          className="flex items-center gap-2 group text-left transition-transform active:scale-95 shrink-0"
          title="Return to top"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm transition-transform duration-300 group-hover:rotate-45">
            <Compass className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <div 
              style={{ color: '#000000' }}
              className="text-xs font-serif font-bold tracking-wider uppercase leading-none"
            >
              {t.appName}
            </div>
            <div 
              style={{ color: '#09090c' }}
              className="text-[10px] font-sans tracking-tight mt-0.5"
            >
              Gokarna • Talakadu
            </div>
          </div>
        </button>

        {/* Hairline Divider */}
        <div className="hidden xl:block h-4 w-px bg-slate-200 dark:bg-white/10" />

        {/* ========================================================
            ZONE 2: PRIMARY NAVIGATION LINKS (Centered & Spaced)
           ======================================================== */}
        <nav className="hidden md:flex items-center relative p-1 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 text-xs">
          {navSections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onNavigateSection(sec.id)}
                className={`relative z-10 px-3.5 py-1.5 rounded-full font-medium transition-colors text-xs ${
                  isActive
                    ? 'text-white dark:text-slate-950 font-semibold'
                    : 'text-slate-600 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-slate-950 dark:bg-white shadow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span>{sec.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ========================================================
            ZONE 3: UTILITIES & PREFERENCES (Right-Aligned & Grouped)
           ======================================================== */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Circuit Filter Dropdown (Organized as single elegant selector) */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => {
                setIsCircuitDropdownOpen(!isCircuitDropdownOpen);
                setIsLangDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200/80 dark:border-white/15 bg-slate-100/80 dark:bg-slate-900 text-slate-800 dark:text-zinc-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors shadow-sm"
              title="Filter Circuit"
            >
              <CurrentCircuitIcon className={`w-3.5 h-3.5 ${currentCircuitObj.color}`} />
              <span>{currentCircuitObj.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <AnimatePresence>
              {isCircuitDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl py-1.5 z-50 text-xs overflow-hidden"
                  onClick={() => setIsCircuitDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-mono uppercase text-slate-400 dark:text-zinc-500 font-semibold border-b border-slate-100 dark:border-zinc-800 mb-1">
                    Select Circuit Focus
                  </div>
                  {circuits.map((c) => {
                    const Icon = c.icon;
                    return (
                      <button
                        key={c.id}
                        onClick={() => onSelectCircuit(c.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors ${
                          currentCircuit === c.id ? 'font-bold text-slate-950 dark:text-white bg-slate-50 dark:bg-zinc-800/60' : 'text-slate-600 dark:text-zinc-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 ${c.color}`} />
                          <span>{c.label}</span>
                        </div>
                        {currentCircuit === c.id && <Check className="w-3.5 h-3.5 text-slate-950 dark:text-white" />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hairline Divider */}
          <div className="hidden lg:block h-4 w-px bg-slate-200 dark:bg-white/10" />

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangDropdownOpen(!isLangDropdownOpen);
                setIsCircuitDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border border-slate-200/80 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
              title="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
              <span className="text-[11px] font-bold">{languages.find(l => l.code === language)?.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-36 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl py-1.5 z-50 text-xs overflow-hidden"
                  onClick={() => setIsLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-mono uppercase text-slate-400 dark:text-zinc-500 font-semibold border-b border-slate-100 dark:border-zinc-800 mb-1">
                    Language / ಭಾಷೆ
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors ${
                        language === l.code ? 'font-bold text-slate-950 dark:text-white bg-slate-50 dark:bg-zinc-800/60' : 'text-slate-600 dark:text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </div>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-slate-950 dark:text-white" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200/80 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm active:scale-90"
            title={theme === 'light' ? t.theme.dark : t.theme.light}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5 text-slate-700" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-300" />
            )}
          </button>

          {/* Saved Trips Bookmark */}
          <button
            onClick={onOpenSavedTrips}
            className="relative flex items-center justify-center w-8 h-8 rounded-full border border-slate-200/80 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm active:scale-90"
            title={t.nav.saved}
          >
            <Bookmark className="w-3.5 h-3.5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm animate-pulse">
                {savedCount}
              </span>
            )}
          </button>

          {/* User Sign In / Profile */}
          <button
            onClick={onOpenAuth}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200/80 dark:border-white/15 bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 transition-opacity shadow-sm active:scale-95"
          >
            <User className="w-3 h-3" />
            <span className="truncate max-w-[75px]">
              {session.isLoggedIn ? (session.user?.displayName || 'Explorer') : t.nav.signIn}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-slate-200/80 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-zinc-200 active:scale-90 transition-transform"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>
      </motion.div>

      {/* Mobile Slide-Down Sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed inset-x-3 top-16 z-50 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-2xl md:hidden flex flex-col gap-3.5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Navigation
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                The Lost Horizon
              </span>
            </div>

            {/* Mobile Nav Links */}
            <div className="grid grid-cols-2 gap-2">
              {navSections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      onNavigateSection(sec.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center p-2.5 rounded-2xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-zinc-200'
                    }`}
                  >
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Circuit filter row on mobile */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-500 font-medium text-[11px]">Filter Circuit:</span>
              <div className="flex gap-1.5">
                {circuits.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCircuit(c.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      currentCircuit === c.id
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-zinc-300'
                    }`}
                  >
                    {c.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* User profile action */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {session.isLoggedIn ? session.user?.displayName : 'Guest Explorer'}
              </span>
              <button
                onClick={() => {
                  onOpenAuth();
                  setIsMobileMenuOpen(false);
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-950 text-white dark:bg-white dark:text-slate-950"
              >
                {session.isLoggedIn ? t.nav.saved : t.nav.signIn}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
