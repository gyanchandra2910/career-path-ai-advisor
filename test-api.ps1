# PowerShell API Test Script
Write-Host "🧪 Testing Profile API with PowerShell..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:5000"

try {
    # Test 1: Health Check
    Write-Host "1. Testing health endpoint..." -ForegroundColor Yellow
    $healthResponse = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
    Write-Host "✅ Health Response:" -ForegroundColor Green
    $healthResponse | ConvertTo-Json -Depth 2
    Write-Host ""

    # Test 2: Create Profile
    Write-Host "2. Creating a profile..." -ForegroundColor Yellow
    $profileData = @{
        name = "John Doe"
        skills = @("JavaScript", "React", "Node.js")
        email = "john@example.com"
        college = "MIT"
    } | ConvertTo-Json

    $createResponse = Invoke-RestMethod -Uri "$baseUrl/api/profile" -Method POST -ContentType "application/json" -Body $profileData
    Write-Host "✅ Create Response:" -ForegroundColor Green
    $createResponse | ConvertTo-Json -Depth 2
    $profileId = $createResponse.id
    Write-Host ""

    # Test 3: Get Profile
    Write-Host "3. Retrieving the profile..." -ForegroundColor Yellow
    $getResponse = Invoke-RestMethod -Uri "$baseUrl/api/profile/$profileId" -Method GET
    Write-Host "✅ Get Response:" -ForegroundColor Green
    $getResponse | ConvertTo-Json -Depth 3
    Write-Host ""

    # Test 4: Get All Profiles
    Write-Host "4. Getting all profiles..." -ForegroundColor Yellow
    $allProfiles = Invoke-RestMethod -Uri "$baseUrl/api/profiles" -Method GET
    Write-Host "✅ All Profiles Response:" -ForegroundColor Green
    $allProfiles | ConvertTo-Json -Depth 3
    Write-Host ""

    Write-Host "🎉 All API tests completed successfully!" -ForegroundColor Green

} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}
