import React from 'react';
import { Clock, Target, Trophy, Zap } from 'lucide-react';

interface StatsPanelProps {
  attempts: number;
  solveTime: number;
  isSolved: boolean;
  currentPuzzle?: {
    difficulty: string;
    estimatedTime: string;
  };
}

const StatsPanel: React.FC<StatsPanelProps> = ({ attempts, solveTime, isSolved, currentPuzzle }) => {
  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getPerformanceRating = () => {
    if (!isSolved) return null;
    
    const timeInSeconds = solveTime / 1000;
    if (timeInSeconds < 1) return { rating: 'Lightning Fast!', color: 'text-yellow-600', emoji: '⚡' };
    if (timeInSeconds < 5) return { rating: 'Excellent!', color: 'text-green-600', emoji: '🚀' };
    if (timeInSeconds < 10) return { rating: 'Good!', color: 'text-blue-600', emoji: '👍' };
    return { rating: 'Solved!', color: 'text-purple-600', emoji: '✅' };
  };

  const performance = getPerformanceRating();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-600">Attempts</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{attempts}</div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-gray-600">Solve Time</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {solveTime > 0 ? formatTime(solveTime) : '--'}
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-medium text-gray-600">Difficulty</span>
        </div>
        <div className="text-lg font-bold text-gray-900">
          {currentPuzzle?.difficulty || 'Unknown'}
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-600">Performance</span>
        </div>
        <div className={`text-lg font-bold ${performance?.color || 'text-gray-400'}`}>
          {performance ? (
            <span className="flex items-center gap-1">
              <span>{performance.emoji}</span>
              <span className="text-sm">{performance.rating}</span>
            </span>
          ) : (
            '--'
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;