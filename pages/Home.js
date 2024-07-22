import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const SpotlightArea = dynamic(() => import('../components/features/SpotlightArea'), { ssr: false });
const ShoutoutForm = dynamic(() => import('../components/layout/shared/ShoutoutForm'), { ssr: false });
const AIInsightPost = dynamic(() => import('../components/features/AIInsightPost'), { ssr: false });
const ShoutoutFeed = dynamic(() => import('../components/layout/shared/ShoutoutFeed'), { ssr: false });

const Home = ({ feedData }) => {
  return (
    <div className="container">
      <header>
        <h1>Shoutout!</h1>
        <p>&ldquo;A real-time user status feed commenting system.&ldquo; - Built by Twilight Pulse</p>
      </header>
      <main>
        <Suspense fallback={<div>Loading Spotlight...</div>}>
          <SpotlightArea />
        </Suspense>
        <Suspense fallback={<div>Loading Form...</div>}>
          <ShoutoutForm />
        </Suspense>
        <Suspense fallback={<div>Loading AI Insights...</div>}>
          <AIInsightPost />
        </Suspense>
        <Suspense fallback={<div>Loading Feed...</div>}>
          <ShoutoutFeed initialData={feedData} />
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
