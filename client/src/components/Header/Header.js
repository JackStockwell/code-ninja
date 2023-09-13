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
          <Link to="/find-jobs">Find Jobs</Link>
        </li>
        {Auth.loggedIn() ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>

              <Link onClick={Auth.logout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/create">Signup</Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
