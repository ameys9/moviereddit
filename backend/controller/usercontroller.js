const express = require('express');
const router = express.Router();
const User = require('../model/userschema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'x';

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
          return res.status(400).json({ message: 'Please provide all required fields' });
        }
    
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ message: 'User with this email already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });
    
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
        
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
            }
        
            const user = await User.findOne({ email });
            if (!user) {
            return res.status(400).json({ message: 'User does not exist ' });
            }
        
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
            }

            const username =  user.username;
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token  , username});
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });


module.exports = router;
