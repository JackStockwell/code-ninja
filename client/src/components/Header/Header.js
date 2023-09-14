import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Auth from "../../utils/auth";
import logo1 from "../../images/logo.png"; // Renamed to logo1
import logo2 from "../../images/logo2.png"; // Renamed to logo2

function Header() {
  console.log(Auth.getProfile());
  return (
    <header className="header">
      <div>
      <img src={logo1} alt="Logo 1" style={{ width: "100px", height: "auto" }} />
        <img src={logo2} alt="Logo 2" style={{ width: "100px", height: "auto" }} />
      </div>
<nav></nav>
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
