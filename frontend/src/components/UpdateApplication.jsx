import React, { useState } from "react";
import axios from "axios";
import "../styles/UpdateApplication.css"; // Import the CSS file

const UpdateApplication = () => {
  const [applicationId, setApplicationId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const base_url = "http://localhost:5000";
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${base_url}/applications/update/${applicationId}`,
        { status }
      );
      setMessage(res.data.message);
      console.log("Notification", res);
      sendNotification();
    } catch (error) {
      setMessage("Error updating status");
    }
  };

  const sendNotification = async () => {
    try {
      const appData = await axios.get(`${base_url}/applications/${applicationId}`);
      console.log("📦 Application data:", appData.data);      
      const { status } = appData.data;
      const applicantId = localStorage.getItem('userId');
      const userData = await axios.get(`${base_url}/applicant/${applicantId}`);
      console.log("👤 User data:", userData.data);
      const { email } = userData.data;
      const notificationData = { applicantId, status, message, email };

      setMessage(`Your application status has been updated to ${status}`);
      console.log("📢 Sending notification...", notificationData);

      const notRes = await axios.post(
        `${base_url}/notification/create`,
        notificationData
      );

      console.log("✅ Notification sent successfully:", notRes.data);
    } catch (error) {
      console.error(
        "❌ Error sending notification:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="update-application-container">
      <h2>Update Application Status</h2>
      <input
        type="text"
        placeholder="Application ID"
        value={applicationId}
        onChange={(e) => setApplicationId(e.target.value)}
      />
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button onClick={handleUpdate}>Update</button>
      {message && (
        <p className={message.includes("Error") ? "error" : ""}>{message}</p>
      )}
    </div>
  );
};

export default UpdateApplication;
