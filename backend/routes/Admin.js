const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/AdminRegister');
const jwt = require('jsonwebtoken');
const JWT_SECRETE = "ayminisagoodgir@l";

router.post('/register', [

    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password'),
    body('name').notEmpty().withMessage('Name is required'),
    body('dob'),
    body('city').notEmpty().withMessage('City is required'),
    body('phoneNo').isMobilePhone().withMessage('Please provide a valid phone number')
], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name, dob, city, phoneNo } = req.body;
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const newAdmin = new User({ email, password, name, dob, city, phoneNo });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering admin' });
    }
});



router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const payload = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name

            }
        };

        const authToken = jwt.sign(payload, JWT_SECRETE, { expiresIn: '1d' });

        res.json({ success: true, authToken, id: user.id });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/getregisterdetail/:userId', async (req, res) => {
    try {

        const userId = req.params.userId;


        const user = await User.findById(userId, '-password');


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user details' });
    }
});

router.post('/reset-password/:userId', [

    body('currentPassword', 'Current password is required').notEmpty(),
    body('newPassword', 'New password is required').notEmpty(),
    body('confirmNewPassword', 'Confirmation of new password is required').notEmpty(),
], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId } = req.params;
        const { currentPassword, newPassword, confirmNewPassword } = req.body;


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        if (currentPassword !== user.password) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }


        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ error: 'New password and confirmation do not match' });
        }


        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while resetting password' });
    }
});


module.exports = router;
