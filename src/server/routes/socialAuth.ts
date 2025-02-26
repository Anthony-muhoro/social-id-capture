
import express from 'express';
import { verifyGoogleToken, verifyFacebookToken } from '../services/auth';

const router = express.Router();

router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const userData = await verifyGoogleToken(token);
    res.status(200).json(userData);
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.post('/facebook', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const userData = await verifyFacebookToken(token);
    res.status(200).json(userData);
  } catch (error) {
    console.error('Facebook auth error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export { router as socialAuthRouter };
