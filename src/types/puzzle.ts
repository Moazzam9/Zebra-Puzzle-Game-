export interface House {
  position: number;
  color: string;
  nationality: string;
  pet: string;
  drink: string;
  cigarette: string;
}

export interface PuzzleState {
  houses: House[];
  isLoading: boolean;
  isSolved: boolean;
  zebraOwner: string | null;
  waterDrinker: string | null;
  currentPuzzle: PuzzleTemplate;
}

export interface PuzzleTemplate {
  id: string;
  name: string;
  theme: string;
  emoji: string;
  description: string;
  attributes: {
    colors: string[];
    nationalities: string[];
    pets: string[];
    drinks: string[];
    cigarettes: string[];
  };
  constraints: string[];
  questions: {
    primary: string;
    secondary: string;
  };
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  estimatedTime: string;
}

export const PUZZLE_TEMPLATES: PuzzleTemplate[] = [
  {
    id: 'classic-zebra',
    name: 'Classic Zebra Puzzle',
    theme: 'Einstein\'s Original',
    emoji: '🦓',
    description: 'The original Einstein riddle with 5 houses and classic attributes',
    attributes: {
      colors: ['Red', 'Green', 'Blue', 'Yellow', 'White'],
      nationalities: ['British', 'Swedish', 'Danish', 'Norwegian', 'German'],
      pets: ['Dog', 'Bird', 'Cat', 'Horse', 'Zebra'],
      drinks: ['Tea', 'Coffee', 'Milk', 'Beer', 'Water'],
      cigarettes: ['Pall Mall', 'Dunhill', 'Blends', 'Blue Master', 'Prince']
    },
    constraints: [
      "The British person lives in the red house",
      "The Swedish person keeps dogs as pets",
      "The Danish person drinks tea",
      "The green house is on the left of the white house",
      "The green house's owner drinks coffee",
      "The person who smokes Pall Mall rears birds",
      "The owner of the yellow house smokes Dunhill",
      "The person living in the center house drinks milk",
      "The Norwegian lives in the first house on the left",
      "The person who smokes Blends lives next to the one who keeps cats",
      "The person who keeps horses lives next to the person who smokes Dunhill",
      "The person who smokes Blue Master drinks beer",
      "The German smokes Prince",
      "The Norwegian lives next to the blue house",
      "The person who smokes Blends has a neighbor who drinks water"
    ],
    questions: {
      primary: 'Who owns the zebra?',
      secondary: 'Who drinks water?'
    },
    difficulty: 'Hard',
    estimatedTime: '15-30 min'
  },
  {
    id: 'space-station',
    name: 'Space Station Mystery',
    theme: 'Sci-Fi Adventure',
    emoji: '🚀',
    description: 'Solve the mystery aboard the International Space Station',
    attributes: {
      colors: ['Silver', 'Gold', 'Copper', 'Titanium', 'Platinum'],
      nationalities: ['American', 'Russian', 'Japanese', 'European', 'Canadian'],
      pets: ['Robot Dog', 'Space Cat', 'Cyber Bird', 'AI Fish', 'Quantum Mouse'],
      drinks: ['Tang', 'Coffee', 'Water', 'Energy Drink', 'Protein Shake'],
      cigarettes: ['Vape Pod', 'Nicotine Patch', 'Gum', 'Inhaler', 'None']
    },
    constraints: [
      "The American astronaut lives in the silver module",
      "The Russian cosmonaut keeps robot dogs",
      "The Japanese astronaut drinks tang",
      "The gold module is directly left of the platinum module",
      "The gold module's occupant drinks coffee",
      "The person who uses vape pods keeps cyber birds",
      "The titanium module's occupant uses nicotine patches",
      "The person in the center module drinks water",
      "The Canadian lives in the first module",
      "The person who chews gum lives next to the one with space cats",
      "The person with AI fish lives next to the one using nicotine patches",
      "The person who uses inhalers drinks energy drinks",
      "The European uses no nicotine products",
      "The Canadian lives next to the copper module",
      "The person who chews gum has a neighbor who drinks protein shakes"
    ],
    questions: {
      primary: 'Who keeps the quantum mouse?',
      secondary: 'Who drinks protein shakes?'
    },
    difficulty: 'Expert',
    estimatedTime: '20-40 min'
  },
  {
    id: 'medieval-castle',
    name: 'Medieval Castle',
    theme: 'Knights & Dragons',
    emoji: '🏰',
    description: 'Uncover secrets in the royal castle chambers',
    attributes: {
      colors: ['Crimson', 'Emerald', 'Sapphire', 'Golden', 'Ivory'],
      nationalities: ['English', 'French', 'Spanish', 'Italian', 'German'],
      pets: ['Dragon', 'Griffin', 'Phoenix', 'Unicorn', 'Pegasus'],
      drinks: ['Mead', 'Wine', 'Ale', 'Cider', 'Water'],
      cigarettes: ['Pipe', 'Cigar', 'Herbs', 'Incense', 'Nothing']
    },
    constraints: [
      "The English knight lives in the crimson chamber",
      "The French knight keeps dragons",
      "The Spanish knight drinks mead",
      "The emerald chamber is left of the ivory chamber",
      "The emerald chamber's knight drinks wine",
      "The pipe smoker keeps griffins",
      "The golden chamber's knight smokes cigars",
      "The center chamber's knight drinks ale",
      "The Italian lives in the first chamber",
      "The herb smoker lives next to the unicorn keeper",
      "The phoenix keeper lives next to the cigar smoker",
      "The incense burner drinks cider",
      "The German burns nothing",
      "The Italian lives next to the sapphire chamber",
      "The herb smoker's neighbor drinks water"
    ],
    questions: {
      primary: 'Who keeps the pegasus?',
      secondary: 'Who drinks water?'
    },
    difficulty: 'Medium',
    estimatedTime: '10-25 min'
  },
  {
    id: 'cyberpunk-city',
    name: 'Cyberpunk Towers',
    theme: 'Neon Future',
    emoji: '🌃',
    description: 'Navigate the corporate towers of Neo-Tokyo',
    attributes: {
      colors: ['Neon Pink', 'Electric Blue', 'Cyber Green', 'Holo Purple', 'Chrome'],
      nationalities: ['Neo-Japanese', 'Cyber-American', 'Tech-European', 'Data-Korean', 'AI-Chinese'],
      pets: ['Holo-Cat', 'Cyber-Dog', 'Data-Bird', 'Nano-Fish', 'Quantum-Rabbit'],
      drinks: ['Synth-Cola', 'Neural-Coffee', 'Bio-Water', 'Energy-Boost', 'Nano-Tea'],
      cigarettes: ['E-Cig', 'Neural-Stim', 'Bio-Patch', 'Quantum-Vape', 'Clean-Air']
    },
    constraints: [
      "The Neo-Japanese hacker lives in the neon pink tower",
      "The Cyber-American keeps holo-cats",
      "The Tech-European drinks synth-cola",
      "The electric blue tower is left of the chrome tower",
      "The electric blue tower's resident drinks neural-coffee",
      "The e-cig user keeps data-birds",
      "The holo purple tower's resident uses neural-stims",
      "The center tower's resident drinks bio-water",
      "The Data-Korean lives in the first tower",
      "The bio-patch user lives next to the cyber-dog keeper",
      "The nano-fish keeper lives next to the neural-stim user",
      "The quantum-vape user drinks energy-boost",
      "The AI-Chinese uses clean-air systems",
      "The Data-Korean lives next to the cyber green tower",
      "The bio-patch user's neighbor drinks nano-tea"
    ],
    questions: {
      primary: 'Who keeps the quantum-rabbit?',
      secondary: 'Who drinks nano-tea?'
    },
    difficulty: 'Hard',
    estimatedTime: '15-35 min'
  },
  {
    id: 'pirate-ships',
    name: 'Pirate Fleet',
    theme: 'High Seas Adventure',
    emoji: '🏴‍☠️',
    description: 'Discover treasures among the pirate captains',
    attributes: {
      colors: ['Black Pearl', 'Crimson Tide', 'Ocean Blue', 'Golden Sun', 'Silver Moon'],
      nationalities: ['Caribbean', 'Spanish', 'English', 'Dutch', 'Portuguese'],
      pets: ['Parrot', 'Monkey', 'Sea Turtle', 'Octopus', 'Shark'],
      drinks: ['Rum', 'Grog', 'Water', 'Wine', 'Coconut Milk'],
      cigarettes: ['Pipe', 'Cigar', 'Tobacco', 'Hookah', 'None']
    },
    constraints: [
      "The Caribbean captain sails the black pearl ship",
      "The Spanish captain keeps parrots",
      "The English captain drinks rum",
      "The ocean blue ship sails left of the silver moon ship",
      "The ocean blue ship's captain drinks grog",
      "The pipe smoker keeps monkeys",
      "The golden sun ship's captain smokes cigars",
      "The center ship's captain drinks water",
      "The Dutch captain commands the first ship",
      "The tobacco smoker sails next to the sea turtle keeper",
      "The octopus keeper sails next to the cigar smoker",
      "The hookah smoker drinks wine",
      "The Portuguese captain smokes nothing",
      "The Dutch captain sails next to the crimson tide ship",
      "The tobacco smoker's neighbor drinks coconut milk"
    ],
    questions: {
      primary: 'Who keeps the shark?',
      secondary: 'Who drinks coconut milk?'
    },
    difficulty: 'Easy',
    estimatedTime: '8-20 min'
  }
];

export const getRandomPuzzle = (): PuzzleTemplate => {
  return PUZZLE_TEMPLATES[Math.floor(Math.random() * PUZZLE_TEMPLATES.length)];
};

export const getPuzzleById = (id: string): PuzzleTemplate => {
  return PUZZLE_TEMPLATES.find(p => p.id === id) || PUZZLE_TEMPLATES[0];
};