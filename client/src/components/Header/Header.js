import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import Logo from '../Logo/Logo'; 
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Logo xlinkHref="/images/logo.svg" /> 
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li> {/* Use Link component */}
          <li><Link to="/about">About us</Link></li> {/* Use Link component */}
          <li><Link to="/login">Login</Link></li> {/* Use Link component */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
