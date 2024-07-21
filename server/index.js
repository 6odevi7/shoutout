import Head from 'next/head';
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

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Shoutout! App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>
          Welcome to <a href="https://github.com/6odevi7/ShoutoutApp">Shoutout! App</a>
        </Title>
        <p>
          A real-time user status feed commenting system. - Built by Twilight Pulse
        </p>
      </main>
    </Container>
  );
}
