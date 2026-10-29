import React, { useState } from 'react';
import { PHRASEBOOK_DATA } from '../data/phrasebook';
import { DEFAULT_PACKING_ITEMS } from '../data/packingChecklist';
import { calculateVibeResult, QuizResult } from '../utils/quizEngine';
import { KannadaPhrase, PackingItem, CircuitType } from '../types';
import { Volume2, VolumeX, CheckCircle, Plus, Trash2, Sparkles, HelpCircle, ArrowRight, ShieldAlert, Compass } from 'lucide-react';

interface ActionPodsProps {
  currentCircuit: CircuitType;
  customPackingItems: PackingItem[];
  onUpdatePackingItems: (items: PackingItem[]) => void;
  onExploreCircuit: (circuit: CircuitType) => void;
}

export const ActionPods: React.FC<ActionPodsProps> = ({
  currentCircuit,
  customPackingItems,
  onUpdatePackingItems,
  onExploreCircuit,
}) => {
  // --- POD 1: KANNADA PHRASEBOOK ---
  const [phraseCategory, setPhraseCategory] = useState<string>('all');
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);

  const playSpeech = (phrase: KannadaPhrase) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    setPlayingPhraseId(phrase.id);

    const utterance = new SpeechSynthesisUtterance(phrase.phoneticAudioText);
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const knVoice = voices.find((v) => v.lang.startsWith('kn') || v.lang.includes('IN'));
    if (knVoice) {
      utterance.voice = knVoice;
    }

    utterance.onend = () => setPlayingPhraseId(null);
    utterance.onerror = () => setPlayingPhraseId(null);

    window.speechSynthesis.speak(utterance);
  };

  const filteredPhrases = PHRASEBOOK_DATA.filter((p) => {
    if (phraseCategory !== 'all' && p.category !== phraseCategory) return false;
    return true;
  });

  // --- POD 2: VIBE QUIZ ---
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: number]: 'A' | 'B' }>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const quizQuestions = [
    {
      id: 1,
      prompt: '1. What wakes your soul in the morning?',
      optionA: {
        label: 'A: Crashing Arabian Sea waves and salty sea breeze from a cliff hammock',
        circuit: 'gokarna' as const,
      },
      optionB: {
        label: 'B: Temple brass bells, Sanskrit chants, and mist rising from the Kaveri River',
        circuit: 'talakadu' as const,
      },
    },
    {
      id: 2,
      prompt: '2. Your ideal afternoon terrain & exploration style:',
      optionA: {
        label: 'A: Scrambling over rugged black granite headlands into secluded hidden coves',
        circuit: 'gokarna' as const,
      },
      optionB: {
        label: 'B: Walking across river sand dunes to inspect excavated 11th-century Hoysala stone carvings',
        circuit: 'talakadu' as const,
      },
    },
    {
      id: 3,
      prompt: '3. Your preferred sunset watercraft experience:',
      optionA: {
        label: 'A: Cruising in a wooden longboat spotting wild dolphins against fiery crimson skies',
        circuit: 'gokarna' as const,
      },
      optionB: {
        label: 'B: Drifting in a traditional circular wicker coracle spinning gently in the river current',
        circuit: 'talakadu' as const,
      },
    },
  ];

  const handleSelectQuizAnswer = (qId: number, choice: 'A' | 'B') => {
    setQuizAnswers((prev) => {
      const updated = { ...prev, [qId]: choice };
      if (Object.keys(updated).length === 3) {
        const answersArr = Object.entries(updated).map(([k, v]) => ({
          questionId: parseInt(k),
          choice: v as 'A' | 'B',
        }));
        setQuizResult(calculateVibeResult(answersArr));
      }
      return updated;
    });
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizResult(null);
  };

  // --- POD 3: PACKING CHECKLIST ---
  const [packingItems, setPackingItems] = useState<PackingItem[]>(() => {
    if (customPackingItems && customPackingItems.length > 0) return customPackingItems;
    return DEFAULT_PACKING_ITEMS;
  });

  const [checklistFilter, setChecklistFilter] = useState<'all' | 'gokarna' | 'talakadu'>('all');
  const [newCustomItemText, setNewCustomItemText] = useState<string>('');

  const toggleItem = (id: string) => {
    const updated = packingItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setPackingItems(updated);
    onUpdatePackingItems(updated);
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomItemText.trim()) return;

    const newItem: PackingItem = {
      id: `custom-${Date.now()}`,
      label: newCustomItemText.trim(),
      category: 'Cash, UPI & Essentials',
      targetCircuit: checklistFilter === 'all' ? 'all' : checklistFilter,
      checked: false,
      essential: false,
    };

    const updated = [newItem, ...packingItems];
    setPackingItems(updated);
    onUpdatePackingItems(updated);
    setNewCustomItemText('');
  };

  const filteredPackingItems = packingItems.filter((item) => {
    if (checklistFilter === 'all') return true;
    return item.targetCircuit === 'all' || item.targetCircuit === checklistFilter;
  });

  const checkedCount = filteredPackingItems.filter((i) => i.checked).length;
  const progressPercent =
    filteredPackingItems.length > 0
      ? Math.round((checkedCount / filteredPackingItems.length) * 100)
      : 0;

  return (
    <div className="w-full space-y-12">
      {/* ========================================================
          POD 1: KANNADA PHRASEBOOK & AUDIO VOCALIZER
         ======================================================== */}
      <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0a1a38]/85 to-[#040d22]/90 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                Linguistic Harmony
              </span>
              <span className="text-zinc-400 text-xs font-mono">• Native Speech Vocalizer</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Kannada Traveler’s Phrasebook
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">
              Tap the audio icon to hear authentic pronunciation. Locals warmly appreciate travelers who greet with “Namaskara” and “Oota aitha?”.
            </p>
          </div>

          {/* Category Tabs (iOS Segmented Control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'All' },
              { id: 'greetings', label: 'Greetings' },
              { id: 'food', label: 'Food & Care' },
              { id: 'bargaining', label: 'Bargaining' },
              { id: 'transit', label: 'Directions' },
              { id: 'emergency', label: 'Help' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setPhraseCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all active:scale-95 ${
                  phraseCategory === cat.id
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'bg-black/40 text-zinc-300 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Phrase Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhrases.map((phrase) => {
            const isPlaying = playingPhraseId === phrase.id;
            return (
              <div
                key={phrase.id}
                className="p-4 rounded-2xl border border-white/10 bg-[#0a1936]/60 backdrop-blur-md flex flex-col justify-between space-y-3 hover:border-blue-400/40 transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xl font-serif font-bold text-cyan-300">
                      {phrase.kannada}
                    </span>
                    <button
                      onClick={() => playSpeech(phrase)}
                      className={`p-2.5 rounded-xl border transition-all active:scale-90 ${
                        isPlaying
                          ? 'bg-blue-600 text-white border-blue-400 animate-pulse'
                          : 'bg-white/5 text-cyan-300 border-white/10 hover:bg-blue-600/30'
                      }`}
                      title="Listen to pronunciation"
                      aria-label={`Pronounce ${phrase.transliteration}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs font-mono font-bold text-white mt-1">
                    “{phrase.transliteration}”
                  </div>

                  <p className="text-xs font-semibold text-blue-200 mt-1">
                    {phrase.meaning}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 text-[11px] text-zinc-300 leading-snug">
                  <span className="text-zinc-400 font-mono">Usage: </span>
                  {phrase.situation}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          POD 2: VIBE DIAGNOSTIC QUIZ
         ======================================================== */}
      <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0a1a38]/85 to-[#040d22]/90 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Diagnostic Match
              </span>
              <span className="text-zinc-400 text-xs font-mono">• 3-Question Vibe Diagnostic</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Where Should You Begin Your Journey?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">
              Answer three sensory prompts to determine whether your spirit is called by the coastal cliffs of Gokarna or the sand dunes of Talakadu.
            </p>
          </div>

          {quizResult && (
            <button
              onClick={handleResetQuiz}
              className="text-xs font-mono text-zinc-400 hover:text-white underline self-start sm:self-auto"
            >
              Reset Answers
            </button>
          )}
        </div>

        {/* Questions or Results */}
        {!quizResult ? (
          <div className="space-y-6">
            {quizQuestions.map((q) => {
              const currentChoice = quizAnswers[q.id];
              return (
                <div key={q.id} className="space-y-3">
                  <h4 className="text-sm font-semibold text-white font-serif">
                    {q.prompt}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleSelectQuizAnswer(q.id, 'A')}
                      className={`p-4 rounded-2xl border text-left text-xs transition-all active:scale-95 flex items-start gap-3 ${
                        currentChoice === 'A'
                          ? 'bg-blue-600/30 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                          : 'bg-black/40 text-zinc-300 border-white/10 hover:border-blue-400/40 hover:bg-blue-600/10'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-[10px] font-bold font-mono">
                        A
                      </span>
                      <span>{q.optionA.label}</span>
                    </button>

                    <button
                      onClick={() => handleSelectQuizAnswer(q.id, 'B')}
                      className={`p-4 rounded-2xl border text-left text-xs transition-all active:scale-95 flex items-start gap-3 ${
                        currentChoice === 'B'
                          ? 'bg-amber-500/30 text-white border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                          : 'bg-black/40 text-zinc-300 border-white/10 hover:border-amber-400/40 hover:bg-amber-500/10'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 text-[10px] font-bold font-mono">
                        B
                      </span>
                      <span>{q.optionB.label}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span
                  className={`px-3 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                    quizResult.preferredCircuit === 'gokarna'
                      ? 'bg-blue-600 text-white'
                      : 'bg-amber-400 text-black'
                  }`}
                >
                  Diagnostic Match Verdict
                </span>
                <h4 className="text-2xl font-serif font-bold text-white mt-1">
                  {quizResult.title}
                </h4>
                <p className="text-xs text-zinc-300 font-mono mt-0.5">
                  {quizResult.tagline}
                </p>
              </div>

              {/* Match percentages badge */}
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/15">
                <div className="text-center">
                  <div className="text-base font-bold font-mono text-cyan-300">
                    {quizResult.gokarnaScore}%
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">Gokarna</div>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-base font-bold font-mono text-amber-400">
                    {quizResult.talakaduScore}%
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">Talakadu</div>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed pt-2 border-t border-white/10">
              {quizResult.recommendationNarrative}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
              <button
                onClick={() => onExploreCircuit(quizResult.preferredCircuit)}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  quizResult.preferredCircuit === 'gokarna'
                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                }`}
              >
                <span>Explore {quizResult.preferredCircuit === 'gokarna' ? 'Gokarna' : 'Talakadu'} Circuit First</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          POD 3: PACKING & RESPONSIBLE TRAVEL CHECKLIST
         ======================================================== */}
      <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0a1a38]/85 to-[#040d22]/90 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                Readiness & Sustainability
              </span>
              <span className="text-zinc-400 text-xs font-mono">• LocalStorage Synchronized</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Field Packing & Leave-No-Trace Checklist
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">
              Specific gear for rugged headland scrambles, sacred temple modesty dress codes, river coracles, and environmental preservation.
            </p>
          </div>

          {/* Progress Circular Indicator */}
          <div className="flex items-center gap-3 bg-black/50 border border-white/15 px-4 py-2 rounded-2xl self-start md:self-auto">
            <div className="w-10 h-10 rounded-full border-2 border-blue-500/40 relative flex items-center justify-center font-mono text-xs font-bold text-cyan-300">
              {progressPercent}%
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {checkedCount} of {filteredPackingItems.length} Packed
              </div>
              <div className="text-[10px] text-zinc-400">
                {progressPercent === 100 ? '✅ Expedition Ready!' : 'Gear checklist in progress'}
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Add Item Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Circuit Filter */}
          <div className="flex items-center p-1 rounded-2xl bg-black/50 border border-white/10 self-stretch sm:self-auto">
            <button
              onClick={() => setChecklistFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                checklistFilter === 'all' ? 'bg-blue-600 text-white font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setChecklistFilter('gokarna')}
              className={`px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                checklistFilter === 'gokarna' ? 'bg-cyan-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Gokarna Cliffs
            </button>
            <button
              onClick={() => setChecklistFilter('talakadu')}
              className={`px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                checklistFilter === 'talakadu' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Talakadu Dunes
            </button>
          </div>

          {/* Add custom item form */}
          <form onSubmit={handleAddCustomItem} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Add personal gear item..."
              value={newCustomItemText}
              onChange={(e) => setNewCustomItemText(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-blue-400 w-full sm:w-64"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all active:scale-95 shrink-0 shadow-sm"
              title="Add Item"
              aria-label="Add custom packing item"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Checklist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredPackingItems.map((item) => (
            <label
              key={item.id}
              className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                item.checked
                  ? 'bg-blue-950/30 border-blue-500/40 text-zinc-300'
                  : 'bg-black/40 border-white/10 text-zinc-200 hover:border-white/25'
              }`}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(item.id)}
                className="mt-0.5 accent-blue-500 w-4 h-4 rounded cursor-pointer"
              />
              <div className="flex-1 text-xs">
                <span className={item.checked ? 'line-through text-zinc-500' : 'text-white'}>
                  {item.label}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono text-zinc-400">
                    {item.category}
                  </span>
                  {item.essential && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-red-500/20 text-red-300 border border-red-500/30">
                      Essential
                    </span>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
