const careerService = require('../services/careerService');

const careerController = {
  // Get AI-powered career advice
  getCareerAdvice: async (req, res) => {
    try {
      const { skills, interests, experience, goals } = req.body;
      
      if (!skills || !interests) {
        return res.status(400).json({
          error: 'Skills and interests are required'
        });
      }

      const advice = await careerService.generateCareerAdvice({
        skills,
        interests,
        experience,
        goals
      });

      res.json({
        success: true,
        data: advice
      });
    } catch (error) {
      console.error('Error getting career advice:', error);
      res.status(500).json({
        error: 'Failed to generate career advice'
      });
    }
  },

  // Get user profile
  getUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const profile = await careerService.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({
          error: 'User profile not found'
        });
      }

      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      console.error('Error getting user profile:', error);
      res.status(500).json({
        error: 'Failed to get user profile'
      });
    }
  },

  // Create user profile
  createUserProfile: async (req, res) => {
    try {
      const { name, email, college, year, interests, skills, quizAnswers } = req.body;
      
      // Validate required fields
      if (!name || !email || !college || !year || !interests || !skills || !quizAnswers) {
        return res.status(400).json({
          error: 'Missing required fields'
        });
      }

      // Parse JSON fields
      let parsedInterests, parsedQuizAnswers;
      try {
        parsedInterests = JSON.parse(interests);
        parsedQuizAnswers = JSON.parse(quizAnswers);
      } catch (parseError) {
        return res.status(400).json({
          error: 'Invalid JSON format for interests or quiz answers'
        });
      }

      const profileData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        college: college.trim(),
        year,
        interests: parsedInterests,
        skills: skills.trim(),
        quizAnswers: parsedQuizAnswers,
        resumeFile: req.file ? {
          filename: req.file.filename,
          originalName: req.file.originalname,
          path: req.file.path,
          size: req.file.size
        } : null
      };

      const profile = await careerService.createUserProfile(profileData);
      
      res.status(201).json({
        success: true,
        data: profile,
        message: 'Profile created successfully'
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      
      // Handle multer errors
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'File size too large. Maximum size is 5MB.'
        });
      }
      
      if (error.message.includes('Only PDF and Word documents')) {
        return res.status(400).json({
          error: 'Invalid file type. Only PDF and Word documents are allowed.'
        });
      }

      res.status(500).json({
        error: 'Failed to create user profile'
      });
    }
  },

  // Update user profile
  updateUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const updateData = req.body;
      
      const profile = await careerService.updateUserProfile(userId, updateData);
      
      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({
        error: 'Failed to update user profile'
      });
    }
  },

  // Get available career paths
  getCareerPaths: async (req, res) => {
    try {
      const paths = await careerService.getCareerPaths();
      
      res.json({
        success: true,
        data: paths
      });
    } catch (error) {
      console.error('Error getting career paths:', error);
      res.status(500).json({
        error: 'Failed to get career paths'
      });
    }
  },

  // Analyze user skills
  analyzeSkills: async (req, res) => {
    try {
      const { skills } = req.body;
      
      if (!skills || !Array.isArray(skills)) {
        return res.status(400).json({
          error: 'Skills array is required'
        });
      }

      const analysis = await careerService.analyzeSkills(skills);
      
      res.json({
        success: true,
        data: analysis
      });
    } catch (error) {
      console.error('Error analyzing skills:', error);
      res.status(500).json({
        error: 'Failed to analyze skills'
      });
    }
  }
};

module.exports = careerController;
