import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    try {
      console.log('Register request body:', req.body);
      const {
        name,
        email,
        password,
        type,
        phone,
        location,
        barRegistration,
        specialization,
        experience,
        fees,
        qualifications,
        about
      } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists:', email);
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        type,
        phone,
        location,
        barRegistration,
        specialization,
        experience,
        fees,
        qualifications,
        about
      });
      await user.save();

      console.log('User registered:', user);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
      console.error('Register error:', err);
      res.status(400).json({ error: err.message });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      type,
      phone,
      location,
      barRegistration,
      specialization,
      experience,
      fees,
      qualifications,
      about
    });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: user not found', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login failed: password mismatch', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Login successful:', user);
    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json({ error: err.message });
  }
});

export default router;

