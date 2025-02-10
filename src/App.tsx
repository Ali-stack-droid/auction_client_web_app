import { useEffect, useState } from 'react';
import Routing from './routes/Routing';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
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

  return <Routing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />;
}

export default App;
