import React from 'react';

interface NeonFrameProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'high';
}

export const NeonFrame: React.FC<NeonFrameProps> = ({ children, className = '', intensity = 'high' }) => {
  // Styles for the "bulbs" around the frame
  const bulbBaseClass = "absolute w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]";
  const bulbOnClass = "bg-yellow-200 animate-pulse";
  
  // Create an array of bulbs for visual decoration
  const bulbs = Array.from({ length: 12 }).map((_, i) => (
    <div 
      key={i} 
      className={`${bulbBaseClass} ${bulbOnClass}`}
      style={{
        top: i < 4 ? '-6px' : i > 7 ? 'auto' : `${(i - 3) * 25}%`,
        bottom: i > 7 ? '-6px' : 'auto',
        left: i < 4 ? `${i * 33}%` : i === 11 ? '0' : i === 4 ? '100%' : i > 7 ? `${(11 - i) * 33}%` : (i === 7 ? '0' : '100%'),
        right: i === 4 || i === 5 || i === 6 ? '-6px' : 'auto',
        transform: 'translate(-50%, -50%)'
      }}
    />
  ));

  const borderGlow = intensity === 'high' 
    ? "border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)]" 
    : "border-red-800 shadow-[0_0_15px_rgba(220,38,38,0.3)]";

  return (
    <div className={`relative p-6 border-4 rounded-xl bg-black/80 backdrop-blur-sm ${borderGlow} ${className}`}>
      {/* Corner Stickers */}
      <div className="absolute -top-6 -left-6 text-4xl transform -rotate-12 z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">🥘</div>
      <div className="absolute -bottom-6 -right-6 text-4xl transform rotate-12 z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">💃</div>
      <div className="absolute -top-6 -right-6 text-4xl transform rotate-45 z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">💀</div>
      <div className="absolute -bottom-6 -left-6 text-4xl transform -rotate-45 z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">🪭</div>

      {children}
    </div>
  );
};
