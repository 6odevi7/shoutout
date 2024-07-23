import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForms';
import Home from '../components/Home';
import ShoutoutFeed from '../components/layout/shared/ShoutoutFeed';

const HomePage = ({ feedData }) => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <Home feedData={feedData}>
      {!isAuthenticated && (
        <>
          <button onClick={openAuthModal}>Sign In / Register</button>
          {showAuthModal && (
            <div className="modal-overlay" onClick={closeAuthModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <AuthForm onLogin={(token) => {
                  login(token);
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

export default HomePage;