// src/components/Header.js
import React from 'react';
import Logo from './Logo'; 


function Header() {
  return (
    <header className="header">
      <Logo xlinkHref="/images/logo.svg" /> 
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About us</a></li>
          <li><a href="/blog">Login</a></li>
        
        </ul>
      </nav>
    </header>
  );
}
