import React from 'react';
import { House, PuzzleTemplate } from '../types/puzzle';

interface PuzzleGridProps {
  houses: House[];
  isLoading: boolean;
  isSolved?: boolean;
  currentPuzzle: PuzzleTemplate;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ houses, isLoading, isSolved, currentPuzzle }) => {
  const attributes = ['color', 'nationality', 'pet', 'drink', 'cigarette'];
  const attributeLabels = ['Color', 'Nationality', 'Pet', 'Drink', 'Cigarette'];

  const getHouseColor = (color: string) => {
    // Dynamic color mapping based on puzzle theme
    const colorMaps: Record<string, Record<string, string>> = {
      'classic-zebra': {
        'Red': 'bg-red-50 border-red-200',
        'Green': 'bg-green-50 border-green-200',
        'Blue': 'bg-blue-50 border-blue-200',
        'Yellow': 'bg-yellow-50 border-yellow-200',
        'White': 'bg-gray-50 border-gray-200'
      },
      'space-station': {
        'Silver': 'bg-gray-100 border-gray-300',
        'Gold': 'bg-yellow-100 border-yellow-300',
        'Copper': 'bg-orange-100 border-orange-300',
        'Titanium': 'bg-slate-100 border-slate-300',
        'Platinum': 'bg-purple-100 border-purple-300'
      },
      'medieval-castle': {
        'Crimson': 'bg-red-100 border-red-300',
        'Emerald': 'bg-emerald-100 border-emerald-300',
        'Sapphire': 'bg-blue-100 border-blue-300',
        'Golden': 'bg-yellow-100 border-yellow-300',
        'Ivory': 'bg-stone-100 border-stone-300'
      },
      'cyberpunk-city': {
        'Neon Pink': 'bg-pink-100 border-pink-300',
        'Electric Blue': 'bg-cyan-100 border-cyan-300',
        'Cyber Green': 'bg-lime-100 border-lime-300',
        'Holo Purple': 'bg-purple-100 border-purple-300',
        'Chrome': 'bg-gray-100 border-gray-300'
      },
      'pirate-ships': {
        'Black Pearl': 'bg-gray-900 border-gray-700 text-white',
        'Crimson Tide': 'bg-red-100 border-red-300',
        'Ocean Blue': 'bg-blue-100 border-blue-300',
        'Golden Sun': 'bg-yellow-100 border-yellow-300',
        'Silver Moon': 'bg-gray-100 border-gray-300'
      }
    };

    const colorMap = colorMaps[currentPuzzle.id] || colorMaps['classic-zebra'];
    return colorMap[color] || 'bg-white border-gray-200';
  };

  const getAttributeIcon = (attribute: string, value: string) => {
    // Dynamic icons based on puzzle theme and values
    const iconMaps: Record<string, Record<string, string>> = {
      'classic-zebra': {
        'Zebra': '🦓', 'Dog': '🐕', 'Cat': '🐱', 'Bird': '🐦', 'Horse': '🐴',
        'Water': '💧', 'Coffee': '☕', 'Tea': '🍵', 'Beer': '🍺', 'Milk': '🥛'
      },
      'space-station': {
        'Robot Dog': '🤖', 'Space Cat': '🐱', 'Cyber Bird': '🐦', 'AI Fish': '🐟', 'Quantum Mouse': '🐭',
        'Tang': '🥤', 'Coffee': '☕', 'Water': '💧', 'Energy Drink': '⚡', 'Protein Shake': '🥛'
      },
      'medieval-castle': {
        'Dragon': '🐉', 'Griffin': '🦅', 'Phoenix': '🔥', 'Unicorn': '🦄', 'Pegasus': '🐴',
        'Mead': '🍯', 'Wine': '🍷', 'Ale': '🍺', 'Cider': '🍎', 'Water': '💧'
      },
      'cyberpunk-city': {
        'Holo-Cat': '🐱', 'Cyber-Dog': '🤖', 'Data-Bird': '🐦', 'Nano-Fish': '🐟', 'Quantum-Rabbit': '🐰',
        'Synth-Cola': '🥤', 'Neural-Coffee': '☕', 'Bio-Water': '💧', 'Energy-Boost': '⚡', 'Nano-Tea': '🍵'
      },
      'pirate-ships': {
        'Parrot': '🦜', 'Monkey': '🐒', 'Sea Turtle': '🐢', 'Octopus': '🐙', 'Shark': '🦈',
        'Rum': '🥃', 'Grog': '🍺', 'Water': '💧', 'Wine': '🍷', 'Coconut Milk': '🥥'
      }
    };

    const iconMap = iconMaps[currentPuzzle.id] || iconMaps['classic-zebra'];
    return iconMap[value] || '';
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <div className={`bg-gradient-to-r px-6 py-4 ${
        currentPuzzle.id === 'space-station' ? 'from-slate-600 to-blue-600' :
        currentPuzzle.id === 'medieval-castle' ? 'from-red-600 to-yellow-600' :
        currentPuzzle.id === 'cyberpunk-city' ? 'from-purple-600 to-pink-600' :
        currentPuzzle.id === 'pirate-ships' ? 'from-gray-800 to-red-600' :
        'from-indigo-600 to-purple-600'
      }`}>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">{currentPuzzle.emoji}</span>
          {currentPuzzle.name} - House Attributes
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b border-gray-200">
                Attribute
              </th>
              {[1, 2, 3, 4, 5].map(houseNum => (
                <th key={houseNum} className="px-4 py-3 text-center font-semibold text-gray-700 border-b border-gray-200">
                  House {houseNum}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attributeLabels.map((label, rowIndex) => (
              <tr key={label} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 font-medium text-gray-800 bg-gray-50 border-r border-gray-200">
                  {label}
                </td>
                {houses.map((house, colIndex) => {
                  const attribute = attributes[rowIndex];
                  const value = house[attribute as keyof House] as string;
                  const bgColor = attribute === 'color' ? getHouseColor(value) : 'bg-white';
                  const icon = getAttributeIcon(attribute, value);
                  
                  return (
                    <td 
                      key={`${rowIndex}-${colIndex}`}
                      className={`px-4 py-4 text-center border-r border-gray-100 transition-all duration-500 ${bgColor} ${
                        isSolved ? 'animate-pulse-once' : ''
                      }`}
                    >
                      {isLoading ? (
                        <div className="animate-pulse bg-gray-200 h-6 rounded"></div>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          {icon && <span className="text-lg">{icon}</span>}
                          <span className={`font-medium ${
                            bgColor.includes('gray-900') ? 'text-white' : 'text-gray-800'
                          }`}>
                            {value || '?'}
                          </span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PuzzleGrid;