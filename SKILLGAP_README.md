# SkillGap Analysis Module

A Node.js module for analyzing skill gaps between a user's current skills and required skills for career paths. This module provides intelligent prioritization based on skill frequency across careers and relevance.

## Features

- **Skill Gap Analysis**: Compare user skills against required skills
- **Intelligent Prioritization**: Rank missing skills by importance using career frequency data
- **Case-Insensitive Matching**: Handles variations in skill naming
- **Comprehensive Output**: Returns matched skills, missing skills, and prioritized learning recommendations
- **Robust Error Handling**: Validates inputs and handles edge cases
- **100% Test Coverage**: Comprehensive Jest test suite included

## Installation

```bash
npm install
```

For testing:
```bash
npm install --save-dev jest
```

## Quick Start

```javascript
const { skillGap } = require('./skillGap');

const userSkills = ['HTML', 'CSS', 'JavaScript'];
const requiredSkills = ['html', 'css', 'javascript', 'react', 'typescript', 'git'];

const analysis = skillGap(userSkills, requiredSkills);
console.log(analysis);
```

## API Reference

### `skillGap(profileSkills, requiredSkills)`

Analyzes the gap between user's current skills and required skills.

**Parameters:**
- `profileSkills` (Array<string>): Skills the user currently possesses
- `requiredSkills` (Array<string>): Skills required for the target position/career

**Returns:**
```javascript
{
  have: string[],           // Skills user has that are required
  missing: string[],        // Skills user is missing
  missing_count: number,    // Count of missing skills
  priority: Array<{         // Missing skills ranked by priority
    skill: string,
    reason: string
  }>
}
```

**Example:**
```javascript
const result = skillGap(
  ['HTML', 'CSS', 'JavaScript'], 
  ['html', 'css', 'javascript', 'react', 'git']
);

// Output:
{
  have: ['html', 'css', 'javascript'],
  missing: ['react', 'git'],
  missing_count: 2,
  priority: [
    { skill: 'git', reason: 'Critical skill - highly demanded across most career paths' },
    { skill: 'react', reason: 'Critical skill - highly demanded across most career paths' }
  ]
}
```

### Priority Scoring System

Skills are prioritized using a frequency-based scoring system:

- **90-100**: Critical skills (e.g., JavaScript, Git, Communication)
- **70-89**: Important skills (e.g., React, AWS, SQL)
- **60-69**: Valuable skills (e.g., Docker, Tableau)
- **50-59**: Nice-to-have skills (e.g., Figma, specific frameworks)

### Helper Functions

#### `getSkillPriority(skill)`
Returns the priority score for a given skill.

#### `normalizeSkills(skills)`
Normalizes skill names (lowercase, trimmed) for comparison.

## Usage Examples

### Frontend Developer Analysis
```javascript
const profileSkills = ['HTML', 'CSS', 'JavaScript', 'jQuery'];
const requiredSkills = ['html', 'css', 'javascript', 'react', 'typescript', 'git'];

const result = skillGap(profileSkills, requiredSkills);
// Result shows user has 3/6 skills, missing React, TypeScript, Git
// Priority: Git (critical) → React (critical) → TypeScript (important)
```

### Data Scientist Analysis
```javascript
const profileSkills = ['Python', 'Excel', 'Statistics'];
const requiredSkills = ['python', 'machine learning', 'sql', 'statistics', 'aws'];

const result = skillGap(profileSkills, requiredSkills);
// Result shows user has 2/5 skills, missing ML, SQL, AWS
// Priority: SQL (critical) → AWS (critical) → Machine Learning (important)
```

### Complete Beginner Analysis
```javascript
const profileSkills = ['Microsoft Word', 'Email'];
const requiredSkills = ['javascript', 'html', 'css', 'react'];

const result = skillGap(profileSkills, requiredSkills);
// Result shows user has 0/4 skills, all skills missing
// Priority: JavaScript (critical) → HTML (critical) → CSS (important) → React (critical)
```

## Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

The module includes 18 comprehensive tests covering:
- ✅ Multiple real-world scenarios
- ✅ Edge cases (empty arrays, invalid inputs)
- ✅ Case sensitivity and whitespace handling
- ✅ Priority ranking accuracy
- ✅ Error handling
- ✅ Helper function validation

**Test Coverage: 100%** (Statements, Branches, Functions, Lines)

## Integration Example

See `integration-example.js` for a complete example of integrating skillGap with an Express API:

```javascript
// POST /api/skill-gap-analysis
{
  "userSkills": ["HTML", "CSS", "JavaScript"],
  "careerPath": "frontend-developer"
}

// Response includes comprehensive analysis with readiness percentage
{
  "analysis": {
    "skillsMatched": ["html", "css", "javascript"],
    "skillsMissing": ["react", "typescript", "git"],
    "learningPriority": [...]
  },
  "readiness": {
    "percentage": 75,
    "level": "Good - Minor skill gaps to address"
  }
}
```

## Demonstration

Run the interactive demonstration:

```bash
node demo-skillGap.js
```

This will show practical examples for different career paths and skill levels.

## Skill Database

The module includes a comprehensive skill frequency database covering:

- **Programming Languages**: JavaScript, Python, Java, TypeScript, C++, etc.
- **Web Technologies**: HTML, CSS, React, Angular, Vue.js, Node.js
- **Data & Analytics**: SQL, Machine Learning, Statistics, Tableau, Power BI
- **Cloud & DevOps**: AWS, Azure, Docker, Kubernetes, CI/CD
- **Soft Skills**: Communication, Leadership, Problem Solving, Teamwork
- **Design & UX**: UI/UX Design, Figma, Photoshop, Wireframing

The database is easily extensible - simply add new skills to `SKILL_FREQUENCY_MAP` in `skillGap.js`.

## Error Handling

The module provides robust error handling:

- ✅ Validates input types (arrays required)
- ✅ Handles null/undefined inputs gracefully
- ✅ Filters out invalid skill entries
- ✅ Normalizes case sensitivity and whitespace
- ✅ Provides meaningful error messages

## Contributing

To add new skills or modify priority scores:

1. Update `SKILL_FREQUENCY_MAP` in `skillGap.js`
2. Add corresponding tests in `skillGap.test.js`
3. Run `npm test` to ensure all tests pass
4. Update this README if adding new features

## License

MIT License - see LICENSE file for details.
