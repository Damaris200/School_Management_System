const db = require("../db/database");

// Create Applications table
db.run(
  `CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentName TEXT NOT NULL,
    program TEXT NOT NULL,
    status TEXT DEFAULT 'Pending'
  )`
);

module.exports = db;
