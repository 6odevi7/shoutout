import { useState, useEffect, Suspense } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/hackertheme.css';
import moment from 'moment-timezone';

function MyApp({ Component, pageProps }) {
  const [isTimeSync, setIsTimeSync] = useState(false);

  useEffect(() => {
    const syncTime = async () => {
      try {
        const response = await fetch('/api/serverTime');
        const { serverTime } = await response.json();
        const timeDiff = Date.parse(serverTime) - Date.now();
        localStorage.setItem('timeDiff', timeDiff);
        setIsTimeSync(true);
      } catch (error) {
        console.error('Failed to sync time:', error);
        setIsTimeSync(true);
      }
    };
    syncTime();
  }, []);

  const getAdjustedTime = () => {
    const timeDiff = parseInt(localStorage.getItem('timeDiff') || '0');
    const currentTime = Date.now();
    return Object.create(Date.prototype, {
      [Symbol.toPrimitive]: {
        value: () => currentTime + timeDiff
      }
    });
  };  

  if (!isTimeSync) {
    return <div>Synchronizing time...</div>;
  }

  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading app...</div>}>
        <Component
          {...pageProps}
          getAdjustedTime={getAdjustedTime}
        />
      </Suspense>
    </AuthProvider>
  );
}

export default MyApp;
