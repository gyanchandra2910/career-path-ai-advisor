/**
 * Demonstration script for skillGap module
 * Shows practical usage examples of the skill gap analysis
 */

const { skillGap } = require('./skillGap');

console.log('=== Skill Gap Analysis Demonstration ===\n');

// Example 1: Frontend Developer Career Path
console.log('🎯 Frontend Developer Position Analysis');
console.log('----------------------------------------');

const frontendProfile = ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Photoshop'];
const frontendRequired = ['html', 'css', 'javascript', 'react', 'typescript', 'git', 'figma', 'node.js'];

const frontendResult = skillGap(frontendProfile, frontendRequired);

console.log('Current Skills:', frontendProfile.join(', '));
console.log('Required Skills:', frontendRequired.join(', '));
console.log('\n📊 Analysis Results:');
console.log(`✅ Skills You Have (${frontendResult.have.length}):`, frontendResult.have.join(', '));
console.log(`❌ Missing Skills (${frontendResult.missing_count}):`, frontendResult.missing.join(', '));

console.log('\n🎯 Learning Priority (High to Low):');
frontendResult.priority.forEach((item, index) => {
  console.log(`${index + 1}. ${item.skill.toUpperCase()} - ${item.reason}`);
});

console.log('\n' + '='.repeat(60) + '\n');

// Example 2: Data Scientist Career Path
console.log('🔬 Data Scientist Position Analysis');
console.log('-----------------------------------');

const dataProfile = ['Python', 'Excel', 'Statistics', 'SQL'];
const dataRequired = ['python', 'machine learning', 'statistics', 'sql', 'r programming', 'tableau', 'aws'];

const dataResult = skillGap(dataProfile, dataRequired);

console.log('Current Skills:', dataProfile.join(', '));
console.log('Required Skills:', dataRequired.join(', '));
console.log('\n📊 Analysis Results:');
console.log(`✅ Skills You Have (${dataResult.have.length}):`, dataResult.have.join(', '));
console.log(`❌ Missing Skills (${dataResult.missing_count}):`, dataResult.missing.join(', '));

console.log('\n🎯 Learning Priority (High to Low):');
dataResult.priority.forEach((item, index) => {
  console.log(`${index + 1}. ${item.skill.toUpperCase()} - ${item.reason}`);
});

console.log('\n' + '='.repeat(60) + '\n');

// Example 3: Complete Beginner
console.log('🌱 Complete Beginner Analysis');
console.log('-----------------------------');

const beginnerProfile = ['Microsoft Word', 'Email', 'Basic Math'];
const beginnerRequired = ['javascript', 'html', 'css', 'git', 'communication'];

const beginnerResult = skillGap(beginnerProfile, beginnerRequired);

console.log('Current Skills:', beginnerProfile.join(', '));
console.log('Required Skills:', beginnerRequired.join(', '));
console.log('\n📊 Analysis Results:');
console.log(`✅ Skills You Have (${beginnerResult.have.length}):`, beginnerResult.have.length > 0 ? beginnerResult.have.join(', ') : 'None matching required skills');
console.log(`❌ Missing Skills (${beginnerResult.missing_count}):`, beginnerResult.missing.join(', '));

console.log('\n🎯 Learning Priority (High to Low):');
beginnerResult.priority.forEach((item, index) => {
  console.log(`${index + 1}. ${item.skill.toUpperCase()} - ${item.reason}`);
});

console.log('\n' + '='.repeat(60) + '\n');

// Example 4: Well-matched candidate
console.log('⭐ Well-matched Candidate Analysis');
console.log('----------------------------------');

const expertProfile = ['React', 'JavaScript', 'Node.js', 'TypeScript', 'Git', 'HTML', 'CSS'];
const expertRequired = ['react', 'javascript', 'node.js', 'typescript', 'git'];

const expertResult = skillGap(expertProfile, expertRequired);

console.log('Current Skills:', expertProfile.join(', '));
console.log('Required Skills:', expertRequired.join(', '));
console.log('\n📊 Analysis Results:');
console.log(`✅ Skills You Have (${expertResult.have.length}):`, expertResult.have.join(', '));
console.log(`❌ Missing Skills (${expertResult.missing_count}):`, expertResult.missing_count > 0 ? expertResult.missing.join(', ') : 'None! You have all required skills 🎉');

if (expertResult.priority.length > 0) {
  console.log('\n🎯 Learning Priority (High to Low):');
  expertResult.priority.forEach((item, index) => {
    console.log(`${index + 1}. ${item.skill.toUpperCase()} - ${item.reason}`);
  });
} else {
  console.log('\n🎉 Congratulations! You already have all the required skills for this position!');
}

console.log('\n=== Demonstration Complete ===');
