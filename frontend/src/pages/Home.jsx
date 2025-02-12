import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>School Admission System</h1>
      <p>
        Welcome to the University Admission System! Apply for programs, track your applications, and stay updated with your admission status.
      </p>

      <nav>
        <ul>
          <li>
            <Link to="/home" className="nav-link">Application Form</Link>
          </li>
          <li>
            <Link to="/applications" className="nav-link">Application List</Link>
          </li>
          <li>
            <Link to="/update" className="nav-link">Update Application</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
