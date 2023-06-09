import express from 'express';
import userModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create user signup
router.post('/signUp', async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
        age,
      });

      const payload = { id: newUser._id };
      const accessKey = process.env.ACCESS_SECRET_KEY;
      const accessLife = process.env.ACCESS_TOKEN_LIFE;

      const accessToken = jwt.sign(payload, accessKey, { expiresIn: accessLife });

      res.cookie('jwt', accessToken, { httpOnly: true });
      res.status(201).json({ success: true, token: accessToken });
    } else {
      res.status(400).json('User already exists with this email');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// logIn routes and controllers
router.post('/signIn', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await userModel.findOne({ email });
  
      if (!existingUser) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
  
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Invalid password',
        });
      }
  
      const accessToken = jwt.sign({ id: existingUser._id }, process.env.ACCESS_SECRET_KEY);
  
      res.status(200).json({
        message: 'Successfully signed in',
        token: accessToken,
        user: existingUser,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to sign in',
        error: error.message,
      });
    }
  });

export default router;
