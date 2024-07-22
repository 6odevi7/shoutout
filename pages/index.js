import React, { useState } from 'react';
import Home from '../components/Home';
import AuthForm from '../components/AuthForms';
import ShoutoutFeed from '../client/components/ShoutoutFeed';

const HomePage = ({ feedData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <Home feedData={feedData}>
      {!isLoggedIn && (
        <>
          <button onClick={openAuthModal}>Sign In / Register</button>
          {showAuthModal && (
            <div className="modal-overlay" onClick={closeAuthModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <AuthForm onLogin={() => {
                  setIsLoggedIn(true);
                  closeAuthModal();
                }} />
                <button onClick={closeAuthModal}>Close</button>
              </div>
            </div>
          )}
        </>
      )}
      <ShoutoutFeed initialData={feedData} />
    </Home>
  );
};

export async function getStaticProps() {
  const fetchStaticData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/feed');
      if (!response.ok) {
        throw new Error('Failed to fetch feed data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching feed data:', error);
      return {
        data: [],
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
      };
    }
  };

  const feedData = await fetchStaticData();
  return {
    props: { feedData: JSON.parse(JSON.stringify(feedData)) },
    revalidate: 30
  };
}

export default HomePage;


