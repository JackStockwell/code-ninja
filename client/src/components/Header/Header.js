import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import Auth from "../../utils/auth"; // Renamed to logo1
import logo2 from "../../images/logo2.png"; // Renamed to logo2

function Header() {

  
  const navigate = useNavigate()

  return (
    <header className="header">
      <div>
        <img onClick={() => navigate('/')} src={logo2} alt="Logo 2" style={{ cursor: 'pointer', width: "200px", height: "auto", padding: '0 1rem' }} />
      </div>
<nav></nav>
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
        {!Auth.empLogged() && Auth.loggedIn() && (
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
