import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure AuthContext is set up as shown in previous messages
import { HeaderContainer, HeaderTitle } from '../styles/HeaderStyles'; // Adjust the import path as necessary

function Header() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <HeaderContainer>
      <HeaderTitle>Fitness Tracker</HeaderTitle>
      <div style={{ position: 'absolute', right: '20px', top: '10px' }}>
        {isAuthenticated ? (
          <button onClick={signOut} style={{ color: '#fff', backgroundColor: '#333', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Sign Out
          </button>
        ) : (
          <Link to="/sign-in" style={{ color: '#fff', backgroundColor: '#333', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>
            Sign In
          </Link>
        )}
      </div>
    </HeaderContainer>
  );
}

export default Header;
