import React, { useContext } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import Home from '../components/Home';


const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const App = () => {
  const { isAuthenticated, login } = useAuth();

  return (
    <AuthProvider>
      <Home isAuthenticated={isAuthenticated} login={login} />
    </AuthProvider>
  );
};

export default useAuth;