const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// AI endpoint stub
app.post('/api/generate-roadmap', async (req, res) => {
  // Implementation in Task 3
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));