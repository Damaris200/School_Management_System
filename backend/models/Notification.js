// db/notifications.js
const db = require("../db/database");

// Create Notifications table
db.run(
  `CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    applicantId INTEGER NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL,
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
    FOREIGN KEY (applicantId) REFERENCES users(id) ON DELETE CASCADE
  )`
);

module.exports = db;
