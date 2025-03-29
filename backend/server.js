// File: backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import savePolicyRoute from './routes/save_policy.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/save-policy', savePolicyRoute);

// Default route (health check)
app.get('/', (req, res) => {
  res.send('Policy Editor Backend is running.');
});

// Start server only if this file is run directly
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Backend listening on port ${PORT}`);
  });
}

// Export app for testing
export default app;