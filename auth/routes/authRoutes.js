const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../../db");
require("dotenv").config();

const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 LIMIT 1",
      [username]
    );

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "User tidak ditemukan" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login berhasil",
      token,
    });
  } catch (err) {
    console.error("Error login:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await pool.query(
      "SELECT * FROM users WHERE username = $1 LIMIT 1",
      [username]
    );
    if (existing.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Username sudah digunakan" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);

    res.json({ success: true, message: "Registrasi berhasil" });
  } catch (err) {
    console.error("Error register:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Logout
router.post("/logout", (req, res) => {

  res.json({
    success: true,
    message: "Logout berhasil. Silakan hapus token di client."
  });
});

module.exports = router;
