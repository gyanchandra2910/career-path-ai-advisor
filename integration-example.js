/**
 * Integration example showing how to use skillGap module with the career advisor server
 * This demonstrates how the skillGap function could be integrated into your existing API
 */

const express = require('express');
const { skillGap } = require('./skillGap');

const app = express();
app.use(express.json());

// Mock career paths database (in real app, this would come from a database)
const CAREER_PATHS = {
  'frontend-developer': {
    title: 'Frontend Developer',
    requiredSkills: ['html', 'css', 'javascript', 'react', 'typescript', 'git', 'figma', 'responsive design']
  },
  'data-scientist': {
    title: 'Data Scientist',
    requiredSkills: ['python', 'machine learning', 'statistics', 'sql', 'r programming', 'tableau', 'aws', 'data analysis']
  },
  'backend-developer': {
    title: 'Backend Developer',
    requiredSkills: ['node.js', 'javascript', 'sql', 'mongodb', 'express', 'git', 'docker', 'aws']
  },
  'fullstack-developer': {
    title: 'Full Stack Developer',
    requiredSkills: ['javascript', 'react', 'node.js', 'sql', 'git', 'html', 'css', 'mongodb', 'express']
  }
};

/**
 * API endpoint to analyze skill gap for a specific career path
 * POST /api/skill-gap-analysis
 * Body: { userSkills: string[], careerPath: string }
 */
app.post('/api/skill-gap-analysis', (req, res) => {
  try {
    const { userSkills, careerPath } = req.body;
    
    // Validate input
    if (!Array.isArray(userSkills)) {
      return res.status(400).json({
        error: 'userSkills must be an array of strings'
      });
    }
    
    if (!CAREER_PATHS[careerPath]) {
      return res.status(400).json({
        error: 'Invalid career path',
        availablePaths: Object.keys(CAREER_PATHS)
      });
    }
    
    // Perform skill gap analysis
    const career = CAREER_PATHS[careerPath];
    const analysis = skillGap(userSkills, career.requiredSkills);
    
    // Calculate readiness percentage
    const readinessPercentage = Math.round((analysis.have.length / career.requiredSkills.length) * 100);
    
    // Determine readiness level
    let readinessLevel;
    if (readinessPercentage >= 80) {
      readinessLevel = 'Excellent - Ready to apply!';
    } else if (readinessPercentage >= 60) {
      readinessLevel = 'Good - Minor skill gaps to address';
    } else if (readinessPercentage >= 40) {
      readinessLevel = 'Moderate - Some important skills needed';
    } else {
      readinessLevel = 'Beginner - Significant learning required';
    }
    
    // Return comprehensive analysis
    res.json({
      careerPath: career.title,
      userSkills: userSkills,
      requiredSkills: career.requiredSkills,
      analysis: {
        skillsMatched: analysis.have,
        skillsMissing: analysis.missing,
        missingCount: analysis.missing_count,
        learningPriority: analysis.priority
      },
      readiness: {
        percentage: readinessPercentage,
        level: readinessLevel,
        totalRequired: career.requiredSkills.length,
        currentlyHave: analysis.have.length
      },
      recommendations: {
        nextSteps: analysis.priority.slice(0, 3).map(skill => `Learn ${skill.skill}`),
        timeEstimate: `${analysis.missing_count * 2}-${analysis.missing_count * 4} weeks`
      }
    });
    
  } catch (error) {
    console.error('Skill gap analysis error:', error);
    res.status(500).json({
      error: 'Internal server error during skill gap analysis'
    });
  }
});

/**
 * API endpoint to get available career paths
 * GET /api/career-paths
 */
app.get('/api/career-paths', (req, res) => {
  const paths = Object.entries(CAREER_PATHS).map(([key, value]) => ({
    id: key,
    title: value.title,
    requiredSkillsCount: value.requiredSkills.length
  }));
  
  res.json({
    availablePaths: paths
  });
});

// Example usage function (for demonstration)
function demonstrateIntegration() {
  console.log('🔗 Integration Example: Career Path Skill Gap Analysis\n');
  
  // Example 1: Frontend Developer analysis
  const userSkills1 = ['HTML', 'CSS', 'JavaScript', 'jQuery'];
  const analysis1 = skillGap(userSkills1.map(s => s.toLowerCase()), CAREER_PATHS['frontend-developer'].requiredSkills);
  
  console.log('👤 User Skills:', userSkills1.join(', '));
  console.log('🎯 Career Goal: Frontend Developer');
  console.log('📊 Readiness:', Math.round((analysis1.have.length / CAREER_PATHS['frontend-developer'].requiredSkills.length) * 100) + '%');
  console.log('🎯 Next Priority Skills:', analysis1.priority.slice(0, 3).map(p => p.skill).join(', '));
  console.log('');
  
  // Example 2: Data Scientist analysis
  const userSkills2 = ['Python', 'Statistics', 'Excel'];
  const analysis2 = skillGap(userSkills2.map(s => s.toLowerCase()), CAREER_PATHS['data-scientist'].requiredSkills);
  
  console.log('👤 User Skills:', userSkills2.join(', '));
  console.log('🎯 Career Goal: Data Scientist');
  console.log('📊 Readiness:', Math.round((analysis2.have.length / CAREER_PATHS['data-scientist'].requiredSkills.length) * 100) + '%');
  console.log('🎯 Next Priority Skills:', analysis2.priority.slice(0, 3).map(p => p.skill).join(', '));
}

// Run demonstration if called directly
if (require.main === module) {
  demonstrateIntegration();
  
  // Optionally start server
  // const PORT = 3002;
  // app.listen(PORT, () => {
  //   console.log(`\n🚀 Skill Gap Analysis API running on http://localhost:${PORT}`);
  //   console.log('📍 Available endpoints:');
  //   console.log('  POST /api/skill-gap-analysis');
  //   console.log('  GET  /api/career-paths');
  // });
}

module.exports = { app, CAREER_PATHS };
