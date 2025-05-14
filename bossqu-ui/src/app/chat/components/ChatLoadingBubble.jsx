import React from "react";

export default function ChatLoadingBubble() {
  return (
    <div className="text-left">
      <span className="inline-block px-2 py-1 rounded bg-gray-800 text-white m-1">
        <span className="flex items-center gap-2">
          <span className="dot-flashing"></span>
          <span>Bosqu lagi mikir...</span>
        </span>
      </span>
      <style jsx>{`
        .dot-flashing {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #fff;
          color: #fff;
          animation: dotFlashing 1s infinite linear alternate;
        }
        @keyframes dotFlashing {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
} 