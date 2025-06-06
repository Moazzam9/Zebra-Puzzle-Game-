# Zebra Puzzle Game - Interactive Logic Puzzle Solver

## Project Overview
This is an interactive web application that implements the classic Zebra Puzzle (also known as Einstein's Riddle) with a modern twist. The application provides an engaging user interface for solving various logic puzzles while offering features like puzzle selection, hints, and real-time feedback. The project demonstrates advanced web development concepts and modern UI/UX practices, combining a React frontend with a Python-based constraint satisfaction solver.

## Features

### Core Functionality
- Interactive puzzle solving interface with drag-and-drop support
- Multiple puzzle templates with unique themes and storylines
- Real-time puzzle state visualization with instant feedback
- Automatic puzzle solver with constraint satisfaction algorithm
- Python-based backend solver using backtracking algorithm
- Puzzle selection system with preview capabilities
- Random puzzle generation with unique combinations
- Dynamic constraint validation and error checking
- Progress saving and state management

### Backend Solver
- Python-based constraint satisfaction solver
- Efficient backtracking algorithm implementation
- Support for multiple puzzle templates
- Real-time constraint validation
- Thread-safe solving mechanism
- Extensible constraint system
- Performance optimized for quick solutions

// ... existing code ...

## Project Structure
```
├── src/
│   ├── components/     # React components
│   │   ├── PuzzleGrid.tsx
│   │   ├── SolutionDisplay.tsx
│   │   ├── ConstraintsList.tsx
│   │   ├── StatsPanel.tsx
│   │   ├── AnimatedBackground.tsx
│   │   └── PuzzleSelector.tsx
│   ├── types/         # TypeScript type definitions
│   │   ├── puzzle.ts
│   │   └── solver.ts
│   ├── utils/         # Utility functions and puzzle solver
│   │   ├── solver.ts
│   │   └── audio.ts
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
├── zebra_puzzle_solver.py  # Python-based constraint satisfaction solver
├── public/            # Static assets
└── configuration files
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json
```

## Key Components

### Python Solver (zebra_puzzle_solver.py)
- Implements constraint satisfaction algorithm
- Uses backtracking for efficient puzzle solving
- Handles multiple puzzle templates
- Provides real-time constraint validation
- Thread-safe solving mechanism
- Extensible constraint system
- Performance optimized implementation

// ... existing code ...

## Technology Stack
- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Backend Solver**: Python 3.x
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.344.0
- **Development Tools**: 
  - ESLint 9.9.1
  - PostCSS 8.4.35
  - Autoprefixer 10.4.18
  - TypeScript ESLint 8.3.0

// ... existing code ...

## Getting Started

### Prerequisites
- Node.js (latest LTS version recommended)
- Python 3.x
- npm or yarn package manager
- Modern web browser with JavaScript enabled

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd zebra-puzzle-game
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

// ... rest of existing code ...
