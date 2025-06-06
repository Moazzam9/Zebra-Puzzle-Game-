import React from 'react';
import { Shuffle, Clock, Target, Zap } from 'lucide-react';
import { PuzzleTemplate, PUZZLE_TEMPLATES } from '../types/puzzle';

interface PuzzleSelectorProps {
  currentPuzzle: PuzzleTemplate;
  onPuzzleSelect: (puzzle: PuzzleTemplate) => void;
  onRandomPuzzle: () => void;
  isLoading: boolean;
}

const PuzzleSelector: React.FC<PuzzleSelectorProps> = ({ 
  currentPuzzle, 
  onPuzzleSelect, 
  onRandomPuzzle,
  isLoading 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            🎯 Choose Your Puzzle
          </h3>
          <button
            onClick={onRandomPuzzle}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50"
          >
            <Shuffle className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {PUZZLE_TEMPLATES.map((puzzle) => (
            <div
              key={puzzle.id}
              onClick={() => !isLoading && onPuzzleSelect(puzzle)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-[1.02] ${
                currentPuzzle.id === puzzle.id
                  ? 'border-purple-500 bg-purple-50 shadow-lg'
                  : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-25'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{puzzle.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-gray-900">{puzzle.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(puzzle.difficulty)}`}>
                      {puzzle.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{puzzle.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{puzzle.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      <span>{puzzle.theme}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600 font-medium">
                      {puzzle.questions.primary}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PuzzleSelector;