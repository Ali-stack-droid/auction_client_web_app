import { useEffect, useState } from 'react';
import Routing from './routes/Routing';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { io } from "socket.io-client";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  // const SOCKET_URL = 'ws://localhost:8181'; // Use 'ws' for WebSocket protocol
  // const socket = new WebSocket(SOCKET_URL);

  const SOCKET_URL = "http://localhost:8181"; // Use 'http' instead of 'ws' for Socket.IO
  const socket = io(SOCKET_URL, { transports: ["websocket"] }); // Ensure it uses WebSocket transport


  useEffect(() => {
    // Handle connection open
    socket.on("connect", () => {
      console.log("Socket.IO connection established");

      // Example: Send an initial message to the server if needed
      // socket.on("testing-event", handleMessages);
    });

    // Cleanup on unmount


    const checkSession = () => {
      // Check sessionStorage and cookies
      // sessionStorage.setItem('authToken', JSON.stringify("asd"));
      const authToken = sessionStorage.getItem('authToken');
      const user = Cookies.get('user');

      // Update authentication state based on session presence
      if (authToken || user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      // Mark loading as complete
      setLoading(false);
    };

    checkSession();
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleMessages = (message: string) => {
    console.log(`Message received: ${message}`);
  }

  if (loading) {
    // Show a loader until authentication is verified
    return <Box>Loading...</Box>;
  }

  return <Routing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} socket={socket} />;
}

export default App;
