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
        <li>
          <Link to="/search">Find a Job</Link>
        </li>
        {Auth.empLogged() && (
          <>
            <Link to={`/cmp/${Auth.getProfile()?.data._id}/${Auth.getProfile()?.data.companyName}`}>Employer Profile</Link>
          </>
        )}
        {Auth.loggedIn() && !Auth.empLogged() ? (
          <>
            <Link to={`/profile/${Auth.getProfile()?.data._id}`}>Profile</Link>
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
