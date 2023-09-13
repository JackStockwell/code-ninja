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
            </li>
            <li>
              <Link onClick={Auth.logout} to="/login">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
          
          </>
        )}
      </ul>
    </nav>
    </header>
  );
}

export default Header;
