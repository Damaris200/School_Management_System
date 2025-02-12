const express = require("express");
const router = express.Router();
const db = require("../models/Notification");
const sendEmail = require("../middleware/SendEmail");

// Route to get notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await db.findAll();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

// Route to create a new notification
router.post("/create", (req, res) => {
  const { applicantId, status, message, email } = req.body;

  if (!applicantId || !status || !email) {
    console.error("All fields are required");
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("Creating notification:", req.body);

  const sql = `INSERT INTO notifications (applicantId, status, message) VALUES (?, ?, ?)`;

  db.run(sql, [applicantId, status, message], function (err) {
    if (err) {
      console.error("Error creating notification:", err);
      return res.status(500).json({ message: "Failed to create notification" });
    }
    res.status(201).json({
      id: this.lastID,
      applicantId,
      status,
      message,
    });
  });

  sendEmail(email, 'Admission Status', 'Your application status has been updated to ' + status);
});

module.exports = router;
