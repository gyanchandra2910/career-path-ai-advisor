const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

// Career advice routes
router.post('/advice', careerController.getCareerAdvice);
router.get('/profile/:userId', careerController.getUserProfile);
router.post('/profile', careerController.createUserProfile);
router.put('/profile/:userId', careerController.updateUserProfile);

// Career paths and recommendations
router.get('/paths', careerController.getCareerPaths);
router.post('/analyze', careerController.analyzeSkills);

module.exports = router;
