import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Compass, Clock, MapPin, Printer, Bookmark, Check, Shield, AlertCircle, ArrowRight, Share2, Zap } from 'lucide-react';
import { CircuitType, TravelPace, TravelGroup, GeneratedItinerary } from '../types';
import { generateBespokeItinerary, ItineraryParams } from '../utils/itineraryEngine';
import { formatINR } from '../utils/budgetCalculator';

interface ItineraryGeneratorProps {
  currentCircuit: CircuitType;
  onSaveItinerary: (itinerary: GeneratedItinerary) => void;
  savedItineraries: GeneratedItinerary[];
  onOpenMapsIntel?: (location: string) => void;
}

export const ItineraryGenerator: React.FC<ItineraryGeneratorProps> = ({
  currentCircuit,
  onSaveItinerary,
  savedItineraries,
  onOpenMapsIntel,
}) => {
  // Form State
  const [circuit, setCircuit] = useState<CircuitType>(
    currentCircuit === 'gokarna' || currentCircuit === 'talakadu' ? currentCircuit : 'combined'
  );
  const [durationDays, setDurationDays] = useState<number>(4);
  const [pace, setPace] = useState<TravelPace>('adventure');
  const [group, setGroup] = useState<TravelGroup>('couples');
  const [originCity, setOriginCity] = useState<string>('Bengaluru');
  const [arrivalSlot, setArrivalSlot] = useState<string>('Overnight Sleeper Bus (Dawn 06:30)');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(() =>
    generateBespokeItinerary({
      circuit: 'combined',
      durationDays: 4,
      pace: 'adventure',
      group: 'couples',
      originCity: 'Bengaluru',
      arrivalSlot: 'Overnight Sleeper Bus (Dawn 06:30)',
    })
  );

  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const result = generateBespokeItinerary({
        circuit,
        durationDays,
        pace,
        group,
        originCity,
        arrivalSlot,
      });
      setItinerary(result);
      setActiveDayIndex(0);
      setIsGenerating(false);
    }, 450);
  };

  const handleSave = () => {
    if (!itinerary) return;
    onSaveItinerary(itinerary);
    setSaveToast('Itinerary securely saved to your session portfolio!');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isSaved = itinerary && savedItineraries.some((it) => it.id === itinerary.id);

  return (
    <div className="w-full space-y-8 print:p-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Multi-Variable AI Engine
            </span>
            <span className="text-zinc-400 text-xs font-mono">• Day-by-Day Precision Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2 tracking-tight">
            Personalized Journey Architect
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mt-1">
            Synthesize your ideal pacing, transport timings, group dynamics, and sacred heritage checkpoints across Karnataka's contrasting realms.
          </p>
        </div>
      </div>

      {/* Glassmorphic Configuration Panel */}
      <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0a1b38]/85 to-[#040c1e]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(2,6,23,0.7)] print:hidden">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Variable 1: Circuit Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-blue-300 font-semibold">
                1. Destination Circuit
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10">
                {[
                  { id: 'gokarna', label: 'Gokarna' },
                  { id: 'talakadu', label: 'Talakadu' },
                  { id: 'combined', label: 'Combined' },
                ].map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setCircuit(c.id as CircuitType)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                      circuit === c.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Variable 2: Trip Duration */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-blue-300 font-semibold">
                  2. Trip Duration
                </label>
                <span className="text-xs font-bold text-white font-mono bg-blue-500/20 border border-blue-400/30 px-2.5 py-0.5 rounded-lg">
                  {durationDays} Days / {Math.max(1, durationDays - 1)} Nights
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                value={durationDays}
                onChange={(e) => setDurationDays(parseInt(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-black/60 rounded-lg cursor-pointer"
                aria-label="Trip Duration Days"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>1 Day</span>
                <span>3 Days</span>
                <span>5 Days</span>
                <span>7 Days Max</span>
              </div>
            </div>

            {/* Variable 3: Group Composition */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-blue-300 font-semibold">
                3. Group Composition
              </label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value as TravelGroup)}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-blue-400 font-sans"
              >
                <option value="solo">Solo Nomad (Agile, Fast Trekking)</option>
                <option value="couples">Couples / Duo (Sunset Shacks & Retreats)</option>
                <option value="family">Family (Paced Stays & Heritage Comfort)</option>
                <option value="group">Large Travel Squad (4 to 10+ Adventurers)</option>
              </select>
            </div>

            {/* Variable 4: Travel Pace & Style */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-blue-300 font-semibold">
                4. Pacing & Style
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10">
                {[
                  { id: 'adventure', label: 'Adventure' },
                  { id: 'relaxation', label: 'Relaxation' },
                  { id: 'heritage', label: 'Heritage' },
                ].map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPace(p.id as TravelPace)}
                    className={`py-2 px-1 text-center rounded-xl text-[11px] font-semibold transition-all active:scale-95 ${
                      pace === p.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Variable 5: Origin City */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-blue-300 font-semibold">
                5. Origin Hub
              </label>
              <select
                value={originCity}
                onChange={(e) => setOriginCity(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-blue-400 font-sans"
              >
                <option value="Bengaluru">Bengaluru (Overnight Bus or Cab)</option>
                <option value="Mysuru">Mysuru (Direct Southern Gateway)</option>
                <option value="Mangaluru">Mangaluru (Coastal Express / Airport)</option>
                <option value="Hubballi">Hubballi / Belagavi (Northern Rail Link)</option>
                <option value="Goa">Goa Airport (2.5 hr Coastal Drive)</option>
              </select>
            </div>

            {/* Variable 6: Arrival Logistics */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-blue-300 font-semibold">
                6. Arrival Time Window
              </label>
              <select
                value={arrivalSlot}
                onChange={(e) => setArrivalSlot(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-blue-400 font-sans"
              >
                <option value="Overnight Sleeper Bus (Dawn 06:30)">Overnight Sleeper (Dawn ~06:30 AM)</option>
                <option value="Morning Self-Drive (10:30 AM)">Morning Cab / Self-Drive (~10:30 AM)</option>
                <option value="Afternoon Rail Arrival (14:00 PM)">Afternoon Train / Flight (~14:00 PM)</option>
                <option value="Evening Sunset Check-in (17:30 PM)">Evening Sunset Check-in (~17:30 PM)</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>
                Simulates real tides, temple darshan timings, coracle operating hours, and cliff safety.
              </span>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold text-sm tracking-wide hover:brightness-110 transition-all active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing Optimal Route...</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4 text-white" />
                  <span>Generate Bespoke Blueprint</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Generated Itinerary Display */}
      {itinerary && (
        <div className="space-y-6">
          {/* Header Summary Bar with Print / Save Actions */}
          <div className="p-6 rounded-3xl border border-white/15 bg-gradient-to-b from-[#0c1e3d]/90 to-[#061026]/90 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  {itinerary.circuit.toUpperCase()} CIRCUIT
                </span>
                <span className="text-zinc-300 text-xs">
                  • {itinerary.durationDays} Days • Paced for {itinerary.pace.toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                {itinerary.title}
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Originating from <strong className="text-white">{itinerary.originCity}</strong> via{' '}
                <strong className="text-white">{itinerary.arrivalSlot}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 border border-white/15"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={handleSave}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                  isSaved
                    ? 'bg-blue-600/30 text-cyan-200 border border-blue-400/50'
                    : 'bg-white text-blue-950 hover:bg-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                }`}
              >
                {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{isSaved ? 'Saved in Session' : 'Save to Portfolio'}</span>
              </button>
            </div>
          </div>

          {/* Toast alert */}
          {saveToast && (
            <div className="p-3.5 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{saveToast}</span>
            </div>
          )}

          {/* Day Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none print:hidden">
            {itinerary.days.map((day, idx) => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayIndex(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all active:scale-95 flex items-center gap-2 border ${
                  activeDayIndex === idx
                    ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-md'
                    : 'bg-black/40 text-zinc-300 border-white/10 hover:text-white'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    day.circuit === 'gokarna' ? 'bg-cyan-400' : 'bg-amber-400'
                  }`}
                />
                <span>Day {day.dayNumber}: {day.circuit === 'gokarna' ? 'Gokarna' : 'Talakadu'}</span>
              </button>
            ))}
          </div>

          {/* Active Day Detail Card */}
          {itinerary.days[activeDayIndex] && (
            <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#08152e]/90 to-[#030919]/90 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              {/* Day Headline */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                        itinerary.days[activeDayIndex].circuit === 'gokarna'
                          ? 'bg-blue-500/25 text-cyan-300 border border-blue-400/30'
                          : 'bg-amber-500/25 text-amber-300 border border-amber-400/30'
                      }`}
                    >
                      {itinerary.days[activeDayIndex].circuit === 'gokarna'
                        ? 'Coastal Circuit'
                        : 'Heritage Kaveri Circuit'}
                    </span>
                    <span className="text-zinc-300 text-xs font-mono">
                      Estimated Daily Outlay: ~{formatINR(itinerary.days[activeDayIndex].dayBudgetEstimateInr)}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                    Day {itinerary.days[activeDayIndex].dayNumber}: {itinerary.days[activeDayIndex].themeTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                    {itinerary.days[activeDayIndex].summary}
                  </p>
                </div>
              </div>

              {/* Day Time Slots Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {itinerary.days[activeDayIndex].slots.map((slot, sIdx) => {
                  const isGokarna = slot.circuit === 'gokarna';
                  return (
                    <div
                      key={sIdx}
                      className="p-5 rounded-2xl border border-white/10 bg-[#0a1835]/70 backdrop-blur-md flex flex-col justify-between space-y-3 hover:border-blue-400/40 transition-colors"
                    >
                      <div>
                        {/* Slot Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-blue-400" />
                            {slot.timeSlot}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              isGokarna
                                ? 'bg-blue-500/20 text-cyan-200'
                                : 'bg-amber-500/20 text-amber-200'
                            }`}
                          >
                            {slot.highlightTag}
                          </span>
                        </div>

                        <h5 className="text-base font-serif font-bold text-white mt-2">
                          {slot.title}
                        </h5>

                        <div className="flex items-center justify-between text-xs text-zinc-300 font-medium mt-1">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                            <span>{slot.locationName}</span>
                          </div>
                          {onOpenMapsIntel && (
                            <button
                              onClick={() => onOpenMapsIntel(slot.locationName)}
                              className="text-[10px] text-cyan-300 hover:text-white flex items-center gap-1 font-mono transition-colors"
                            >
                              <Zap className="w-3 h-3" />
                              <span>Maps Intel</span>
                            </button>
                          )}
                        </div>

                        <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                          {slot.activity}
                        </p>
                      </div>

                      {/* Insider secret tip box */}
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-blue-100 leading-snug">
                        <strong className="text-cyan-300 font-semibold block mb-0.5">
                          💡 Field Pro Tip:
                        </strong>
                        {slot.insiderTip}
                      </div>

                      {/* Footer logistics */}
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                        <span>{slot.transportInfo}</span>
                        <span className="text-white font-bold">~₹{slot.estCostInr}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Day navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 print:hidden">
                <button
                  disabled={activeDayIndex === 0}
                  onClick={() => setActiveDayIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
                >
                  ← Previous Day
                </button>
                <span className="text-xs text-zinc-400 font-mono">
                  Day {activeDayIndex + 1} of {itinerary.days.length}
                </span>
                <button
                  disabled={activeDayIndex === itinerary.days.length - 1}
                  onClick={() => setActiveDayIndex((prev) => Math.min(itinerary.days.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
                >
                  Next Day →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
