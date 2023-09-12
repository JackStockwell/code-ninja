import React from 'react';
import { Link } from 'react-router-dom'; 
import Logo from '../Logo/Logo'; 
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Logo xlinkHref="/images/logo.svg" /> 
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li> 
          <li><Link to="/category">Find Jobs</Link></li>

          <li><Link to="/login">Login</Link></li> 
        </ul>
      </nav>
    </header>
  );
}

export default Header;
