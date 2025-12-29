const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const db = require("../database");
const router = express.Router();

const SECRET_KEY = "jeevansetu_2025_secret";

/* ===========================
   EMAIL CONFIG
=========================== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mvmarketplace.app@gmail.com", // 🔴 replace with your Gmail
    pass: "bgmfurhixtttueym"         // 🔴 Gmail app password
  }
});

/* ===========================
   OTP GENERATOR
=========================== */
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/* ===========================
   SEND EMAIL OTP
=========================== */
router.post("/send-email-otp", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = generateOtp();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  const query = `
    INSERT INTO users (email, email_otp, otp_expires_at, is_email_verified)
    VALUES (?, ?, ?, 0)
    ON CONFLICT(email) DO UPDATE SET
      email_otp = excluded.email_otp,
      otp_expires_at = excluded.otp_expires_at,
      is_email_verified = 0
  `;

  db.run(query, [email, otp, expiresAt], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    const mailOptions = {
      from: "JeevanSetu <mvmarketplace.app@gmail.com>",
      to: email,
      subject: "Your JeevanSetu OTP",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Email sending error:", error);
        return res.status(500).json({ message: "Email sending failed", error: error.message });
      }

      res.json({ message: "OTP sent to email" });
    });
  });
});

/* ===========================
   VERIFY EMAIL OTP
=========================== */
router.post("/verify-email-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ message: "Email and OTP are required" });

  db.get(
    `
    SELECT email_otp, otp_expires_at
    FROM users
    WHERE email = ?
    `,
    [email],
    (err, row) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err.message });
      }
      if (!row) return res.status(404).json({ message: "Email not found" });

      if (Date.now() > row.otp_expires_at) {
        return res.status(400).json({ message: "OTP expired" });
      }

      if (row.email_otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      db.run(
        `
        UPDATE users
        SET is_email_verified = 1,
            email_otp = NULL,
            otp_expires_at = NULL
        WHERE email = ?
        `,
        [email],
        (updateErr) => {
          if (updateErr) {
            console.error("Database update error:", updateErr);
            return res.status(500).json({ message: "Database error", error: updateErr.message });
          }
          res.json({ message: "Email verified successfully" });
        }
      );
    }
  );
});

/* ===========================
   REGISTER
=========================== */
router.post("/register", async (req, res) => {
  const {
    role,
    fullName,
    email,
    password,
    city,
    state,
    bloodGroup,
    lastTransfusionDate,
    transfusionFrequency,
    lastDonationDate,
    willingToDonatRegularly
  } = req.body;

  db.get("SELECT email FROM users WHERE email = ?", [email], async (err, row) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    if (row && row.password)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      UPDATE users SET
        role = ?,
        full_name = ?,
        password = ?,
        city = ?,
        state = ?,
        blood_group = ?,
        last_transfusion_date = ?,
        transfusion_frequency = ?,
        last_donation_date = ?,
        willing_to_donate = ?
      WHERE email = ?
    `;

    db.run(
      sql,
      [
        role,
        fullName,
        hashedPassword,
        city,
        state,
        bloodGroup,
        lastTransfusionDate,
        transfusionFrequency,
        lastDonationDate,
        willingToDonatRegularly,
        email
      ],
      (err) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error", error: err.message });
        }
        res.json({ message: "Registration successful" });
      }
    );
  });
});

/* ===========================
   LOGIN
=========================== */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    if (!user) return res.status(401).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role,
      user: {
        fullName: user.full_name,
        email: user.email
      }
    });
  });
});

module.exports = router;
