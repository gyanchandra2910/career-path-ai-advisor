const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// In-memory storage for profiles
const profiles = new Map();
let profileIdCounter = 1;

// Validation middleware for profile creation
const validateProfile = (req, res, next) => {
  const { name, skills } = req.body;
  
  // Check if name exists and is a non-empty string
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      error: 'Name is required and must be a non-empty string'
    });
  }
  
  // Check if skills exists and is an array
  if (!skills || !Array.isArray(skills)) {
    return res.status(400).json({
      error: 'Skills is required and must be an array'
    });
  }
  
  // Validate skills array is not empty and contains strings
  if (skills.length === 0) {
    return res.status(400).json({
      error: 'Skills array cannot be empty'
    });
  }
  
  const invalidSkills = skills.filter(skill => typeof skill !== 'string' || skill.trim().length === 0);
  if (invalidSkills.length > 0) {
    return res.status(400).json({
      error: 'All skills must be non-empty strings'
    });
  }
  
  next();
};

// POST /api/profile - Create new profile
app.post('/api/profile', validateProfile, (req, res) => {
  try {
    const { name, skills, ...otherData } = req.body;
    
    // Generate unique ID
    const profileId = profileIdCounter++;
    
    // Create profile object
    const profile = {
      id: profileId,
      name: name.trim(),
      skills: skills.map(skill => skill.trim()),
      ...otherData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store in memory
    profiles.set(profileId, profile);
    
    console.log(`Profile created with ID: ${profileId}`);
    
    // Respond with 201 and the saved object ID
    res.status(201).json({
      success: true,
      id: profileId,
      message: 'Profile created successfully'
    });
    
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({
      error: 'Internal server error while creating profile'
    });
  }
});

// GET /api/profile/:id - Get profile by ID
app.get('/api/profile/:id', (req, res) => {
  try {
    const profileId = parseInt(req.params.id, 10);
    
    // Validate ID is a number
    if (isNaN(profileId)) {
      return res.status(400).json({
        error: 'Profile ID must be a valid number'
      });
    }
    
    // Check if profile exists
    const profile = profiles.get(profileId);
    
    if (!profile) {
      return res.status(404).json({
        error: 'Profile not found'
      });
    }
    
    console.log(`Profile retrieved: ID ${profileId}`);
    
    // Return the profile
    res.json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('Error retrieving profile:', error);
    res.status(500).json({
      error: 'Internal server error while retrieving profile'
    });
  }
});

// GET /api/profiles - Get all profiles (bonus endpoint)
app.get('/api/profiles', (req, res) => {
  try {
    const allProfiles = Array.from(profiles.values());
    
    res.json({
      success: true,
      data: allProfiles,
      count: allProfiles.length
    });
    
  } catch (error) {
    console.error('Error retrieving profiles:', error);
    res.status(500).json({
      error: 'Internal server error while retrieving profiles'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    profilesCount: profiles.size
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    availableRoutes: [
      'POST /api/profile',
      'GET /api/profile/:id',
      'GET /api/profiles',
      'GET /health'
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Profile API: http://localhost:${PORT}/api/profile`);
});

server.on('error', (err) => {
  console.error('❌ Server Error:', err);
});

module.exports = app;
