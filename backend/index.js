import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

import checkoutRoutes from './routes/checkout.js';
import scraperRoutes from './routes/scraper.js';
import summaryRoutes from './routes/summary.js';
import webhookRoutes from './routes/webhook.js';

dotenv.config();

const app = express();
app.use('/webhook', express.raw({ type: 'application/json' })); // Stripe webhook
app.use(cors());
app.use(express.json());

app.use('/api', checkoutRoutes);
app.use('/api', scraperRoutes);
app.use('/api', summaryRoutes);
app.use('/webhook', webhookRoutes);

app.get('/api/versions/:docId', (req, res) => {
  const { docId } = req.params;
  const mockData = [
    { version: 'v1', timestamp: new Date().toISOString() },
    { version: 'v2', timestamp: new Date().toISOString() }
  ];
  res.json(mockData);
});

app.get('/', (req, res) => {
  res.send('🔥 Backend is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Backend running on http://localhost:${PORT}`));
