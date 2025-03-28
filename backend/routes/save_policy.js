import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const SAVE_PATH = path.resolve('backend/saved_policies.json');

router.post('/', (req, res) => {
  const { district, url, text } = req.body;

  if (!district || !url || !text) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  const record = {
    district,
    url,
    text,
    timestamp: new Date().toISOString()
  };

  try {
    const entry = JSON.stringify(record, null, 2) + ',\n';
    fs.appendFileSync(SAVE_PATH, entry, 'utf-8');
    res.json({ success: true });
  } catch (err) {
    console.error('Save failed:', err);
    res.status(500).json({ success: false, error: 'Could not save policy' });
  }
});

export default router;