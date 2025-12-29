const db = require("./database");

db.all("SELECT * FROM donor_notifications", [], (err, rows) => {
  if (err) {
    console.error("Error:", err.message);
  } else {
    console.log("Donor Notifications:");
    console.table(rows);
  }
  db.close();
});
