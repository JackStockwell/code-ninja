import React from "react";
import {Link} from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Header.css";
import Auth from "../../utils/auth";

function Header() {
  return (
    <header className="header">
      <Logo xlinkHref="/images/logo.svg" />
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About us</a>
          </li>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Profile</Link>
              <Link onClick={Auth.logout}>Logout</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
