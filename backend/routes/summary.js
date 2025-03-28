import express from 'express';

const router = express.Router();

router.post('/summarize', async (req, res) => {
  const { text } = req.body;
  res.json({ summary: `Summary: ${text.slice(0, 100)}...` });
});

export default router;