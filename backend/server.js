import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import savePolicyRoute from './routes/save_policy.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/save-policy', savePolicyRoute);

app.get('/', (req, res) => {
  res.send('Policy Editor Backend is running.');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend listening on port ${PORT}`));