/**
 * Skill Gap Analysis Module
 * Analyzes the gap between a user's current skills and required skills for a career path
 */

/**
 * Skill frequency data across different careers (simplified heuristic)
 * Higher values indicate more critical/frequent skills
 */
const SKILL_FREQUENCY_MAP = {
  // Programming Languages
  'javascript': 95,
  'python': 90,
  'java': 85,
  'typescript': 80,
  'c++': 75,
  'sql': 88,
  'html': 85,
  'css': 80,
  'react': 85,
  'node.js': 80,
  'angular': 70,
  'vue.js': 65,
  
  // Data & Analytics
  'data analysis': 85,
  'machine learning': 80,
  'statistics': 75,
  'excel': 70,
  'tableau': 65,
  'power bi': 60,
  'r programming': 70,
  
  // Cloud & DevOps
  'aws': 85,
  'azure': 80,
  'docker': 75,
  'kubernetes': 70,
  'git': 90,
  'ci/cd': 70,
  
  // Soft Skills
  'communication': 95,
  'leadership': 85,
  'problem solving': 90,
  'teamwork': 88,
  'project management': 80,
  'critical thinking': 85,
  
  // Design & UX
  'ui/ux design': 75,
  'figma': 70,
  'photoshop': 65,
  'wireframing': 60,
  
  // Default for unknown skills
  'default': 50
};

/**
 * Get skill priority score based on frequency and relevance
 * @param {string} skill - The skill to evaluate
 * @returns {number} Priority score (higher = more critical)
 */
function getSkillPriority(skill) {
  const normalizedSkill = skill.toLowerCase().trim();
  return SKILL_FREQUENCY_MAP[normalizedSkill] || SKILL_FREQUENCY_MAP['default'];
}

/**
 * Generate priority reason based on skill score
 * @param {string} skill - The skill name
 * @param {number} score - The priority score
 * @returns {string} Human-readable reason
 */
function getPriorityReason(skill, score) {
  if (score >= 85) {
    return `Critical skill - highly demanded across most career paths`;
  } else if (score >= 70) {
    return `Important skill - commonly required in many positions`;
  } else if (score >= 60) {
    return `Valuable skill - good to have for competitive advantage`;
  } else {
    return `Nice-to-have skill - may be beneficial for specific roles`;
  }
}

/**
 * Normalize skill names for comparison (lowercase, trim whitespace)
 * @param {string[]} skills - Array of skill names
 * @returns {string[]} Normalized skill names
 */
function normalizeSkills(skills) {
  if (!Array.isArray(skills)) {
    return [];
  }
  return skills.map(skill => 
    typeof skill === 'string' ? skill.toLowerCase().trim() : ''
  ).filter(skill => skill.length > 0);
}

/**
 * Analyze skill gap between user's profile skills and required skills
 * @param {string[]} profileSkills - Skills the user currently has
 * @param {string[]} requiredSkills - Skills required for the target career
 * @returns {Object} Skill gap analysis result
 */
function skillGap(profileSkills, requiredSkills) {
  // Validate inputs
  if (!Array.isArray(profileSkills) || !Array.isArray(requiredSkills)) {
    throw new Error('Both profileSkills and requiredSkills must be arrays');
  }

  // Normalize skills for case-insensitive comparison
  const normalizedProfileSkills = normalizeSkills(profileSkills);
  const normalizedRequiredSkills = normalizeSkills(requiredSkills);
  
  // Create sets for efficient lookup
  const profileSkillSet = new Set(normalizedProfileSkills);
  const requiredSkillSet = new Set(normalizedRequiredSkills);
  
  // Find skills user has that are required
  const have = normalizedRequiredSkills.filter(skill => profileSkillSet.has(skill));
  
  // Find missing skills
  const missing = normalizedRequiredSkills.filter(skill => !profileSkillSet.has(skill));
  
  // Calculate priority for missing skills
  const priority = missing
    .map(skill => {
      const score = getSkillPriority(skill);
      return {
        skill: skill,
        reason: getPriorityReason(skill, score),
        score: score // Internal score for sorting
      };
    })
    .sort((a, b) => b.score - a.score) // Sort by priority (highest first)
    .map(({ skill, reason }) => ({ skill, reason })); // Remove internal score
  
  return {
    have: have,
    missing: missing,
    missing_count: missing.length,
    priority: priority
  };
}

module.exports = {
  skillGap,
  getSkillPriority,
  normalizeSkills,
  SKILL_FREQUENCY_MAP
};
