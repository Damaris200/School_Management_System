const express = require("express");
const router = express.Router();
const db = require("../db/database"); // Importing the db connection and model

// Route to get all admissions (applications)
router.get("/", (req, res) => {
  let query = "SELECT * FROM admissions";

  console.log("🔍 Fetching applications with query:", query, "Params:");

  db.all(query, (err, rows) => {
    if (err) {
      console.error("❌ Database error:", err.message);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    res.json(rows);
  });
});

router.get("/filter/:status", (req, res) => {
  const { status } = req.params;

  db.all(`SELECT * FROM admissions WHERE status = ?`, [status], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Route to get a single admission by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM admissions WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch the admission" });
    }
    if (!row) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.json(row);
  });
});

router.post("/submit", (req, res) => {
  const { studentName, program } = req.body;

  if (!studentName || !program) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.run(
    `INSERT INTO admissions (studentName, program) VALUES (?, ?)`,
    [studentName, program],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Application submitted successfully!", id: this.lastID });
    }
  );
});

// Route to create a new admission (application)
router.post("/create", (req, res) => {
  const { studentName, program, status } = req.body;
  const applicationDate = new Date().toISOString(); // Use current timestamp for applicationDate

  db.run(
    `INSERT INTO admissions (studentName, program, status, applicationDate) VALUES (?, ?, ?, ?)`,
    [studentName, program, status || "Pending", applicationDate],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Failed to create admission" });
      }
      res.status(201).json({
        id: this.lastID,
        studentName,
        program,
        status: status || "Pending",
        applicationDate,
      });
    }
  );
});

// Route to update an admission's status (e.g., Pending -> Accepted or Rejected)
router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!status || !["Pending", "Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  db.run(
    `UPDATE admissions SET status = ? WHERE id = ?`,
    [status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Failed to update admission" });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: "Admission not found" });
      }
      res.json({ message: `Admission status updated to ${status}` });
    }
  );
});

// Route to delete an admission
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.run(`DELETE FROM admissions WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ message: "Failed to delete admission" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.json({ message: "Admission deleted successfully" });
  });
});

module.exports = router;
