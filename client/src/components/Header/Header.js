import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import Auth from "../../utils/auth";
import logo from "../../images/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Find a Job</Link>
        </li>
        {Auth.loggedIn() ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link onClick={Auth.logout}>Logout</Link>
          </>
        ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Signup</Link>
            </>
        )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
