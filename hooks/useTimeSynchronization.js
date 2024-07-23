import { useEffect, useState } from 'react';

export function useTimeSynchronization() {
  const [isTimeSync, setIsTimeSync] = useState(false);

  useEffect(() => {
    const syncTime = async () => {
      const response = await fetch('/api/serverTime');
      const { serverTime } = await response.json();
      const timeDiff = new Date(serverTime).getTime() - Date.now();
      localStorage.setItem('timeDiff', timeDiff);
      setIsTimeSync(true);
    };
    syncTime();
  }, []);

  const getAdjustedTime = () => {
    const timeDiff = parseInt(localStorage.getItem('timeDiff') || '0');
    return new Date(Date.now() + timeDiff);
  };

  return { isTimeSync, getAdjustedTime };
}