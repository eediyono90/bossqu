import React from "react";
import ConversationHistory from "./ConversationHistory";

export default function ChatSideBar({ sidebarOpen, setSidebarOpen, conversations = [], onSelectConversation }) {
  return (
    <aside className={`$${sidebarOpen ? "w-64" : "w-0"} bg-gray-800 border-r border-gray-700 flex flex-col text-gray-100 transition-all duration-200 overflow-hidden z-20`}>
      {sidebarOpen && (
        <>
          <div className="flex items-center justify-between p-4 font-bold text-lg border-b border-gray-700 h-16 min-w-0">
            <span>Conversations</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-2 p-1 rounded hover:bg-gray-700 focus:outline-none"
              aria-label="Collapse sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
          <ConversationHistory conversations={conversations} onSelect={onSelectConversation} />
          <button className="m-4 p-2 bg-red-600 text-white rounded hover:bg-red-700">+ New Chat</button>
        </>
      )}
    </aside>
  );
}
