// Simple Node.js test for our API
const http = require('http');

const testServer = async () => {
  console.log('🧪 Testing Profile API with Node.js...\n');
  
  // Helper function to make HTTP requests
  const makeRequest = (options, postData) => {
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve({ statusCode: res.statusCode, data: parsedData });
          } catch (e) {
            resolve({ statusCode: res.statusCode, data: data });
          }
        });
      });
      
      req.on('error', (err) => reject(err));
      
      if (postData) {
        req.write(postData);
      }
      req.end();
    });
  };

  try {
    // Test 1: Health Check
    console.log('1. Testing health endpoint...');
    const healthOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/health',
      method: 'GET'
    };
    
    const healthResult = await makeRequest(healthOptions);
    console.log('✅ Health Response:', JSON.stringify(healthResult.data, null, 2));
    console.log('Status Code:', healthResult.statusCode);
    console.log();

    // Test 2: Create Profile  
    console.log('2. Creating a profile...');
    const profileData = JSON.stringify({
      name: "John Doe",
      skills: ["JavaScript", "React", "Node.js"],
      email: "john@example.com",
      college: "MIT"
    });

    const createOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/profile',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(profileData)
      }
    };

    const createResult = await makeRequest(createOptions, profileData);
    console.log('✅ Create Response:', JSON.stringify(createResult.data, null, 2));
    console.log('Status Code:', createResult.statusCode);
    
    if (createResult.data.id) {
      const profileId = createResult.data.id;
      console.log();

      // Test 3: Get Profile
      console.log('3. Retrieving the profile...');
      const getOptions = {
        hostname: 'localhost',
        port: 5000,
        path: `/api/profile/${profileId}`,
        method: 'GET'
      };

      const getResult = await makeRequest(getOptions);
      console.log('✅ Get Response:', JSON.stringify(getResult.data, null, 2));
      console.log('Status Code:', getResult.statusCode);
      console.log();

      // Test 4: Get All Profiles
      console.log('4. Getting all profiles...');
      const getAllOptions = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/profiles',
        method: 'GET'
      };

      const getAllResult = await makeRequest(getAllOptions);
      console.log('✅ All Profiles Response:', JSON.stringify(getAllResult.data, null, 2));
      console.log('Status Code:', getAllResult.statusCode);
    }

    console.log('\n🎉 All API tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run the test
testServer();
