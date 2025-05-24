import React from "react";

export default function ChatLoadingBubble() {
  return (
    <div className="text-left">
      <span className="inline-block px-2 py-1 rounded bg-gray-800 text-white m-1">
        <span className="flex items-center gap-2">
          <span className="volume-bars flex items-end gap-1">
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar3"></span>
            <span className="bar bar4"></span>
          </span>
          <span>Bossqu lagi mikir...</span>
        </span>
      </span>
      <style jsx>{`
        .volume-bars {
          height: 18px;
        }
        .bar {
          display: inline-block;
          width: 4px;
          height: 10px;
          background: #fff;
          border-radius: 2px;
          animation: barBounce 1s infinite;
        }
        .bar1 { animation-delay: 0s; }
        .bar2 { animation-delay: 0.2s; }
        .bar3 { animation-delay: 0.4s; }
        .bar4 { animation-delay: 0.6s; }
        @keyframes barBounce {
          0%, 100% { height: 8px; }
          50% { height: 18px; }
        }
      `}</style>
    </div>
  );
} 