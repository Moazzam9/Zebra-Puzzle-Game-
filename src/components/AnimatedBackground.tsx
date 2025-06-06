import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg opacity-20 animate-float-delayed"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-20 right-40 w-18 h-18 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg opacity-20 animate-float"></div>
      
      {/* Puzzle piece shapes */}
      <div className="absolute top-60 left-1/4 text-6xl opacity-10 animate-pulse">🧩</div>
      <div className="absolute bottom-60 right-1/4 text-5xl opacity-10 animate-pulse delay-1000">🔍</div>
      <div className="absolute top-1/3 right-10 text-4xl opacity-10 animate-pulse delay-2000">⚡</div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-gray-300"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;