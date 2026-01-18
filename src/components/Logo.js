import React from 'react';

const Logo = () => {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="glowria-logo"
    >
      {/* Decorative Pink Arcs - Surrounding the logo */}
      <path 
        d="M 100 20 A 80 80 0 0 1 180 100" 
        stroke="#FFB6C1" 
        strokeWidth="2" 
        fill="none"
        opacity="0.6"
      />
      <path 
        d="M 100 180 A 80 80 0 0 1 20 100" 
        stroke="#FFB6C1" 
        strokeWidth="2" 
        fill="none"
        opacity="0.6"
      />
      <path 
        d="M 20 100 A 80 80 0 0 1 100 20" 
        stroke="#FFB6C1" 
        strokeWidth="2" 
        fill="none"
        opacity="0.6"
      />
      <path 
        d="M 180 100 A 80 80 0 0 1 100 180" 
        stroke="#FFB6C1" 
        strokeWidth="2" 
        fill="none"
        opacity="0.6"
      />
      
      {/* Central Circular Logo */}
      <circle 
        cx="100" 
        cy="100" 
        r="70" 
        fill="white" 
        stroke="#FFB6C1" 
        strokeWidth="1.5"
      />
      <circle 
        cx="100" 
        cy="100" 
        r="68" 
        fill="none" 
        stroke="#FF69B4" 
        strokeWidth="2"
      />
      
      {/* Crown */}
      <g id="crown">
        {/* Main crown base */}
        <path 
          d="M 60 120 L 70 100 L 80 105 L 90 100 L 100 105 L 110 100 L 120 105 L 130 100 L 140 120 Z" 
          fill="#FF69B4" 
          stroke="#FF1493" 
          strokeWidth="1"
        />
        
        {/* Center peak - tallest with heart */}
        <path 
          d="M 100 105 L 100 75 L 105 105" 
          fill="#FF1493" 
          stroke="#DC143C" 
          strokeWidth="1"
        />
        {/* Heart on top */}
        <path 
          d="M 99 75 Q 100 73 101 75 Q 100 77 99 75" 
          fill="#DC143C"
        />
        
        {/* Large heart in center */}
        <path 
          d="M 99 90 Q 100 88 101 90 Q 100 92 99 90" 
          fill="#FF1493"
        />
        
        {/* Adjacent peaks - medium height */}
        <path 
          d="M 80 105 L 82 90 L 84 105" 
          fill="#FF1493" 
          stroke="#DC143C" 
          strokeWidth="0.8"
        />
        <path 
          d="M 120 105 L 122 90 L 124 105" 
          fill="#FF1493" 
          stroke="#DC143C" 
          strokeWidth="0.8"
        />
        
        {/* Outer peaks - shorter */}
        <path 
          d="M 70 105 L 71 95 L 72 105" 
          fill="#FF1493" 
          stroke="#DC143C" 
          strokeWidth="0.8"
        />
        <path 
          d="M 130 105 L 131 95 L 132 105" 
          fill="#FF1493" 
          stroke="#DC143C" 
          strokeWidth="0.8"
        />
        
        {/* Crown jewels along base - light pink dots */}
        <circle cx="75" cy="115" r="2" fill="#FFB6C1" />
        <circle cx="85" cy="115" r="2" fill="#FFB6C1" />
        <circle cx="95" cy="115" r="2" fill="#FFB6C1" />
        <circle cx="105" cy="115" r="2" fill="#FFB6C1" />
        <circle cx="115" cy="115" r="2" fill="#FFB6C1" />
        <circle cx="125" cy="115" r="2" fill="#FFB6C1" />
        
        {/* Sparkles around crown */}
        <path d="M 75 85 L 75.5 86.5 L 77 86.5 L 75.75 87.5 L 76 89 L 75 88 L 74 89 L 74.25 87.5 L 73 86.5 L 74.5 86.5 Z" fill="#FFB6C1" opacity="0.9" />
        <path d="M 125 85 L 125.5 86.5 L 127 86.5 L 125.75 87.5 L 126 89 L 125 88 L 124 89 L 124.25 87.5 L 123 86.5 L 124.5 86.5 Z" fill="#FFB6C1" opacity="0.9" />
        <path d="M 65 95 L 65.5 96.5 L 67 96.5 L 65.75 97.5 L 66 99 L 65 98 L 64 99 L 64.25 97.5 L 63 96.5 L 64.5 96.5 Z" fill="#FFB6C1" opacity="0.7" />
        <path d="M 135 95 L 135.5 96.5 L 137 96.5 L 135.75 97.5 L 136 99 L 135 98 L 134 99 L 134.25 97.5 L 133 96.5 L 134.5 96.5 Z" fill="#FFB6C1" opacity="0.7" />
        <path d="M 90 80 L 90.5 81.5 L 92 81.5 L 90.75 82.5 L 91 84 L 90 83 L 89 84 L 89.25 82.5 L 88 81.5 L 89.5 81.5 Z" fill="#FFB6C1" opacity="0.8" />
        <path d="M 110 80 L 110.5 81.5 L 112 81.5 L 110.75 82.5 L 111 84 L 110 83 L 109 84 L 109.25 82.5 L 108 81.5 L 109.5 81.5 Z" fill="#FFB6C1" opacity="0.8" />
      </g>
      
      {/* Glowria Text - Elegant Script */}
      <text 
        x="100" 
        y="145" 
        fontFamily="'Brush Script MT', 'Lucida Handwriting', cursive" 
        fontSize="24" 
        fontWeight="600" 
        fill="#FF69B4" 
        textAnchor="middle"
        className="logo-text"
      >
        Glowria
      </text>
      
      {/* BEAUTY CARE Text */}
      <text 
        x="100" 
        y="165" 
        fontFamily="Arial, sans-serif" 
        fontSize="10" 
        fontWeight="400" 
        fill="#FFB6C1" 
        textAnchor="middle"
        letterSpacing="2px"
      >
        BEAUTY CARE
      </text>
    </svg>
  );
};

export default Logo;

