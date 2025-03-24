const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware
const router = express.Router();

let refreshTokens = []; // Temporary storage (Consider Redis/DB for production)

// Generate Access Token (Short-Lived)
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } // Short expiry for security
    );
};

// Generate Refresh Token (Longer-Lived)
const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.REFRESH_SECRET,
        { expiresIn: '7d' } // Valid for 7 days
    );
    refreshTokens.push(refreshToken);
    return refreshToken;
};

// Register User
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, country, sex, course } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashedPassword, country, sex, course });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

// Refresh Token Endpoint
router.post('/refresh', (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(403).json({ message: 'Access Denied. No token provided.' });

    if (!refreshTokens.includes(token)) {
        return res.status(403).json({ message: 'Invalid Refresh Token' });
    }

    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or Expired Refresh Token' });

        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    });
});

// Logout - Remove Refresh Token
router.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(rt => rt !== token);
    res.json({ message: 'Logged out successfully' });
});

// Protected Route Example
router.get('/protected-route', authMiddleware, (req, res) => {
    res.json({ message: 'You have access!', user: req.user });
});

// Export Router
module.exports = { router, generateAccessToken };
