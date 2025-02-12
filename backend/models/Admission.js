// db/admissions.js
const db = require("../db/database");

// Create Admissions table (Admission table)
db.run(
  `CREATE TABLE IF NOT EXISTS admissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentName TEXT NOT NULL,
    program TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    applicationDate TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')) 
  )`
);

module.exports = db;
