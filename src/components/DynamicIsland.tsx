import React from 'react';
import { Compass, Sparkles, User, Bookmark, MapPin, LogOut, Waves, Landmark, Navigation } from 'lucide-react';
import { CircuitType, UserSession } from '../types';

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
  const savedCount = (session.savedItineraries?.length || 0) + (session.wishlistHotels?.length || 0);

  return (
    <header className="fixed top-2.5 sm:top-3 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none">
      <div
        className="pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-4 px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/15 bg-slate-950/85 backdrop-blur-2xl shadow-2xl w-[98%] max-w-4xl transition-all duration-300"
        style={{
          boxShadow: '0 16px 36px -6px rgba(0, 0, 0, 0.75), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Brand & Region Indicator */}
        <button
          onClick={() => onNavigateSection('hero')}
          className="flex items-center gap-1.5 sm:gap-2 text-left group transition-transform active:scale-95 shrink-0"
          title="Return to top"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-serif font-bold tracking-wide uppercase text-white">
              The Lost Horizon
            </div>
            <div className="text-[10px] text-zinc-400 font-sans flex items-center gap-1">
              <span>Karnataka Travel Curator</span>
            </div>
          </div>
        </button>

        {/* Native iOS Segmented Control */}
        <div className="flex items-center bg-black/50 rounded-full p-0.5 sm:p-1 border border-white/10 text-[11px] sm:text-xs font-medium">
          <button
            onClick={() => {
              onSelectCircuit('all');
              onNavigateSection('map');
            }}
            className={`px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 active:scale-95 ${
              currentCircuit === 'all'
                ? 'bg-white text-slate-900 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span className="hidden sm:inline">Karnataka</span>
            <span className="sm:hidden">All</span>
          </button>
          <button
            onClick={() => {
              onSelectCircuit('gokarna');
              onNavigateSection('destinations');
            }}
            className={`px-2 sm:px-3 py-1 rounded-full transition-all duration-200 active:scale-95 flex items-center gap-1 ${
              currentCircuit === 'gokarna'
                ? 'bg-sky-500 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-sky-300'
            }`}
          >
            <Waves className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Gokarna</span>
          </button>
          <button
            onClick={() => {
              onSelectCircuit('talakadu');
              onNavigateSection('destinations');
            }}
            className={`px-2 sm:px-3 py-1 rounded-full transition-all duration-200 active:scale-95 flex items-center gap-1 ${
              currentCircuit === 'talakadu'
                ? 'bg-sky-500 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-sky-300'
            }`}
          >
            <Landmark className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Talakadu</span>
          </button>
        </div>

        {/* Action Triggers: Transit Info, Itinerary, Saved, Auth */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Live Transit & Distances */}
          <button
            onClick={onOpenMapsIntel}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/15 hover:bg-white/20 transition-all active:scale-95 shadow-sm"
            title="Transit & Distance Intel"
          >
            <Navigation className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden lg:inline">Intel</span>
          </button>

          {/* Journey Planner Trigger */}
          <button
            onClick={() => onNavigateSection('itinerary')}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/15 hover:bg-white/20 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>Plan</span>
          </button>

          {/* Saved Trips & Wishlist */}
          <button
            onClick={onOpenSavedTrips}
            className="relative p-1.5 sm:p-2 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all active:scale-95"
            title="Saved Trips & Wishlist"
            aria-label="View Saved Trips and Wishlist"
          >
            <Bookmark className="w-3.5 h-3.5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-sky-500 text-white text-[10px] font-bold shadow-sm">
                {savedCount}
              </span>
            )}
          </button>

          {/* User Auth State */}
          {session.isLoggedIn && session.user ? (
            <div className="flex items-center gap-1 sm:gap-1.5 pl-1 border-l border-white/15">
              <button
                onClick={onOpenSavedTrips}
                className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 border border-white/15 hover:border-white/30 transition-all active:scale-95 text-xs text-white"
                title={`Logged in as ${session.user.displayName}`}
              >
                <img
                  src={session.user.avatarUrl}
                  alt={session.user.displayName}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover ring-1 ring-white/30"
                />
                <span className="max-w-[50px] sm:max-w-[80px] truncate font-medium hidden xs:inline">
                  {session.user.displayName.split(' ')[0]}
                </span>
              </button>
              <button
                onClick={onSignOut}
                className="p-1 sm:p-1.5 rounded-full text-zinc-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-900 hover:bg-zinc-100 transition-all active:scale-95 shadow-md"
            >
              <User className="w-3.5 h-3.5 text-slate-900" />
              <span className="hidden xs:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
