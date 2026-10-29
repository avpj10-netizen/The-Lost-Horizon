import React, { useState } from 'react';
import { UserSession, GeneratedItinerary } from '../types';
import { HOTELS_DATA } from '../data/hotels';
import { User, LogIn, UserPlus, X, Trash2, Bookmark, Check, ShieldCheck, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { formatINR } from '../utils/budgetCalculator';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: UserSession;
  onSignIn: (userData: { displayName: string; email: string; avatarUrl: string; tier?: any }) => void;
  onSignOut: () => void;
  onDeleteItinerary: (itineraryId: string) => void;
  onRemoveWishlistHotel: (hotelId: string) => void;
  initialTab?: 'auth' | 'saved';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  session,
  onSignIn,
  onSignOut,
  onDeleteItinerary,
  onRemoveWishlistHotel,
  initialTab = 'auth',
}) => {
  const [tab, setTab] = useState<'auth' | 'saved'>(initialTab);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  // Input states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onSignIn({
      displayName: name.trim(),
      email: email.trim(),
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      tier: 'Explorer',
    });
    onClose();
  };

  const handleDemoSignIn = (profile: 'maya' | 'aditya') => {
    if (profile === 'maya') {
      onSignIn({
        displayName: 'Maya Rao',
        email: 'maya.rao@expeditions.in',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        tier: 'Cliff Nomad',
      });
    } else {
      onSignIn({
        displayName: 'Dr. Aditya Hegde',
        email: 'aditya.hegde@karnatakahistory.org',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        tier: 'Heritage Patron',
      });
    }
    onClose();
  };

  const wishlistedHotelObjects = HOTELS_DATA.filter((h) =>
    session.wishlistHotels.includes(h.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-gradient-to-b from-[#0a1936] to-[#040a1c] p-6 sm:p-8 shadow-[0_25px_60px_rgba(2,6,23,0.95)] text-white space-y-6"
        style={{
          boxShadow: '0 25px 60px -12px rgba(2, 6, 23, 0.95), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Navigation Tabs (iOS Segmented Control) */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setTab('auth')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              tab === 'auth'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {session.isLoggedIn ? 'Traveler Profile' : 'Member Access'}
          </button>
          <button
            onClick={() => setTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              tab === 'saved'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Portfolio</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {(session.savedItineraries?.length || 0) + (session.wishlistHotels?.length || 0)}
            </span>
          </button>
        </div>

        {/* TAB 1: AUTHENTICATION / PROFILE */}
        {tab === 'auth' && (
          <div className="space-y-6">
            {session.isLoggedIn && session.user ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <img
                    src={session.user.avatarUrl}
                    alt={session.user.displayName}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-400 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-serif font-bold text-white">
                        {session.user.displayName}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                        {session.user.membershipTier}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 font-mono mt-0.5">{session.user.email}</p>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Member since: {session.user.memberSince} • Token Synchronized
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-xs text-blue-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    Your personalized itineraries, budget calculations, and packing checklists are encrypted and cached in your browser.
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      onSignOut();
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-semibold transition-all active:scale-95"
                  >
                    Sign Out Safely
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-semibold transition-all active:scale-95"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {authMode === 'signin' ? 'Welcome Back, Traveler' : 'Join The Lost Horizon'}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Save bespoke AI blueprints, synchronize custom packing items, and bookmark cliff & river retreats.
                  </p>
                </div>

                {/* Instant 1-Click Demo Profiles */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300 font-semibold block">
                    ⚡ Instant 1-Click Explorer Sessions
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDemoSignIn('maya')}
                      className="p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-left transition-all active:scale-95 flex items-center gap-3"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                        alt="Maya"
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-cyan-400"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">Maya Rao</div>
                        <div className="text-[10px] text-cyan-300 font-mono">Coastal Trekker</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleDemoSignIn('aditya')}
                      className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left transition-all active:scale-95 flex items-center gap-3"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                        alt="Aditya"
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-amber-400"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">Dr. Aditya Hegde</div>
                        <div className="text-[10px] text-amber-300 font-mono">Heritage Scholar</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Custom Credentials Form */}
                <form onSubmit={handleCustomSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-300 font-medium">Display Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohith Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-300 font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="traveler@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
                  >
                    {authMode === 'signin' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    <span>{authMode === 'signin' ? 'Sign In' : 'Create Free Account'}</span>
                  </button>
                </form>

                <div className="text-center">
                  <button
                    onClick={() => setAuthMode(authMode === 'signin' ? 'register' : 'signin')}
                    className="text-xs text-zinc-400 hover:text-cyan-300 transition-colors"
                  >
                    {authMode === 'signin'
                      ? 'New traveler? Register a portfolio'
                      : 'Already have an account? Sign in'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED PORTFOLIO */}
        {tab === 'saved' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                Saved AI Itineraries ({session.savedItineraries?.length || 0})
              </h4>
              {(!session.savedItineraries || session.savedItineraries.length === 0) ? (
                <div className="p-6 rounded-2xl bg-black/50 border border-white/10 text-center text-xs text-zinc-400">
                  No itineraries saved yet. Generate a journey above and tap "Save to Portfolio"!
                </div>
              ) : (
                <div className="space-y-2">
                  {session.savedItineraries.map((it) => (
                    <div
                      key={it.id}
                      className="p-4 rounded-2xl border border-white/10 bg-[#0a1835]/70 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-blue-500/20 text-cyan-300">
                            {it.circuit} circuit
                          </span>
                          <span className="text-[11px] text-zinc-300">
                            {it.durationDays} Days • {it.pace}
                          </span>
                        </div>
                        <h5 className="text-sm font-serif font-bold text-white mt-1">
                          {it.title}
                        </h5>
                        <div className="text-[11px] text-cyan-300 font-mono mt-0.5">
                          Est: {formatINR(it.totalEstBudgetInr)}
                        </div>
                      </div>

                      <button
                        onClick={() => onDeleteItinerary(it.id)}
                        className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete itinerary"
                        aria-label={`Delete itinerary ${it.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                Bookmarked Sanctuaries & Stays ({wishlistedHotelObjects.length})
              </h4>
              {wishlistedHotelObjects.length === 0 ? (
                <div className="p-6 rounded-2xl bg-black/50 border border-white/10 text-center text-xs text-zinc-400">
                  No stays wishlisted yet. Tap the bookmark icon on any hotel card to save it here!
                </div>
              ) : (
                <div className="space-y-2">
                  {wishlistedHotelObjects.map((h) => (
                    <div
                      key={h.id}
                      className="p-3.5 rounded-2xl border border-white/10 bg-[#0a1835]/70 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={h.imageUrl}
                          alt={h.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <h5 className="text-xs font-bold text-white">{h.name}</h5>
                          <p className="text-[11px] text-zinc-400">{h.locationLabel}</p>
                          <span className="text-[11px] font-mono text-cyan-300 font-semibold">
                            {formatINR(h.avgPricePerNight)} / night
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveWishlistHotel(h.id)}
                        className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Remove from wishlist"
                        aria-label={`Remove ${h.name} from wishlist`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
