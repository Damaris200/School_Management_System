const express = require("express");
const db = require("../models/Admission"); // Import database
const router = express.Router();

router.get("/", (req, res) => {
  const { filter } = req.query;
  let query = "SELECT * FROM admissions";
  let params = [];

  if (filter) {
    query += " WHERE status = ?";
    params.push(filter);
  }

  console.log("🔍 Fetching applications with query:", query, "Params:", params);

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("❌ Database fetch error:", err.message);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    res.json(rows);
  });
});

// Submit a new application
router.post("/submit", (req, res) => {
  const { studentName, email, program } = req.body;

  if (!studentName || !program || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.run(
    `INSERT INTO admissions (studentName,email, program) VALUES (?, ?, ?)`,
    [studentName, email, program],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Application submitted successfully!", id: this.lastID });
    }
  );
});

// Get all applications
router.get("/", (req, res) => {
  db.all(`SELECT * FROM admission`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Filter applications by status
router.get("/filter/:status", (req, res) => {
  const { status } = req.params;

  db.all(`SELECT * FROM admission WHERE status = ?`, [status], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update application status
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Pending", "Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  db.run(
    `UPDATE admissions SET status = ? WHERE id = ?`,
    [status, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Application status updated successfully!" });
    }
  );
});

module.exports = router;
