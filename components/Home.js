import React from 'react';
import dynamic from 'next/dynamic';

const SpotlightArea = dynamic(() => import('./features/SpotlightArea'));
const ShoutoutForm = dynamic(() => import('./layout/shared/ShoutoutForm'));
const AIInsightPost = dynamic(() => import('../components/features/AIInsightPost'));
const ShoutoutFeed = dynamic(() => import('./layout/shared/ShoutoutFeed'));

const Home = () => {
  return (
    <div className="container">
      <header>
        <h>Shoutout!</h1>
        <p>&ldquo;A real-time user status feed commenting system.&rdquo; - Built by Twilight Pulse</p>
      </header>
      <main>
        <SpotlightArea />
        <ShoutoutForm />
        <AIInsightPost />
        <ShoutoutFeed />
      </main>
    </div>
  );
};

export default Home;
