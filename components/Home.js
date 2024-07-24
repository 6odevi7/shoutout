import React, { useState, useContext } from 'react';
import { AuthContext, AuthForm } from '../components/AuthForms';
import SpotlightArea from '/components/features/SpotlightArea';
import AIInsightPost from '/components/features/AIInsightPost';
import ShoutoutForm from '/components/layout/shared/ShoutoutForm';
import ShoutoutFeed from '/components/layout/shared/ShoutoutFeed';

const Home = ({ feedData }) => {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  const user = authContext?.user;
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <div className="container">
      <div>Initial render check</div>  
      <header>
        <h1>Shoutout!</h1>
        <p>"A real-time user status feed commenting system." - Built by Twilight Pulse</p>
        {!isAuthenticated && (
          <button onClick={() => setShowAuthModal(true)}>Login / Register</button>
        )}
      </header>
      <main>
        {showAuthForm && !isAuthenticated && <AuthForm />}
        <SpotlightArea />
        {isAuthenticated && user && <ShoutoutForm />}
        <AIInsightPost />
        <ShoutoutFeed initialData={feedData} />
      </main>
    </div>
  );
};

export default Home;
