import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    careerMatch: 0,
    completedAssessments: 0,
    skillsAnalyzed: 0,
    recommendations: []
  });

  useEffect(() => {
    // Mock data - replace with actual API call
    setDashboardData({
      careerMatch: 85,
      completedAssessments: 3,
      skillsAnalyzed: 12,
      recommendations: [
        {
          title: 'Complete JavaScript Certification',
          priority: 'High',
          status: 'In Progress'
        },
        {
          title: 'Build Portfolio Project',
          priority: 'Medium',
          status: 'Not Started'
        },
        {
          title: 'Practice System Design',
          priority: 'Low',
          status: 'Completed'
        }
      ]
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-blue-600">
              {dashboardData.careerMatch}%
            </h3>
            <p className="text-gray-600">Career Match Score</p>
          </div>
          
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-green-600">
              {dashboardData.completedAssessments}
            </h3>
            <p className="text-gray-600">Assessments Completed</p>
          </div>
          
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-purple-600">
              {dashboardData.skillsAnalyzed}
            </h3>
            <p className="text-gray-600">Skills Analyzed</p>
          </div>
          
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-orange-600">
              {dashboardData.recommendations.length}
            </h3>
            <p className="text-gray-600">Active Recommendations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Career Progress */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Career Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Technical Skills</span>
                  <span className="text-sm text-gray-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Communication</span>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Leadership</span>
                  <span className="text-sm text-gray-600">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <div className="space-y-3">
              {dashboardData.recommendations.map((rec, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{rec.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        rec.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        rec.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {rec.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn-primary">Take New Assessment</button>
            <button className="btn-secondary">Update Skills</button>
            <button className="btn-secondary">View Career Paths</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
