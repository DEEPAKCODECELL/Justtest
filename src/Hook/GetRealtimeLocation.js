import { useEffect, useRef } from "react";

const useWebSocket = (url, onMessage) => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Live location data received:", data);
      if (onMessage) {
        onMessage(data);
      }
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [url, onMessage]);

  return socket;
};

export default useWebSocket;
