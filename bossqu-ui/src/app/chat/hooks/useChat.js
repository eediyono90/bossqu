import { useEffect, useRef, useState, useCallback } from "react";

export default function useChat(wsUrl = "ws://localhost:8000/ws/chat") {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [shouldReconnect, setShouldReconnect] = useState(true);
  const socketRef = useRef(null);
  const reconnectTimer = useRef(null);

  const connect = useCallback(() => {
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { id: prev.length + 1, isUser: false, text: event.data }]);
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);

      if (shouldReconnect) {
        reconnectTimer.current = setTimeout(() => {
          connect();
        }, 2000);
      }
    };

    socketRef.current.onerror = () => {
      socketRef.current.close();
    };
  }, [shouldReconnect, wsUrl]);

  // Connect WebSocket
  useEffect(() => {
    setShouldReconnect(true);
    connect();

    return () => {
      setShouldReconnect(false);
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (socketRef.current) socketRef.current.close();
    };
  }, [connect]);

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
