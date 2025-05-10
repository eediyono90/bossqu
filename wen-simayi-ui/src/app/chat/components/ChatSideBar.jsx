import React from "react";
import BosquLogo from "./BosquLogo";
import ConversationHistory from "./ConversationHistory";

export default function ChatSideBar({ sidebarOpen, setSidebarOpen, conversations = [], onSelectConversation }) {
  return (
    <>
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`
          ${sidebarOpen ? "w-full md:w-64" : "w-0"}
          bg-[#181c23] border-r border-gray-700 flex flex-col h-full min-h-screen text-gray-100 transition-all duration-200 overflow-hidden z-40
          fixed top-0 left-0 md:relative md:z-20
          ${sidebarOpen ? "" : "pointer-events-none"}
        `}
        style={{
          transitionProperty: 'width, left',
        }}
      >
        {sidebarOpen && (
          <>
            <BosquLogo />
            <div className="flex-1 overflow-y-auto sidebar-scroll">
              <ConversationHistory conversations={conversations} onSelect={onSelectConversation} />
            </div>
            <button className="m-4 p-2 bg-red-600 text-white rounded hover:bg-red-700 w-[calc(100%-2rem)] mt-auto">+ New Chat</button>
            {/* Collapse area di kanan sidebar */}
            <div
              className="absolute top-0 right-0 h-full w-4 flex items-center justify-center group z-50 cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="flex flex-col items-center justify-center h-16 w-4 rounded-l bg-transparent group-hover:bg-red-700/40 transition-colors duration-200 relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="absolute left-8 top-1/2 -translate-y-1/2 bg-red-700 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg pointer-events-none">
                  Collapse
                </span>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
