import React, { useState } from 'react';
import '../styles/hackertheme.css';
import styled from 'styled-components';

const ModalContent = styled.div`
  background-color: rgba(15, 15, 15, 0.9);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  width: 15%;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .auth-input {
    font-size: 14px;
    padding: 5px;
    width: 100%;
    background-color: #1a1a1a;
    color: #00ff00;
    border: 1px solid #00ff00;
  }

  .auth-button {
    font-size: 14px;
    padding: 5px 10px;
    width: 100%;
    background-color: #00ff00;
    color: #0f0f0f;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    width: 30%;
  }
`;

const SignUpButton = styled.button`
  background-color: #00ff00;
  color: #0f0f0f;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AuthFormModal = ({ children, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <SignUpButton onClick={openModal}>{buttonText}</SignUpButton>
      {isOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {children}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Add registration logic here
  };

  return (
    <AuthFormModal buttonText="Sign Up">
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          className="auth-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button" type="submit">Register</button>
      </form>
    </AuthFormModal>
  );
};

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <AuthFormModal buttonText="Login">
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button" type="submit">Login</button>
      </form>
    </AuthFormModal>
  );
};
