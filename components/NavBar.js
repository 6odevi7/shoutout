import React from 'react';
import Link from 'next/link';

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