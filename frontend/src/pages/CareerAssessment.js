import React, { useState } from 'react';

const CareerAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    skills: [],
    interests: [],
    experience: '',
    goals: '',
    workStyle: ''
  });

  const skillOptions = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'HTML/CSS',
    'Communication', 'Leadership', 'Problem Solving', 'Project Management',
    'Data Analysis', 'Machine Learning', 'Design', 'Marketing'
  ];

  const interestOptions = [
    'Web Development', 'Data Science', 'Mobile Development', 'AI/ML',
    'Cybersecurity', 'DevOps', 'Product Management', 'UX Design',
    'Digital Marketing', 'Cloud Computing', 'Blockchain', 'IoT'
  ];

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async () => {
    // TODO: Submit to API
    console.log('Assessment Data:', formData);
    alert('Assessment completed! Results will be available in your dashboard.');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Select Your Skills</h2>
            <p className="text-gray-600">Choose all skills that apply to you:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skillOptions.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.skills.includes(skill)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">What Interests You?</h2>
            <p className="text-gray-600">Select areas you're passionate about:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.interests.includes(interest)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Experience & Goals</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Years of Experience</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="input-field"
              >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years (Entry Level)</option>
                <option value="2-5">2-5 years (Mid Level)</option>
                <option value="6-10">6-10 years (Senior Level)</option>
                <option value="10+">10+ years (Expert Level)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Career Goals</label>
              <textarea
                value={formData.goals}
                onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                placeholder="Describe your career aspirations..."
                className="input-field h-32 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preferred Work Style</label>
              <select
                value={formData.workStyle}
                onChange={(e) => setFormData(prev => ({ ...prev, workStyle: e.target.value }))}
                className="input-field"
              >
                <option value="">Select work style</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">{currentStep}/3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'btn-secondary'
              }`}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn-primary px-6 py-2"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary px-6 py-2"
              >
                Complete Assessment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAssessment;
