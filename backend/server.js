require('dotenv').config({ path: __dirname + '/.env' }); // Load .env from correct path
console.log(`Loaded PORT from .env: ${process.env.PORT}`); // Debugging

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const contactRoutes = require("./routes/contact");
const dashboardRoutes = require("./routes/dashboard");

// Import Authentication Middleware and Routes
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware'); // Updated path to separate middleware file

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(express.json());
app.use("/contact", contactRoutes);
app.use("/dashboard", dashboardRoutes);

// Use Authentication Routes
app.use('/auth', authRoutes.router);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(() => console.error('MongoDB Connection Failed'));

// Load Swagger JSON from the docs folder
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'swagger.json'), 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import and use other routes
const registerRoutes = require('./routes/register');
app.use('/register', registerRoutes);
console.log('Register route loaded');

const courseRoutes = require('./routes/courses');
app.use('/courses', authMiddleware, courseRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Backend is Running');
});
app.get("/courses", async (req, res) => {
    try {
        const courses = await CourseModel.find(); // Fetch from MongoDB
        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Failed to load courses" });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
