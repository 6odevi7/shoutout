import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #0f0f0f;
`;

const Logo = styled.h1`
  color: #00ff00;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavButton = styled.a`
  padding: 0.5rem 1rem;
  background-color: #00ff00;
  color: #0f0f0f;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
`;

const NavBar = () => {
  return (
    <NavContainer>
      <Logo>Shoutout!</Logo>
      <ButtonContainer>
        <Link href="/register" passHref>
          <NavButton>Register</NavButton>
        </Link>
        <Link href="/login" passHref>
          <NavButton>Login</NavButton>
        </Link>
      </ButtonContainer>
    </NavContainer>
  );
};

export default NavBar;