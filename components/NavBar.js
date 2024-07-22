import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #0f0f0f;
  padding: 1rem;
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled.li`
  color: #00ff00;
`;

const NavBar = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <Link href="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link href="/profile">Profile</Link>
        </NavItem>
        <NavItem>
          <Link href="/settings">Settings</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default NavBar;