const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Ensure the path to the User model is correct

// ✅ GET all registered users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// ✅ POST - Register a new user
router.post('/', async (req, res) => {
    try {
        const { fullName, email, country, sex, course } = req.body;
        const newUser = new User({ fullName, email, country, sex, course });
        await newUser.save();
        res.status(201).json({ message: 'Registration successful!', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// ✅ PUT - Update a user's details by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// ✅ DELETE - Remove a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

module.exports = router;
