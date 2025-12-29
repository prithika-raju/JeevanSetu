const express = require("express");
const db = require("../database");
const auth = require("../middleware/auth")
const router = express.Router();

/* =====================
   PATIENT: REQUEST BLOOD
===================== */
router.post("/request", (req, res) => {
  const { patientId, bloodGroup, units, hospitalId } = req.body;

  db.run(
    `
    INSERT INTO blood_requests
    (patient_id, blood_group, units, hospital_id, created_at)
    VALUES (?, ?, ?, ?, ?)
    `,
    [patientId, bloodGroup, units, hospitalId, Date.now()],
    () => res.json({ message: "Blood request submitted" })
  );
});

/* =====================
   HOSPITAL: VIEW REQUESTS
===================== */
router.get("/hospital/requests", (req, res) => {
  db.all(
    `SELECT * FROM blood_requests WHERE status = 'PENDING'`,
    [],
    (err, rows) => res.json(rows)
  );
});

/* =====================
   HOSPITAL: VERIFY REQUEST
===================== */
router.post("/hospital/verify", (req, res) => {
  const { requestId } = req.body;

  db.run(
    `UPDATE blood_requests SET status = 'VERIFIED' WHERE id = ?`,
    [requestId]
  );

  db.all(
    `
    SELECT id FROM users
    WHERE role = 'donor'
      AND blood_group = (
        SELECT blood_group FROM blood_requests WHERE id = ?
      )
    `,
    [requestId],
    (err, donors) => {
      donors.forEach(donor =>
        db.run(
          `INSERT INTO donor_notifications (request_id, donor_id)
           VALUES (?, ?)`,
          [requestId, donor.id]
        )
      );
    }
  );

  res.json({ message: "Request verified & donors notified" });
});

/* =====================
   DONOR: VIEW REQUESTS
===================== */
router.get("/donor/requests", (req, res) => {
  const { donorId } = req.query;

  if (!donorId) {
    return res.status(400).json({ message: "donorId is required" });
  }

  db.all(
    `
    SELECT 
      br.id,
      br.patient_id,
      br.blood_group,
      br.units,
      br.hospital_id,
      br.status,
      br.created_at
    FROM donor_notifications dn
    JOIN blood_requests br 
      ON br.id = dn.request_id
    WHERE dn.donor_id = ?
      AND dn.status = 'NOTIFIED'
      AND br.status = 'VERIFIED'
    ORDER BY br.created_at DESC
    `,
    [donorId],
    (err, rows) => {
      if (err) {
        console.error("Donor requests error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json(rows);
    }
  );
});



/* =====================
   DONOR: ACCEPT REQUEST
===================== */
router.post("/donor/accept", auth, (req, res) => {
  const donorId = req.user.id
  const { requestId } = req.body

  db.run(
    `UPDATE donor_notifications
     SET status = 'ACCEPTED'
     WHERE request_id = ? AND donor_id = ?`,
    [requestId, donorId]
  )

  db.run(
    `INSERT INTO donations (request_id, donor_id, status)
     VALUES (?, ?, 'IN_PROGRESS')`,
    [requestId, donorId]
  )

  db.run(
    `UPDATE blood_requests
     SET status = 'IN_PROGRESS'
     WHERE id = ?`,
    [requestId]
  )

  res.json({ message: "Donation accepted" })
})


/* =====================
   VOLUNTEER: VIEW ACTIVE
===================== */
router.get("/volunteer/requests", (req, res) => {
  db.all(
    `
    SELECT br.*, d.id AS donation_id
    FROM donations d
    JOIN blood_requests br ON br.id = d.request_id
    WHERE br.status = 'IN_PROGRESS'
    `,
    [],
    (err, rows) => res.json(rows)
  );
});

/* =====================
   HOSPITAL: COMPLETE
===================== */
router.post("/hospital/complete", (req, res) => {
  const { requestId } = req.body;

  db.run(
    `UPDATE blood_requests SET status = 'COMPLETED' WHERE id = ?`,
    [requestId]
  );

  db.run(
    `UPDATE donations SET status = 'COMPLETED' WHERE request_id = ?`,
    [requestId]
  );

  res.json({ message: "Request closed successfully" });
});

module.exports = router;
