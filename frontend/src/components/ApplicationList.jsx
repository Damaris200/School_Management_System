import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ApplicationList.css"; // Import the CSS file

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/applications${filter ? `/filter/${filter}` : ""}`
      )
      .then((res) => {
        setApplications(res.data);
        console.log(res.data);
      })
      .catch((error) => console.error("Error fetching applications:", error));
  }, [filter]);

  return (
    <div className="application-list-container">
      <h2>Applications</h2>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </select>

      <ul>
        {applications.map((app) => (
          <li key={app.id} className={`status-${app.status.toLowerCase()}`}>
            {app.studentName} - {app.program} - <b>{app.status}</b>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;
