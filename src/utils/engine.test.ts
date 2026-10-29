import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTripBudget } from './budgetCalculator';
import { calculateVibeResult } from './quizEngine';
import { generateBespokeItinerary } from './itineraryEngine';

test('calculateTripBudget calculates correct subtotals and grand totals', () => {
  const result = calculateTripBudget({
    travelers: 2,
    nights: 3,
    transportPerPerson: 1500,
    stayPerNightPerPerson: 2000,
    foodPerDayPerPerson: 800,
    activitiesPerPerson: 1000,
  });

  // Transport: 1500 * 2 = 3000
  // Stay: 2000 * 3 nights * 2 travelers = 12000
  // Food: 800 * 4 days * 2 travelers = 6400
  // Activities: 1000 * 2 = 2000
  // Grand Total = 3000 + 12000 + 6400 + 2000 = 23400
  // Per person = 11700
  assert.equal(result.transportTotal, 3000);
  assert.equal(result.stayTotal, 12000);
  assert.equal(result.foodTotal, 6400);
  assert.equal(result.activitiesTotal, 2000);
  assert.equal(result.grandTotal, 23400);
  assert.equal(result.perPersonTotal, 11700);
  assert.equal(result.percentages.transport > 0, true);
  assert.equal(result.recommendedTier, 'budget');
});

test('calculateTripBudget detects luxury tier for high stay rates', () => {
  const result = calculateTripBudget({
    travelers: 1,
    nights: 2,
    transportPerPerson: 4000,
    stayPerNightPerPerson: 8500,
    foodPerDayPerPerson: 2000,
    activitiesPerPerson: 3000,
  });
  assert.equal(result.recommendedTier, 'luxury');
});

test('calculateVibeResult computes Gokarna preference when answers lean coastal', () => {
  const result = calculateVibeResult([
    { questionId: 1, choice: 'A' },
    { questionId: 2, choice: 'A' },
    { questionId: 3, choice: 'B' },
  ]);

  assert.equal(result.preferredCircuit, 'gokarna');
  assert.equal(result.gokarnaScore, 67);
  assert.equal(result.talakaduScore, 33);
  assert.match(result.title, /Gokarna/);
});

test('calculateVibeResult computes Talakadu preference when answers lean heritage', () => {
  const result = calculateVibeResult([
    { questionId: 1, choice: 'B' },
    { questionId: 2, choice: 'B' },
    { questionId: 3, choice: 'A' },
  ]);

  assert.equal(result.preferredCircuit, 'talakadu');
  assert.equal(result.talakaduScore, 67);
  assert.equal(result.gokarnaScore, 33);
  assert.match(result.title, /Talakadu/);
});

test('generateBespokeItinerary builds complete multi-day schedule with valid slots', () => {
  const itin = generateBespokeItinerary({
    circuit: 'combined',
    durationDays: 4,
    pace: 'adventure',
    group: 'couples',
    originCity: 'Bengaluru',
    arrivalSlot: 'Overnight Sleeper Bus (Dawn arrival)',
  });

  assert.equal(itin.durationDays, 4);
  assert.equal(itin.days.length, 4);
  assert.equal(itin.days[0].slots.length, 4);
  assert.equal(itin.totalEstBudgetInr > 0, true);
  assert.equal(itin.packingKeyNotes.length >= 3, true);
});
