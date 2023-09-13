import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-icons">
          <a href="https://twitter.com/your_twitter_profile">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.linkedin.com/in/your_linkedin_profile">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
        <p>&copy; {currentYear} Git-Jobs</p>
      </div>
    </footer>
  );
}

export default Footer;
