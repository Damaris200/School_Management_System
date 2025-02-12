const express = require("express");
const cors = require("cors");
const db = require('./models/User');
const adb = require('./models/Admission');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Allows us to receive JSON data

// Import routes
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const admissionsRoutes = require("./routes/admissionsRoutes");

// Use routes
app.use("/auth", authRoutes);
app.use("/applications", admissionsRoutes);
app.use("/notification", notificationRoutes);
app.use("/admissions", admissionsRoutes);

app.post("/users/create", (req, res) => {
  const { studentName, email, contactNumber, dateOfBirth } = req.body
  const sql = `INSERT INTO users (name, email, contactNumber, dateOfBirth) VALUES (?, ?, ?, ?)`;
  db.run(sql, [studentName, email, contactNumber, dateOfBirth], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "User created successfully", userId: this.lastID });
  });
});

// Get user by applicantId
app.get("/applicant/:id", (req, res) => {
  const { id } = req.params;

  adb.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "User not found" });
    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
