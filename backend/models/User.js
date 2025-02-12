const db = require("../db/database");

// Create User table
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    contactNumber INT,
    dateOfBirth DATE
  )`
);

module.exports = db;
