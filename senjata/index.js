const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, nama, kaliber, range, status_delete
      FROM senjata
      WHERE status_delete = false
      ORDER BY id ASC
    `);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Error fetching senjata:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
