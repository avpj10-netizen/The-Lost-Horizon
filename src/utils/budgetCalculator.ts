import { BudgetInput, BudgetBreakdown } from '../types';

export function calculateTripBudget(input: BudgetInput): BudgetBreakdown {
  const travelers = Math.max(1, Math.round(input.travelers));
  const nights = Math.max(1, Math.round(input.nights));
  const transportPerPerson = Math.max(0, input.transportPerPerson);
  const stayPerNightPerPerson = Math.max(0, input.stayPerNightPerPerson);
  const foodPerDayPerPerson = Math.max(0, input.foodPerDayPerPerson);
  const activitiesPerPerson = Math.max(0, input.activitiesPerPerson);

  const days = nights + 1; // standard travel day count for nights

  const transportTotal = transportPerPerson * travelers;
  const stayTotal = stayPerNightPerPerson * nights * travelers;
  const foodTotal = foodPerDayPerPerson * days * travelers;
  const activitiesTotal = activitiesPerPerson * travelers;

  const grandTotal = transportTotal + stayTotal + foodTotal + activitiesTotal;
  const perPersonTotal = grandTotal / travelers;

  const getPercent = (amount: number) => {
    if (grandTotal <= 0) return 25;
    return Math.round((amount / grandTotal) * 100);
  };

  let recommendedTier: 'budget' | 'comfort' | 'luxury' = 'budget';
  if (stayPerNightPerPerson >= 6500) {
    recommendedTier = 'luxury';
  } else if (stayPerNightPerPerson >= 2500) {
    recommendedTier = 'comfort';
  }

  return {
    perPersonTotal,
    grandTotal,
    transportTotal,
    stayTotal,
    foodTotal,
    activitiesTotal,
    percentages: {
      transport: getPercent(transportTotal),
      stay: getPercent(stayTotal),
      food: getPercent(foodTotal),
      activities: getPercent(activitiesTotal),
    },
    recommendedTier,
  };
}

export function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}
