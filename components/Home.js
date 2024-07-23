import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { AuthContext } from '../contexts/AuthContext';
import SpotlightArea from '../components/features/SpotlightArea';
import AIInsightPost from '../components/features/AIInsightPost';

const ShoutoutForm = dynamic(() => import('../components/layout/shared/ShoutoutForm'), { ssr: false });
const ShoutoutFeed = dynamic(() => import('../components/layout/shared/ShoutoutFeed'), { ssr: false });
const AuthForm = dynamic(() => import('../components/AuthForms'), { ssr: false });

const Home = ({ feedData }) => {
  const { isAuthenticated, login } = useContext(AuthContext);

  return (
    <div className="container">
      <header>
        <h1>Shoutout!</h1>
        <p>&ldquo;A real-time user status feed commenting system.&ldquo; - Built by Twilight Pulse</p>
        {!isAuthenticated && <AuthForm onLogin={login} />}
      </header>
      <main>
        <SpotlightArea />
        {isAuthenticated && <ShoutoutForm />}
        <AIInsightPost />
        <ShoutoutFeed initialData={feedData} />
      </main>
    </div>
  );
};

export default Home;
