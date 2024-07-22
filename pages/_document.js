import Document, { Html, Head, Main, NextScript } from 'next/document'
import React, { useState } from 'react'

const AuthFormModal = ({ children, buttonText, buttonClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className={buttonClass} onClick={openModal}>{buttonText}</button>
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

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Add registration logic here
  };

  return (
    <AuthFormModal buttonText="Sign Up" buttonClass="sign-up-button">
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
        <button className="sign-up-button" type="submit">Sign Up</button>
      </form>
    </AuthFormModal>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <AuthFormModal buttonText="Login" buttonClass="login-button">
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
        <button className="login-button" type="submit">Login</button>
      </form>
    </AuthFormModal>
  );
};

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/disable-devtool';
                script.setAttribute('disable-devtool-auto', '');
                document.head.appendChild(script);

                var script2 = document.createElement('script');
                script2.src = '/iframedisabletool.js';
                document.head.appendChild(script2);
              })();
            `
          }} />
        </Head>
        <body>
          <Main />
          <RegisterForm />
          <LoginForm />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

