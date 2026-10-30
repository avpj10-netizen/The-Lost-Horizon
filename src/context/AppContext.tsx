import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { SupportedLanguage, translations, Translations } from '../utils/i18n';
import { CircuitType, UserSession, GeneratedItinerary } from '../types';
import { DEFAULT_PACKING_ITEMS } from '../data/packingChecklist';

export type AppPage = 'overview' | 'gokarna' | 'talakadu' | 'map' | 'planner' | 'exhibition';
export type AppTheme = 'light' | 'dark';

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  currentPage: AppPage;
  navigateToPage: (page: AppPage) => void;
  currentCircuit: CircuitType;
  setCurrentCircuit: (circuit: CircuitType) => void;
  session: UserSession;
  handleSignIn: (userData: { displayName: string; email: string; avatarUrl: string; tier?: any }) => void;
  handleSignOut: () => void;
  handleSaveItinerary: (itinerary: GeneratedItinerary) => void;
  handleToggleWishlistHotel: (hotelId: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalInitialTab: 'auth' | 'saved';
  setAuthModalInitialTab: (tab: 'auth' | 'saved') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SESSION_KEY = 'the_lost_horizon_session_v3';
const THEME_KEY = 'the_lost_horizon_theme_v1';
const LANG_KEY = 'the_lost_horizon_lang_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: defaults to 'light' per user's explicit request
  const [theme, setThemeState] = useState<AppTheme>(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {
      // ignore
    }
    return 'light'; // Default to pure crisp monochrome light theme
  });

  // Language state: defaults to 'en'
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored === 'en' || stored === 'kn' || stored === 'hi') return stored;
    } catch {
      // ignore
    }
    return 'en';
  });

  // Page navigation state based on URL hash
  const getPageFromHash = (): AppPage => {
    const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
    if (hash === 'gokarna') return 'gokarna';
    if (hash === 'talakadu') return 'talakadu';
    if (hash === 'map') return 'map';
    if (hash === 'planner') return 'planner';
    if (hash === 'exhibition') return 'exhibition';
    return 'overview';
  };

  const [currentPage, setCurrentPage] = useState<AppPage>(getPageFromHash);
  const [currentCircuit, setCurrentCircuit] = useState<CircuitType>('all');

  // User session state
  const [session, setSession] = useState<UserSession>(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return {
      isLoggedIn: false,
      user: null,
      savedItineraries: [],
      wishlistHotels: ['zostel-gokarna', 'talakadu-jaladhama-resort'],
      customPackingItems: DEFAULT_PACKING_ITEMS,
    };
  });

  // Modal controls
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'auth' | 'saved'>('auth');

  // Sync theme changes to HTML document class and storage
  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch {}
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  // Sync language changes
  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {}
  };

  // Sync URL hash with page state
  const navigateToPage = (page: AppPage) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getPageFromHash();
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync session changes
  useEffect(() => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {}
  }, [session]);

  const handleSignIn = (userData: { displayName: string; email: string; avatarUrl: string; tier?: any }) => {
    setSession((prev) => ({
      ...prev,
      isLoggedIn: true,
      user: {
        id: `usr-${Date.now()}`,
        displayName: userData.displayName,
        email: userData.email,
        avatarUrl: userData.avatarUrl,
        membershipTier: userData.tier || 'Explorer',
        memberSince: 'October 2026',
      },
    }));
  };

  const handleSignOut = () => {
    setSession((prev) => ({
      ...prev,
      isLoggedIn: false,
      user: null,
    }));
  };

  const handleSaveItinerary = (itinerary: GeneratedItinerary) => {
    setSession((prev) => {
      const existing = prev.savedItineraries || [];
      const alreadySaved = existing.some((it) => it.id === itinerary.id);
      if (alreadySaved) return prev;
      return {
        ...prev,
        savedItineraries: [itinerary, ...existing],
      };
    });
  };

  const handleToggleWishlistHotel = (hotelId: string) => {
    setSession((prev) => {
      const current = prev.wishlistHotels || [];
      const exists = current.includes(hotelId);
      return {
        ...prev,
        wishlistHotels: exists ? current.filter((id) => id !== hotelId) : [...current, hotelId],
      };
    });
  };

  const t = useMemo(() => translations[language], [language]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        toggleTheme,
        currentPage,
        navigateToPage,
        currentCircuit,
        setCurrentCircuit,
        session,
        handleSignIn,
        handleSignOut,
        handleSaveItinerary,
        handleToggleWishlistHotel,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalInitialTab,
        setAuthModalInitialTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
