import React from "react";

export default function ChatBubble({ message, isUser }) {
  return (
    <div
      className={
        (isUser
          ? "self-end bg-red-600 text-white"
          : "self-start bg-red-800 text-white") +
        " rounded-lg px-4 py-2 max-w-[85vw] sm:max-w-md md:max-w-lg lg:max-w-xl text-sm md:text-base break-words max-w-full inline-block"
      }
    >
      {message}
    </div>
  );
}
