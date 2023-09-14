import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import Auth from "../../utils/auth";
import logo from "../../images/logo.png";

function Header() {
  console.log(Auth.getProfile())
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
        {!Auth.empLogged() && (
          <li><Link to="/search">Find a Job</Link></li>
        )}
        {Auth.empLogged() && (
          <>
            <Link to={`/cmp/myprofile`}>Employer Profile</Link>
          </>
        )}
        {!Auth.empLogged && Auth.loggedIn() && (
          <>
            <Link to="/user/myprofile">Profile</Link>
            
          </>
        )}
        {Auth.loggedIn() && (
        <Link onClick={Auth.logout}>Logout</Link>
        )}
        {!Auth.loggedIn() && !Auth.empLogged() && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
            <Link to="/employer">Employer</Link>
          </>
        )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
