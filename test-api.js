// Test script for the Profile API
// Run this with: node test-api.js (make sure server is running)

const testProfileAPI = async () => {
  const baseURL = 'http://localhost:3001';
  
  console.log('🧪 Testing Profile API...\n');
  
  try {
    // Test 1: Create a profile
    console.log('1. Creating a profile...');
    const createResponse = await fetch(`${baseURL}/api/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        skills: ['JavaScript', 'React', 'Node.js'],
        email: 'john@example.com',
        college: 'MIT'
      })
    });
    
    const createResult = await createResponse.json();
    console.log('✅ Create Response:', createResult);
    
    if (!createResponse.ok) {
      throw new Error(`Create failed: ${createResult.error}`);
    }
    
    const profileId = createResult.id;
    console.log(`📝 Profile created with ID: ${profileId}\n`);
    
    // Test 2: Retrieve the profile
    console.log('2. Retrieving the profile...');
    const getResponse = await fetch(`${baseURL}/api/profile/${profileId}`);
    const getResult = await getResponse.json();
    
    console.log('✅ Get Response:', getResult);
    
    if (!getResponse.ok) {
      throw new Error(`Get failed: ${getResult.error}`);
    }
    
    console.log(`📄 Profile retrieved successfully\n`);
    
    // Test 3: Try to get non-existent profile
    console.log('3. Testing non-existent profile...');
    const notFoundResponse = await fetch(`${baseURL}/api/profile/999`);
    const notFoundResult = await notFoundResponse.json();
    
    console.log('✅ Not Found Response:', notFoundResult);
    console.log('Expected 404 status:', notFoundResponse.status === 404 ? '✅' : '❌');
    console.log();
    
    // Test 4: Test validation - missing name
    console.log('4. Testing validation - missing name...');
    const invalidResponse = await fetch(`${baseURL}/api/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skills: ['JavaScript']
      })
    });
    
    const invalidResult = await invalidResponse.json();
    console.log('✅ Validation Response:', invalidResult);
    console.log('Expected 400 status:', invalidResponse.status === 400 ? '✅' : '❌');
    console.log();
    
    // Test 5: Test validation - invalid skills
    console.log('5. Testing validation - invalid skills...');
    const invalidSkillsResponse = await fetch(`${baseURL}/api/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Jane Doe',
        skills: 'not an array'
      })
    });
    
    const invalidSkillsResult = await invalidSkillsResponse.json();
    console.log('✅ Skills Validation Response:', invalidSkillsResult);
    console.log('Expected 400 status:', invalidSkillsResponse.status === 400 ? '✅' : '❌');
    console.log();
    
    // Test 6: Get all profiles
    console.log('6. Getting all profiles...');
    const allProfilesResponse = await fetch(`${baseURL}/api/profiles`);
    const allProfilesResult = await allProfilesResponse.json();
    
    console.log('✅ All Profiles Response:', allProfilesResult);
    console.log();
    
    console.log('🎉 All API tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  testProfileAPI();
}

module.exports = testProfileAPI;
