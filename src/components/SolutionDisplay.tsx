import React from 'react';
import { Trophy, Zap, Clock, Target } from 'lucide-react';

interface SolutionDisplayProps {
  zebraOwner: string | null;
  waterDrinker: string | null;
  isSolved: boolean;
  solveTime?: number;
  currentPuzzle?: {
    questions: {
      primary: string;
      secondary: string;
    };
    theme: string;
    emoji: string;
  };
}

const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ 
  zebraOwner, 
  waterDrinker, 
  isSolved, 
  solveTime,
  currentPuzzle 
}) => {
  if (!isSolved) return null;

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  // Extract the target items from questions
  const primaryTarget = currentPuzzle?.questions.primary.toLowerCase().includes('zebra') ? 'zebra' :
                       currentPuzzle?.questions.primary.toLowerCase().includes('quantum') ? 'quantum mouse' :
                       currentPuzzle?.questions.primary.toLowerCase().includes('pegasus') ? 'pegasus' :
                       currentPuzzle?.questions.primary.toLowerCase().includes('rabbit') ? 'quantum-rabbit' :
                       currentPuzzle?.questions.primary.toLowerCase().includes('shark') ? 'shark' : 'special item';

  const secondaryTarget = currentPuzzle?.questions.secondary.toLowerCase().includes('water') ? 'water' :
                         currentPuzzle?.questions.secondary.toLowerCase().includes('protein') ? 'protein shakes' :
                         currentPuzzle?.questions.secondary.toLowerCase().includes('nano-tea') ? 'nano-tea' :
                         currentPuzzle?.questions.secondary.toLowerCase().includes('coconut') ? 'coconut milk' : 'special drink';

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl shadow-2xl p-8 text-white animate-slide-up">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-white/20 p-4 rounded-full">
          <Trophy className="w-10 h-10 animate-bounce" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Puzzle Solved! 🎉</h2>
          <p className="text-xl opacity-90">{currentPuzzle?.theme} Challenge Complete!</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/30">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{currentPuzzle?.emoji || '🎯'}</span>
            <h3 className="font-bold text-xl">Primary Answer</h3>
          </div>
          <p className="text-2xl font-bold">
            The <span className="underline decoration-4 decoration-white/50">{zebraOwner}</span> owns the {primaryTarget}!
          </p>
        </div>
        
        <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/30">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">💧</span>
            <h3 className="font-bold text-xl">Secondary Answer</h3>
          </div>
          <p className="text-2xl font-bold">
            The <span className="underline decoration-4 decoration-white/50">{waterDrinker}</span> drinks {secondaryTarget}!
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/30">
        <div className="flex items-center gap-3 text-lg opacity-90">
          <Zap className="w-5 h-5" />
          <span>Solved using AI constraint satisfaction</span>
        </div>
        
        {solveTime && (
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">Solved in {formatTime(solveTime)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionDisplay;