const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "users.db");
console.log("DB FILE PATH =>", dbPath);

const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("DB OPEN ERROR:", err);
    } else {
      console.log("SQLite Connected");
    }
  }
);

/* 🔒 VERY IMPORTANT — DISABLE WAL */
db.serialize(() => {
  db.run("PRAGMA journal_mode = DELETE;");
  db.run("PRAGMA synchronous = FULL;");
  db.run("PRAGMA foreign_keys = ON;");
});

/* TABLES */
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT,
      full_name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      city TEXT,
      state TEXT,
      blood_group TEXT,
      last_transfusion_date TEXT,
      transfusion_frequency TEXT,
      last_donation_date TEXT,
      willing_to_donate TEXT,
      email_otp TEXT,
      otp_expires_at INTEGER,
      is_email_verified INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS blood_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      blood_group TEXT,
      units INTEGER,
      hospital_id INTEGER,
      status TEXT DEFAULT 'PENDING',
      created_at INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS donor_notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      request_id INTEGER,
      donor_id INTEGER,
      status TEXT DEFAULT 'NOTIFIED'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      request_id INTEGER,
      donor_id INTEGER,
      volunteer_id INTEGER,
      status TEXT DEFAULT 'ASSIGNED'
    )
  `);
});

module.exports = db;
