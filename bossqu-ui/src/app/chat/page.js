"use client";
import { useRef, useEffect, useState } from "react";
import useChat from "./hooks/useChat";
import ChatHeader from "./components/ChatHeader";
import ChatSideBar from "./components/ChatSideBar";
import ChatInput from "./components/ChatInput";
import ChatBubble from "./components/ChatBubble";
import ChatLoadingBubble from "./components/ChatLoadingBubble";

export default function ChatPage() {
  const WS_HOST = process.env.NEXT_PUBLIC_WS_HOST;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-3.5");

  const { messages, isConnected, isBotTyping, sendMessage } = useChat(WS_HOST);
  const chatEndRef = useRef(null);

  const handleSend = (msg) => {
    if(msg) {
      sendMessage(msg);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex h-screen min-w-0 overflow-x-hidden">
      <ChatSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex flex-col flex-1 min-h-0 min-w-0 overflow-x-hidden">
        <ChatHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
        <div className="flex-1 min-h-0 min-w-0 overflow-y-auto pb-20 p-2 sm:p-4 md:p-6 flex flex-col gap-2 sm:gap-4 md:gap-6 bg-[#0a0a0a] sidebar-scroll">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
          ))}
          {isBotTyping && <ChatLoadingBubble />}
          <div ref={chatEndRef} />
        </div>
        {/* Element dummy for anchor scroll */}
        {/* <div ref={chatEndRef} /> */}
        <div className="sticky bottom-0 w-full bg-[#181c23] z-10 sticky-input-safe">
          <ChatInput onSend={handleSend} isConnected={isConnected && !isBotTyping} />
        </div>
      </main>
    </div>
  );
}