import React, { useState } from "react";
import axios from "axios";
import "../styles/ApplicationForm.css"; // Import the stylesheet


const ApplicationForm = () => {
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [program, setProgram] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitting');
    try {
      const res = await axios.post("http://localhost:5000/applications/submit", {
        studentName,
        email,
        contactNumber,
        dateOfBirth,
        program,
      });
      console.log(res.data.message)
      setMessage(res.data.message);
      createUser();
    } catch (error) {
      setMessage("Error submitting application. Please try again.");
    }
  };

  const createUser = async () => {
    try {
      const userRes = await axios.post("http://localhost:5000/users/create", {
        studentName,
        email,
        contactNumber,
        dateOfBirth,
      });
      localStorage.setItem('userId', userRes.data.userId);
    } catch (error) {
      setMessage('Error creating user', error)
    }
  }

  return (
    <div className="application-form-container">
      <h2>Apply for a Program</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Student Name" 
          value={studentName} 
          onChange={(e) => setStudentName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="tel" 
          placeholder="Contact Number" 
          value={contactNumber} 
          onChange={(e) => setContactNumber(e.target.value)} 
          required 
        />
        <input 
          type="date" 
          placeholder="Date of Birth" 
          value={dateOfBirth} 
          onChange={(e) => setDateOfBirth(e.target.value)}  
          required 
        />
        <select value={program} onChange={(e) => setProgram(e.target.value)} required>
          <option value="" disabled>Select a Program</option>
          <optgroup label="Programs">
            <option value="Software Engineering">Software Engineering</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Data Science">Data Science</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Accounting">Accounting</option>
            <option value="Marketing">Marketing</option>
            <option value="Graphic Design">Graphic Design</option>
          </optgroup>
        </select>
        <button type="submit">Submit Application</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplicationForm;
