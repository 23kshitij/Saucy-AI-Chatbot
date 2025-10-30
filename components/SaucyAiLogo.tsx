import React from 'react';

interface SaucyAiLogoProps {
  className?: string;
}

const SaucyAiLogo: React.FC<SaucyAiLogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Chef Hat */}
      <path d="M100 15c-15.5 0-25.2-8.6-34-11.4C53.2 0 42 6.5 42 18.5c0 10.2 6.5 18 15.6 21.3 7.8 2.8 17.5 4.2 28.9 4.2h27c11.4 0 21.1-1.4 28.9-4.2C151.5 36.5 158 28.7 158 18.5c0-12-11.2-18.6-24-14.9-8.8 2.8-18.5 11.4-34 11.4z" />
      <path d="M35 50h130v18H35z" />

      {/* Utensils */}
      <g transform="rotate(-20 70 105)">
        <rect x="68" y="75" width="4" height="40" rx="2" />
        <rect x="60" y="70" width="20" height="15" rx="2" />
      </g>
      <g transform="rotate(-10 90 110)">
        <rect x="88" y="80" width="4" height="35" rx="2" />
        <path d="M90 70 l-6 15 h12 z" />
      </g>
      <g transform="rotate(10 110 110)">
        <rect x="108" y="80" width="4" height="35"rx="2" />
        <ellipse cx="110" cy="75" rx="6" ry="8" />
      </g>
      <g transform="rotate(20 130 105)">
        <rect x="128" y="95" width="4" height="20" rx="2" />
        <ellipse cx="130" cy="80" rx="10" ry="6" />
        <path d="M124 80 a6 6 0 0 1 12 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M130 74 a6 6 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </g>
      
      {/* Banner */}
      <path d="M20 140 c30-10 130-10 160 0 l-5 30 c-30 10 -120 10 -150 0z" />
      <text
        x="100"
        y="163"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="22"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        letterSpacing="1"
      >
        SAUCY AI
      </text>
    </svg>
  );
};

export default SaucyAiLogo;
