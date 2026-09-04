import React from 'react';

export const ZeusLogo = ({ width = 34, height = 34, color = "#FFFFFF" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tapón Minimalista */}
      <rect x="40" y="12" width="20" height="10" rx="1" stroke={color} strokeWidth="2.5" />
      <rect x="46" y="22" width="8" height="6" fill={color} />

      {/* Cuerpo del Frasco Lineal */}
      <path
        d="M26 28 H74 L80 84 C80 86.8 77.8 89 75 89 H25 C22.2 89 20 86.8 20 84 L26 28 Z"
        stroke={color}
        strokeWidth="2.5"
      />

      {/* Monograma Z Fino y Centrado */}
      <text
        x="50"
        y="65"
        textAnchor="middle"
        fill={color}
        fontSize="28"
        fontWeight="300"
        fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
        letterSpacing="1"
      >
        Z
      </text>
    </svg>
  );
};

