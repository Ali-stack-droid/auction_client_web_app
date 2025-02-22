import { useEffect, useState } from 'react';
import Routing from './routes/Routing';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const SOCKET_URL = 'ws://localhost:8181'; // Use 'ws' for WebSocket protocol
  const socket = new WebSocket(SOCKET_URL);

  useEffect(() => {
     // Handle connection open
     socket.onopen = () => {
      console.log('WebSocket connection established');
      // You can send an initial message to the server if needed
      // socket.send(JSON.stringify({ type: 'greeting', message: 'Hello Server' }));
    };

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
  }, []);

  if (loading) {
    // Show a loader until authentication is verified
    return <Box>Loading...</Box>;
  }

  return <Routing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} socket={socket} />;
}

export default App;
