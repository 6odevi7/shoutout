import React, { useState } from 'react';

const AuthForm = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="auth-form-container">
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>
      {isRegister ? <RegisterForm /> : <LoginForm />}
    </div>
  );
};

const AuthFormModal = ({ children, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className="sign-up-button" onClick={openModal}>{buttonText}</button>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
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
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password
      });
      console.log('Registration successful', response.data);
      // Handle successful registration (e.g., show success message, auto-login)
    } catch (error) {
      console.error('Registration failed', error.response.data);
      // Handle registration error (e.g., show error message)
    }
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
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      console.log('Login successful', response.data);
      // Handle successful login (e.g., store token, update app state)
    } catch (error) {
      console.error('Login failed', error.response.data);
      // Handle login error (e.g., show error message)
    }
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

export default AuthForm;