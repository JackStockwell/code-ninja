import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitter, faLinkedin} from "../fortawesome";
import Header from "../components/Header/Header";

import "./homepage.css";

const jobBlogPosts = [
  {
    title: "How to Ace Your Job Interview",
    description:
      "Discover essential tips and strategies to help you excel in your next job interview, from preparation to follow-up.",
  },
  {
    title: "Remote Work: Pros and Cons",
    description:
      "Explore the advantages and disadvantages of remote work, and learn how to make the most of your remote job opportunities.",
  },
  {
    title: "Resume Writing Tips for Job Seekers",
    description:
      "Learn how to create a compelling resume that grabs the attention of employers and helps you stand out in the job market.",
  },
  {
    title: "Navigating the Job Market in 2023",
    description:
      "Stay up-to-date with the latest trends in the job market and gain insights into job search strategies for the current year.",
  },
];

function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="home">
      <Header />
      <main>
        <section className="container">
          <h2>Git-Jobs</h2>
          <p>Our job website.</p>
        </section>
        <section className="container">
          <h2>Recent job blog Posts</h2>
          <ul>
            {jobBlogPosts.map((post, index) => (
              <li key={index}>
                <a href={`/blog/post-${index + 1}`}>{post.title}</a>
                <p>{post.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-icons">
            <a href="https://twitter.com/your_twitter_profile">
              <FontAwesomeIcon icon={faTwitter} /> Use faTwitter
            </a>
            <a href="https://www.linkedin.com/in/your_linkedin_profile">
              <FontAwesomeIcon icon={faLinkedin} /> Use faLinkedin
            </a>
          </div>
          <p>&copy; {currentYear} Git-Jobs</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
