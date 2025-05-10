"use client";
import { useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatSideBar from "./components/ChatSideBar";
import ChatInput from "./components/ChatInput";
import ChatBubble from "./components/ChatBubble";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState("gpt-3.5");
  // Example chat messages
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo Bossqu! Ada yang bisa saya bantu?", isUser: false },
    { id: 2, text: "Gua mau tanya sesuatu nih...", isUser: true },
  ]);

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, { id: prev.length + 1, text: msg, isUser: true }]);
  };

  return (
    <div className="flex h-screen min-w-0">
      <ChatSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex flex-col flex-1 min-h-0 min-w-0">
        <ChatHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
        <div className="flex-1 min-h-0 min-w-0 overflow-y-auto pb-20 p-2 sm:p-4 md:p-6 flex flex-col gap-2 sm:gap-4 md:gap-6 bg-[#0a0a0a]">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
          ))}
        </div>
        <div className="sticky bottom-0 w-full bg-[#181c23] z-10 sticky-input-safe">
          <ChatInput onSend={handleSend} />
        </div>
      </main>
    </div>
  );
}