import React, { useEffect, useState, Suspense } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/hackertheme.css';
import dynamic from 'next/dynamic';
import moment from 'moment-timezone';

const SpotlightArea = dynamic(() => import('../components/features/SpotlightArea'), { ssr: false });
const ShoutoutForm = dynamic(() => import('../components/layout/shared/ShoutoutForm'), { ssr: false });
const AIInsightPost = dynamic(() => import('../components/features/AIInsightPost'), { ssr: false });
const DynamicShoutoutFeed = dynamic(() => import('../components/layout/shared/ShoutoutFeed'), { ssr: false });

function MyApp({ Component, pageProps }) {
  const [isTimeSync, setIsTimeSync] = useState(false);

  useEffect(() => {
    const syncTime = async () => {
      try {
        const response = await fetch('/api/serverTime');
        const { serverTime } = await response.json();
        const timeDiff = new Date(serverTime).getTime() - Date.now();
        localStorage.setItem('timeDiff', timeDiff);
        setIsTimeSync(true);
      } catch (error) {
        console.error('Failed to sync time:', error);
        setIsTimeSync(true); // Set to true even on error to allow app to proceed
      }
    };
    syncTime();
  }, []);

  const getAdjustedTime = () => {
    const timeDiff = parseInt(localStorage.getItem('timeDiff') || '0');
    return new Date(Date.now() + timeDiff);
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
          SpotlightArea={SpotlightArea}
          ShoutoutForm={ShoutoutForm}
          AIInsightPost={AIInsightPost}
          DynamicShoutoutFeed={DynamicShoutoutFeed}
        />
      </Suspense>
    </AuthProvider>
  );
}

export default MyApp;
