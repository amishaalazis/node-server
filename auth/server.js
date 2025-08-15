const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const cors = require('cors');
app.use(cors({
  origin: 'http://127.0.0.1:8000', // atau '*' untuk semua origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Node.js Auth API running on port ${PORT}`);
});

