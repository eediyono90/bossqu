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
    { id: 1, text: "Halo! Ada yang bisa saya bantu?", isUser: false },
    { id: 2, text: "Gua mau tanya sesuatu nih...", isUser: true },
  ]);

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, { id: prev.length + 1, text: msg, isUser: true }]);
  };

  return (
    <div className="flex h-screen bg-gray-900 min-w-0 relative">
      <ChatSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-gray-900">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
          ))}
        </div>
        <ChatInput onSend={handleSend} />
      </main>
    </div>
  );
}