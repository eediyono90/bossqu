import { useEffect, useRef, useState, useCallback } from "react";

export default function useChat(wsUrl = "ws://localhost:8000/ws/chat") {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  // Connect WebSocket
  useEffect(() => {
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { id: prev.length + 1, isUser: false, text: event.data }]);
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      socketRef.current.close();
    };
  }, [wsUrl]);

  // Send message
  const sendMessage = useCallback((msg) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(msg);
      setMessages((prev) => [...prev, { id: prev.length + 1, isUser: true, text: msg }]);
    }
  }, [isConnected]);

  return {
    messages,
    isConnected,
    sendMessage,
  };
}
