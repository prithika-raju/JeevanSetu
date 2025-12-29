const db = require("./database");

// Add missing columns if they don't exist
db.serialize(() => {
  db.run(`ALTER TABLE users ADD COLUMN email TEXT UNIQUE`, (err) => {
    if (err) console.log("email column already exists");
    else console.log("Added email column");
  });
  db.run(`ALTER TABLE users ADD COLUMN email_otp TEXT`, (err) => {
    if (err) console.log("email_otp column already exists");
    else console.log("Added email_otp column");
  });
  db.run(`ALTER TABLE users ADD COLUMN otp_expires_at INTEGER`, (err) => {
    if (err) console.log("otp_expires_at column already exists");
    else console.log("Added otp_expires_at column");
  });
  db.run(`ALTER TABLE users ADD COLUMN is_email_verified INTEGER DEFAULT 0`, (err) => {
    if (err) console.log("is_email_verified column already exists");
    else console.log("Added is_email_verified column");
  });
});
