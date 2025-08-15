const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://127.0.0.1:8000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require("./auth/routes/authRoutes");
const senjataRoutes = require("./senjata");

app.use("/api/auth", authRoutes);
app.use("/api/senjata", senjataRoutes);

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
