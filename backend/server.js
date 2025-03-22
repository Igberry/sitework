require('dotenv').config({ path: __dirname + '/.env' }); // Load env from correct path
console.log(`🔍 Loaded PORT: ${process.env.PORT}`); // Debugging line

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(() => console.error('❌ MongoDB Connection Failed'));

// Default Route
app.get('/', (req, res) => {
    res.send('Backend is Running 🚀');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
