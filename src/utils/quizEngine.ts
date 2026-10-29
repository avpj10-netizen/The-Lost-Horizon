export interface QuizAnswer {
  questionId: number;
  choice: 'A' | 'B';
}

export interface QuizResult {
  preferredCircuit: 'gokarna' | 'talakadu';
  gokarnaScore: number; // 0 to 100
  talakaduScore: number; // 0 to 100
  title: string;
  tagline: string;
  recommendationNarrative: string;
}

export function calculateVibeResult(answers: QuizAnswer[]): QuizResult {
  let gokarnaPoints = 0;
  let talakaduPoints = 0;

  answers.forEach((ans) => {
    if (ans.choice === 'A') {
      gokarnaPoints += 1;
    } else {
      talakaduPoints += 1;
    }
  });

  const total = Math.max(1, answers.length);
  const gokarnaScore = Math.round((gokarnaPoints / total) * 100);
  const talakaduScore = 100 - gokarnaScore;

  if (gokarnaScore >= 50) {
    return {
      preferredCircuit: 'gokarna',
      gokarnaScore,
      talakaduScore,
      title: 'The Coastal Cliff Wanderer (Gokarna)',
      tagline: 'Salty ocean air, sacred Om beach coves, and rugged granite headlands call you.',
      recommendationNarrative:
        'Your profile resonates with the rhythmic crash of the Arabian Sea and the sacred silence of Gokarna’s coastal trails. Begin your expedition traversing the Five-Beach ridge, listening to Sanskrit chants at Mahabaleshwar, and catching starlight at Half Moon Beach.',
    };
  }

  return {
    preferredCircuit: 'talakadu',
    gokarnaScore,
    talakaduScore,
    title: 'The Sand Dune & Heritage Seeker (Talakadu)',
    tagline: 'Ancient stone mysteries, Kaveri river coracles, and the legendary curse of Alamelamma.',
    recommendationNarrative:
      'Your spirit seeks ancient stone sanctums buried in windblown river sands and the gentle ripple of the Kaveri. Begin in Talakadu touching the excavated Hoysala and Ganga shrines, taking a wooden round coracle across the water, and visiting the majestic roar of Shivanasamudra.',
  };
}
