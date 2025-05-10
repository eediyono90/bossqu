import React from "react";

export default function ChatBubble({ message, isUser }) {
  return (
    <div
      className={
        isUser
          ? "self-end bg-red-600 text-white rounded-lg px-4 py-2 max-w-xl"
          : "self-start bg-red-800 text-white rounded-lg px-4 py-2 max-w-xl"
      }
    >
      {message}
    </div>
  );
}
