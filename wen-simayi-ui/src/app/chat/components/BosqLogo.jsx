import React from "react";

export default function BosqLogo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Chat bubble */}
      <ellipse cx="24" cy="28" rx="16" ry="13" fill="#991B1B" />
      {/* Bubble tail */}
      <polygon points="24,41 28,37 20,37" fill="#991B1B" />
      {/* Baby boss head */}
      <circle cx="24" cy="16" r="8" fill="#fff" stroke="#991B1B" strokeWidth="2" />
      {/* Cheeks */}
      <ellipse cx="20" cy="19" rx="1.5" ry="1" fill="#F87171" />
      <ellipse cx="28" cy="19" rx="1.5" ry="1" fill="#F87171" />
      {/* Eyes */}
      <ellipse cx="21.5" cy="16" rx="1" ry="1.2" fill="#991B1B" />
      <ellipse cx="26.5" cy="16" rx="1" ry="1.2" fill="#991B1B" />
      {/* Smile */}
      <path d="M22 19 Q24 21 26 19" stroke="#991B1B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Suit collar */}
      <polygon points="22,24 24,21 26,24" fill="#fff" stroke="#991B1B" strokeWidth="1" />
      {/* Red tie */}
      <polygon points="24,21 25,25 23,25" fill="#F87171" />
    </svg>
  );
} 