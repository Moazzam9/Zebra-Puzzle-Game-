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

### User Experience
- Animated background effects with particle systems
- Custom sound effects for all interactions using Web Audio API
- Celebration animations on puzzle completion with confetti effects
- Intelligent hint system with contextual rotating tips
- Comprehensive statistics tracking (solve time, attempts, success rate)
- Responsive design using Tailwind CSS for all screen sizes
- Dark/Light mode support
- Keyboard shortcuts for common actions
- Accessibility features (ARIA labels, keyboard navigation)

### Technical Features
- Built with React 18 and TypeScript for type safety
- Vite for fast development and optimized production builds
- Tailwind CSS for utility-first styling
- Custom audio synthesis for dynamic sound effects
- Modular component architecture with custom hooks
- State management using React Context and Hooks
- Performance optimizations with React.memo and useCallback
- Error boundary implementation for graceful error handling
- Progressive Web App (PWA) capabilities

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

### PuzzleGrid
- Displays the 5x5 grid representing houses and their attributes
- Implements drag-and-drop functionality for puzzle solving
- Real-time validation of moves
- Visual feedback for valid/invalid placements
- Responsive grid layout for all screen sizes

### SolutionDisplay
- Shows the final solution when the puzzle is solved
- Displays answers to the puzzle's questions
- Animated reveal of solution
- Export solution functionality
- Share solution on social media

### ConstraintsList
- Displays the current puzzle's constraints and rules
- Interactive constraint highlighting
- Filter and search capabilities
- Collapsible sections for better organization
- Visual indicators for satisfied constraints

### StatsPanel
- Tracks and displays user statistics
- Real-time solve time counter
- Attempt counter with success rate
- Historical performance graphs
- Achievement tracking

### PuzzleSelector
- Grid view of available puzzles
- Preview functionality
- Random puzzle generation
- Difficulty indicators
- Favorite puzzles system

### Python Solver (zebra_puzzle_solver.py)
- Implements constraint satisfaction algorithm
- Uses backtracking for efficient puzzle solving
- Handles multiple puzzle templates
- Provides real-time constraint validation
- Thread-safe solving mechanism
- Extensible constraint system
- Performance optimized implementation

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

### Building for Production
```bash
npm run build
```

### Running Tests
```bash
npm test
```

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments
- Follow ESLint configuration

### Performance Optimization
- Use React.memo for expensive components
- Implement proper dependency arrays in hooks
- Optimize re-renders
- Lazy load components when possible
- Use proper caching strategies

## Future Enhancements
- User authentication and progress saving
- Additional puzzle templates with custom themes
- Multiple difficulty levels
- Real-time multiplayer mode
- Achievement system with badges
- Custom puzzle creation
- Mobile app version
- Internationalization support
- Advanced analytics dashboard
- Integration with social platforms

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is open source and available under the MIT License.

## Acknowledgments
- Inspired by the classic Zebra Puzzle
- Built as a semester project to demonstrate modern web development practices
- Special thanks to the open-source community for their tools and libraries 