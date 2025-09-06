const express = require('express');
const router = express.Router();

// Welcome endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Career Path AI Advisor API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      career: '/api/career',
      advice: '/api/career/advice',
      profile: '/api/career/profile'
    }
  });
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({
    message: 'API is working correctly!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
