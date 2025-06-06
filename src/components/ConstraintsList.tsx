import React from 'react';
import { CheckCircle } from 'lucide-react';
import { PuzzleTemplate } from '../types/puzzle';

interface ConstraintsListProps {
  isSolved?: boolean;
  currentPuzzle: PuzzleTemplate;
}

const ConstraintsList: React.FC<ConstraintsListProps> = ({ isSolved, currentPuzzle }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
      <div className={`bg-gradient-to-r px-6 py-4 ${
        currentPuzzle.id === 'space-station' ? 'from-slate-600 to-blue-600' :
        currentPuzzle.id === 'medieval-castle' ? 'from-red-600 to-yellow-600' :
        currentPuzzle.id === 'cyberpunk-city' ? 'from-purple-600 to-pink-600' :
        currentPuzzle.id === 'pirate-ships' ? 'from-gray-800 to-red-600' :
        'from-emerald-600 to-teal-600'
      }`}>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          📋 Puzzle Constraints
        </h3>
        <p className="text-white/80 text-sm mt-1">
          {currentPuzzle.theme} • {currentPuzzle.difficulty}
        </p>
      </div>
      <div className="p-6">
        <div className="grid gap-3 max-h-96 overflow-y-auto">
          {currentPuzzle.constraints.map((constraint, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                isSolved 
                  ? 'bg-green-50 hover:bg-green-100 border border-green-200' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors ${
                isSolved ? 'text-green-500' : 'text-emerald-500'
              }`} />
              <span className="text-sm text-gray-700 leading-relaxed">
                <span className={`font-semibold ${
                  isSolved ? 'text-green-600' : 'text-emerald-600'
                }`}>
                  #{index + 1}:
                </span> {constraint}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
          <h4 className="font-bold text-purple-800 mb-2">🎯 Puzzle Goals:</h4>
          <div className="space-y-1 text-sm text-purple-700">
            <div>• {currentPuzzle.questions.primary}</div>
            <div>• {currentPuzzle.questions.secondary}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstraintsList;