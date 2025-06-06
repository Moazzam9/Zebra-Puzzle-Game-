import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Info, Loader2, Zap, Trophy, Target, Clock, Brain, Shuffle } from 'lucide-react';
import { ZebraPuzzleSolver } from './utils/solver';
import { House, PuzzleState, getRandomPuzzle, getPuzzleById, PUZZLE_TEMPLATES } from './types/puzzle';
import PuzzleGrid from './components/PuzzleGrid';
import SolutionDisplay from './components/SolutionDisplay';
import ConstraintsList from './components/ConstraintsList';
import StatsPanel from './components/StatsPanel';
import AnimatedBackground from './components/AnimatedBackground';
import PuzzleSelector from './components/PuzzleSelector';

function App() {
  const [puzzleState, setPuzzleState] = useState<PuzzleState>({
    houses: Array(5).fill(null).map((_, i) => ({
      position: i + 1,
      color: '',
      nationality: '',
      pet: '',
      drink: '',
      cigarette: ''
    })),
    isLoading: false,
    isSolved: false,
    zebraOwner: null,
    waterDrinker: null,
    currentPuzzle: PUZZLE_TEMPLATES[0]
  });

  const [showInfo, setShowInfo] = useState(false);
  const [showPuzzleSelector, setShowPuzzleSelector] = useState(false);
  const [solveTime, setSolveTime] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hintMode, setHintMode] = useState(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  const hints = [
    "🎯 Start with the fixed constraints - they give you anchor points!",
    "🏠 Pay attention to positional clues - 'first house', 'center house', etc.",
    "🔗 Look for 'next to' relationships - they create chains of logic!",
    "🎨 House colors often unlock multiple other attributes!",
    "🧩 Each puzzle has a unique theme - use it to remember the story!"
  ];

  useEffect(() => {
    if (hintMode) {
      const interval = setInterval(() => {
        setCurrentHint(hints[Math.floor(Math.random() * hints.length)]);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [hintMode]);

  const playSound = (type: 'click' | 'success' | 'solve' | 'newPuzzle') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      };

      switch (type) {
        case 'click':
          createTone(800, 0.1);
          break;
        case 'success':
          createTone(523, 0.2);
          setTimeout(() => createTone(659, 0.2), 100);
          setTimeout(() => createTone(784, 0.3), 200);
          break;
        case 'solve':
          [523, 659, 784, 1047].forEach((freq, i) => {
            setTimeout(() => createTone(freq, 0.3), i * 150);
          });
          break;
        case 'newPuzzle':
          createTone(440, 0.2);
          setTimeout(() => createTone(554, 0.2), 150);
          break;
      }
    } catch (error) {
      // Silently fail if audio context is not available
    }
  };

  const selectPuzzle = (puzzle: any) => {
    playSound('newPuzzle');
    setPuzzleState(prev => ({
      ...prev,
      currentPuzzle: puzzle,
      houses: Array(5).fill(null).map((_, i) => ({
        position: i + 1,
        color: '',
        nationality: '',
        pet: '',
        drink: '',
        cigarette: ''
      })),
      isSolved: false,
      zebraOwner: null,
      waterDrinker: null
    }));
    setShowPuzzleSelector(false);
    setSolveTime(0);
  };

  const generateRandomPuzzle = () => {
    const randomPuzzle = getRandomPuzzle();
    selectPuzzle(randomPuzzle);
  };

  const solvePuzzle = async () => {
    playSound('click');
    setAttempts(prev => prev + 1);
    setPuzzleState(prev => ({ ...prev, isLoading: true, isSolved: false }));
    
    const startTime = Date.now();
    const solver = new ZebraPuzzleSolver(puzzleState.currentPuzzle);
    const solution = await solver.solve();
    const endTime = Date.now();
    
    setSolveTime(endTime - startTime);
    
    if (solution) {
      // Find answers based on puzzle questions
      const puzzle = puzzleState.currentPuzzle;
      let primaryAnswer = null;
      let secondaryAnswer = null;

      // Extract target items from questions
      if (puzzle.questions.primary.toLowerCase().includes('zebra')) {
        primaryAnswer = solution.find(h => h.pet === 'Zebra')?.nationality || null;
      } else if (puzzle.questions.primary.toLowerCase().includes('quantum mouse')) {
        primaryAnswer = solution.find(h => h.pet === 'Quantum Mouse')?.nationality || null;
      } else if (puzzle.questions.primary.toLowerCase().includes('pegasus')) {
        primaryAnswer = solution.find(h => h.pet === 'Pegasus')?.nationality || null;
      } else if (puzzle.questions.primary.toLowerCase().includes('rabbit')) {
        primaryAnswer = solution.find(h => h.pet === 'Quantum-Rabbit')?.nationality || null;
      } else if (puzzle.questions.primary.toLowerCase().includes('shark')) {
        primaryAnswer = solution.find(h => h.pet === 'Shark')?.nationality || null;
      }

      if (puzzle.questions.secondary.toLowerCase().includes('water')) {
        secondaryAnswer = solution.find(h => h.drink === 'Water')?.nationality || null;
      } else if (puzzle.questions.secondary.toLowerCase().includes('protein')) {
        secondaryAnswer = solution.find(h => h.drink === 'Protein Shake')?.nationality || null;
      } else if (puzzle.questions.secondary.toLowerCase().includes('nano-tea')) {
        secondaryAnswer = solution.find(h => h.drink === 'Nano-Tea')?.nationality || null;
      } else if (puzzle.questions.secondary.toLowerCase().includes('coconut')) {
        secondaryAnswer = solution.find(h => h.drink === 'Coconut Milk')?.nationality || null;
      }
      
      setPuzzleState(prev => ({
        ...prev,
        houses: solution,
        isLoading: false,
        isSolved: true,
        zebraOwner: primaryAnswer,
        waterDrinker: secondaryAnswer
      }));

      // Trigger celebration
      setShowCelebration(true);
      playSound('solve');
      setTimeout(() => setShowCelebration(false), 3000);
    } else {
      setPuzzleState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const resetPuzzle = () => {
    playSound('click');
    setPuzzleState(prev => ({
      ...prev,
      houses: Array(5).fill(null).map((_, i) => ({
        position: i + 1,
        color: '',
        nationality: '',
        pet: '',
        drink: '',
        cigarette: ''
      })),
      isLoading: false,
      isSolved: false,
      zebraOwner: null,
      waterDrinker: null
    }));
    setShowCelebration(false);
    setSolveTime(0);
  };

  const toggleHints = () => {
    setHintMode(!hintMode);
    playSound('click');
    if (!hintMode) {
      setCurrentHint(hints[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-white text-center animate-bounce shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2">Puzzle Solved!</h2>
            <p className="text-xl">{puzzleState.currentPuzzle.theme} mastered! 🧠</p>
            <div className="flex justify-center gap-4 mt-4 text-4xl">
              <span className="animate-pulse">{puzzleState.currentPuzzle.emoji}</span>
              <span className="animate-pulse delay-100">💧</span>
              <span className="animate-pulse delay-200">🏆</span>
            </div>
          </div>
        </div>
      )}

      {/* Puzzle Selector Modal */}
      {showPuzzleSelector && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <PuzzleSelector
              currentPuzzle={puzzleState.currentPuzzle}
              onPuzzleSelect={selectPuzzle}
              onRandomPuzzle={generateRandomPuzzle}
              isLoading={puzzleState.isLoading}
            />
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowPuzzleSelector(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-3xl animate-pulse">{puzzleState.currentPuzzle.emoji}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Logic Puzzle Solver
                </h1>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  {puzzleState.currentPuzzle.name} • {puzzleState.currentPuzzle.theme}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPuzzleSelector(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <Shuffle className="w-5 h-5" />
                <span className="hidden sm:inline">New Puzzle</span>
              </button>

              <button
                onClick={toggleHints}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                  hintMode 
                    ? 'bg-yellow-500 text-white shadow-lg' 
                    : 'text-yellow-600 hover:bg-yellow-50'
                }`}
              >
                <Target className="w-5 h-5" />
                <span className="hidden sm:inline">Hints</span>
              </button>
              
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all transform hover:scale-105"
              >
                <Info className="w-5 h-5" />
                <span className="hidden sm:inline">About</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Hint Banner */}
        {hintMode && currentHint && (
          <div className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-4 text-white shadow-lg animate-slide-down">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 animate-pulse" />
              <p className="font-semibold text-lg">{currentHint}</p>
            </div>
          </div>
        )}

        {/* Info Panel */}
        {showInfo && (
          <div className="mb-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-8 animate-slide-down">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              About Logic Puzzle Solver
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="prose text-gray-700 max-w-none">
                <p className="mb-4 text-lg">
                  Experience multiple themed logic puzzles, each with unique constraints and storylines. 
                  From Einstein's classic Zebra Puzzle to futuristic space stations and medieval castles!
                </p>
                <p className="mb-4">
                  Each puzzle has 5 houses/locations with 5 different attributes. Use logical deduction 
                  to solve the constraints and find the answers to the key questions.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3 text-indigo-800">🧠 AI Solving Method</h3>
                <p className="text-gray-700 mb-4">
                  Advanced constraint satisfaction with intelligent backtracking analyzes all possible 
                  combinations to find the unique solution.
                </p>
                <div className="space-y-2 text-sm text-indigo-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Solves in milliseconds to seconds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>{PUZZLE_TEMPLATES.length} unique puzzle themes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Panel */}
        <StatsPanel 
          attempts={attempts}
          solveTime={solveTime}
          isSolved={puzzleState.isSolved}
          currentPuzzle={puzzleState.currentPuzzle}
        />

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={solvePuzzle}
            disabled={puzzleState.isLoading}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
          >
            {puzzleState.isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg">Solving...</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                </div>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 group-hover:animate-pulse" />
                <span className="text-lg">Solve Puzzle</span>
                <Zap className="w-5 h-5 opacity-70" />
              </>
            )}
          </button>
          
          <button
            onClick={resetPuzzle}
            className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Reset</span>
          </button>

          {puzzleState.isSolved && (
            <button
              onClick={() => {
                playSound('success');
                setShowCelebration(true);
                setTimeout(() => setShowCelebration(false), 2000);
              }}
              className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Trophy className="w-5 h-5" />
              <span>Celebrate!</span>
            </button>
          )}
        </div>

        {/* Solution Display */}
        <SolutionDisplay 
          zebraOwner={puzzleState.zebraOwner}
          waterDrinker={puzzleState.waterDrinker}
          isSolved={puzzleState.isSolved}
          solveTime={solveTime}
          currentPuzzle={puzzleState.currentPuzzle}
        />

        {puzzleState.isSolved && <div className="mb-8" />}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Puzzle Grid */}
          <div className="lg:col-span-2">
            <PuzzleGrid 
              houses={puzzleState.houses} 
              isLoading={puzzleState.isLoading}
              isSolved={puzzleState.isSolved}
              currentPuzzle={puzzleState.currentPuzzle}
            />
          </div>
          
          {/* Constraints List */}
          <div className="lg:col-span-1">
            <ConstraintsList 
              isSolved={puzzleState.isSolved}
              currentPuzzle={puzzleState.currentPuzzle}
            />
          </div>
        </div>

        {/* Status */}
        <div className="mt-12 text-center">
          {puzzleState.isLoading && (
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-200"></div>
              </div>
              <p className="text-lg font-medium">
                AI is analyzing {(5**5).toLocaleString()} possible combinations...
              </p>
            </div>
          )}
          {!puzzleState.isLoading && !puzzleState.isSolved && (
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200">
              <p className="text-gray-600 text-lg mb-2">
                Ready to solve <strong>{puzzleState.currentPuzzle.name}</strong>!
              </p>
              <p className="text-gray-500">
                Click "Solve Puzzle" to discover the answers, or try a different puzzle theme!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;