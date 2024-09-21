import { useCallback, useEffect, useRef, useState } from 'react';

interface WebSocketOptions {
  url: string;
  protocols?: string | string[];
  autoReconnect?: boolean;
}

interface UseWebSocketReturn {
  data: unknown;
  isConnected: boolean;
  error: string | null;
  sendData: (message: unknown) => void;
  startListening: () => void;
  stopListening: () => void;
}

export function useWebSocketServer({
  url,
  protocols,
  autoReconnect = false,
}: WebSocketOptions): UseWebSocketReturn {
  const [data, setData] = useState<unknown>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(url, protocols);
    socketRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (e) {
        console.error('Error parsing message data:', e);
        setError('Error parsing message data');
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('WebSocket encountered an error.');
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket connection closed');
      if (autoReconnect) {
        setTimeout(() => {
          console.log('Reconnecting WebSocket...');
          connect(); // Reconnect if autoReconnect is true
        }, 5000);
      }
    };
  }, [url, protocols, autoReconnect]);

  const sendData = useCallback((message: unknown) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const dataToSend =
        typeof message === 'string' ? message : JSON.stringify(message);
      socketRef.current.send(dataToSend);
    } else {
      console.error('WebSocket is not connected');
      setError('WebSocket is not connected');
    }
  }, []);

  const startListening = useCallback(() => {
    if (
      !socketRef.current ||
      socketRef.current.readyState === WebSocket.CLOSED
    ) {
      connect();
    }
  }, [connect]);

  const stopListening = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  }, []);

  useEffect(() => {
    connect(); // Establish WebSocket connection when the hook is mounted

    return () => {
      stopListening(); // Cleanup the WebSocket connection when the component using the hook unmounts
    };
  }, [connect, stopListening]);

  return {
    data,
    isConnected,
    error,
    sendData,
    startListening,
    stopListening,
  };
}
