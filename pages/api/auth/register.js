import Head from 'next/head';
import RegisterForm from '../../../components/auth/RegisterForm'
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
`;

export default function Register() {
  return (
    <Container>
      <Head>
        <title>Register - Shoutout! App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Register for Shoutout! App</h1>
        <RegisterForm />
      </main>
    </Container>
  );
}



