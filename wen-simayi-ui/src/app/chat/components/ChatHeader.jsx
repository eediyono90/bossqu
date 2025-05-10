import React from "react";

export default function ChatHeader({ sidebarOpen, setSidebarOpen, selectedModel, setSelectedModel }) {
  return (
    <header className="flex items-center justify-between px-6 h-16 border-b border-gray-700 bg-gray-800 text-gray-100">
      <div className="flex items-center gap-2 min-w-0">
        {/* Hamburger in header when sidebar is collapsed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded bg-gray-800 hover:bg-gray-700 focus:outline-none"
            aria-label="Open sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <span className="font-semibold text-lg truncate">BOSSQU.ID</span>
      </div>
      <div className="flex items-center gap-4">
        {/* Model selector */}
        <select
          value={selectedModel}
          onChange={e => setSelectedModel(e.target.value)}
          className="border border-gray-700 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-500 bg-gray-900 text-gray-100"
        >
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="gpt-4">GPT-4</option>
          <option value="llama-2">Llama 2</option>
        </select>
        {/* Profile icon */}
        <button className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 focus:outline-none">
          {/* User icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
