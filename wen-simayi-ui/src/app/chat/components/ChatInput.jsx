import React, { useState } from "react";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form className="p-4 border-t border-gray-700 bg-gray-800 flex gap-2 items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:border-red-500 bg-gray-900 text-gray-100"
        placeholder="Ketik pesan..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      {/* Mic button */}
      <button
        type="button"
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 focus:outline-none focus:ring"
        aria-label="Voice input"
        tabIndex={-1}
      >
        {/* Heroicons Mic SVG icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v1.5m0 0h3m-3 0H9m6-4.5a6 6 0 01-12 0m6-1.5a3 3 0 003-3V6a3 3 0 10-6 0v5.25a3 3 0 003 3z" />
        </svg>
      </button>
      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Kirim</button>
    </form>
  );
}
