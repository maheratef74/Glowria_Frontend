import React from 'react';

const Logo = () => {
  return (
    <svg 
      width="160" 
      height="55" 
      viewBox="0 0 160 55" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="glowria-logo"
    >
      {/* Crown with Gold Color */}
      <g id="crown">
        {/* Main crown base */}
        <path 
          d="M15 38 L25 22 L35 26 L45 22 L55 26 L65 22 L75 26 L80 22 L85 26 L95 22 L105 26 L115 22 L125 26 L135 22 L145 38 Z" 
          fill="#fbbf24" 
          stroke="#f59e0b" 
          strokeWidth="1.5"
        />
        {/* Center peak - tallest with heart */}
        <path 
          d="M80 22 L80 8 L85 22" 
          fill="#f59e0b" 
          stroke="#d97706" 
          strokeWidth="1"
        />
        <path 
          d="M79 8 Q80 6 81 8 Q80 10 79 8" 
          fill="#d97706"
        />
        {/* Adjacent peaks - medium height */}
        <path 
          d="M65 26 L67 16 L69 26" 
          fill="#f59e0b" 
          stroke="#d97706" 
          strokeWidth="0.8"
        />
        <path 
          d="M95 26 L97 16 L99 26" 
          fill="#f59e0b" 
          stroke="#d97706" 
          strokeWidth="0.8"
        />
        {/* Outer peaks - shortest */}
        <path 
          d="M45 26 L46 20 L47 26" 
          fill="#f59e0b" 
          stroke="#d97706" 
          strokeWidth="0.8"
        />
        <path 
          d="M115 26 L116 20 L117 26" 
          fill="#f59e0b" 
          stroke="#d97706" 
          strokeWidth="0.8"
        />
        {/* Crown jewels along base */}
        <circle cx="35" cy="34" r="2.5" fill="#fbbf24" />
        <circle cx="50" cy="34" r="2.5" fill="#fbbf24" />
        <circle cx="65" cy="34" r="2.5" fill="#fbbf24" />
        <circle cx="80" cy="34" r="2.5" fill="#fbbf24" />
        <circle cx="95" cy="34" r="2.5" fill="#fbbf24" />
        <circle cx="110" cy="34" r="2.5" fill="#fbbf24" />
        <circle cx="125" cy="34" r="2.5" fill="#fbbf24" />
        {/* Sparkles around crown */}
        <path d="M70 12 L70.5 13.5 L72 13.5 L70.75 14.5 L71 16 L70 15 L69 16 L69.25 14.5 L68 13.5 L69.5 13.5 Z" fill="#fbbf24" opacity="0.9" />
        <path d="M90 12 L90.5 13.5 L92 13.5 L90.75 14.5 L91 16 L90 15 L89 16 L89.25 14.5 L88 13.5 L89.5 13.5 Z" fill="#fbbf24" opacity="0.9" />
        <path d="M60 18 L60.5 19.5 L62 19.5 L60.75 20.5 L61 22 L60 21 L59 22 L59.25 20.5 L58 19.5 L59.5 19.5 Z" fill="#fbbf24" opacity="0.7" />
        <path d="M100 18 L100.5 19.5 L102 19.5 L100.75 20.5 L101 22 L100 21 L99 22 L99.25 20.5 L98 19.5 L99.5 19.5 Z" fill="#fbbf24" opacity="0.7" />
      </g>
      
      {/* Glowria Text - Elegant Script */}
      <text 
        x="80" 
        y="48" 
        fontFamily="'Brush Script MT', 'Lucida Handwriting', cursive" 
        fontSize="22" 
        fontWeight="600" 
        fill="#8b5cf6" 
        textAnchor="middle"
        className="logo-text"
        style={{ letterSpacing: '1px' }}
      >
        Glowria
      </text>
    </svg>
  );
};

export default Logo;

