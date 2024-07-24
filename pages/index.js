import { useState } from 'react';
import AuthForm, { useAuth } from '../components/AuthForms';
import Home from '../components/Home';
import ShoutoutFeed from '../components/layout/shared/ShoutoutFeed';

const HomePage = ({ feedData }) => {
  const { isAuthenticated, login } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [error, setError] = useState(null);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  const handleLogin = async (token, user) => {
    try {
      await login(token, user);
      closeAuthModal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Home feedData={feedData}>
      {!isAuthenticated && (
        <>
          <button onClick={openAuthModal}>Sign In / Register</button>
          {showAuthModal && (
            <AuthForm onLogin={handleLogin} onClose={closeAuthModal} />
          )}
        </>
      )}
      {error && <div className="error-message">{error}</div>}
      <ShoutoutFeed initialData={feedData} />
    </Home>
  );
};

export default HomePage;
