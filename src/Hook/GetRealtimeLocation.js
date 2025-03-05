import { useEffect, useRef } from "react";

const useWebSocket = (url, userId, onMessage) => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      console.log("WebSocket connected");

      // Send the user's ID when the connection is first established
        socket.current.onopen = () => {
     console.log("WebSocket connected");

  if (userId && socket.current.readyState === WebSocket.OPEN) {
    socket.current.send(
      JSON.stringify({
        type: "First-Connection",
        id: userId,
      })
    );
  } else {
    console.warn("WebSocket not open yet, retrying...");
    setTimeout(() => {
      if (socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(
          JSON.stringify({
            type: "First-Connection",
            id: userId,
          })
        );
      }
    }, 1000); // Wait 1 second and retry
  }
};
    };

    socket.current.onmessage = (event) => {
      console.log("Getting Hit by backend");
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
  }, [url, userId, onMessage]);

  return socket;
};

export default useWebSocket;
