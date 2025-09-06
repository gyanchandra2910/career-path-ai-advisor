import React, { useState } from 'react';
import TagInput from './TagInput';

const ProfileForm = ({ onSubmitSuccess, onSubmitError }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    year: '',
    interests: [],
    skills: '',
    resume: null,
    quizAnswers: {}
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quiz questions configuration
  const quizQuestions = [
    {
      id: 'work_environment',
      question: 'What type of work environment do you prefer?',
      options: [
        { value: 'collaborative', label: 'Collaborative team environment' },
        { value: 'independent', label: 'Independent work with minimal supervision' },
        { value: 'hybrid', label: 'Mix of both team and individual work' },
        { value: 'client_facing', label: 'Client-facing and interactive roles' }
      ]
    },
    {
      id: 'problem_solving',
      question: 'How do you approach problem-solving?',
      options: [
        { value: 'analytical', label: 'Break down problems systematically' },
        { value: 'creative', label: 'Think outside the box with creative solutions' },
        { value: 'research', label: 'Research extensively before deciding' },
        { value: 'intuitive', label: 'Trust gut instincts and experience' }
      ]
    },
    {
      id: 'career_motivation',
      question: 'What motivates you most in your career?',
      options: [
        { value: 'growth', label: 'Personal and professional growth' },
        { value: 'impact', label: 'Making a positive impact on society' },
        { value: 'innovation', label: 'Working on cutting-edge technology' },
        { value: 'stability', label: 'Job security and work-life balance' }
      ]
    },
    {
      id: 'learning_style',
      question: 'How do you prefer to learn new skills?',
      options: [
        { value: 'hands_on', label: 'Hands-on practice and experimentation' },
        { value: 'structured', label: 'Structured courses and certifications' },
        { value: 'mentorship', label: 'Learning from mentors and peers' },
        { value: 'self_directed', label: 'Self-directed research and study' }
      ]
    },
    {
      id: 'future_goals',
      question: 'Where do you see yourself in 5 years?',
      options: [
        { value: 'leadership', label: 'In a leadership or management role' },
        { value: 'specialist', label: 'As a technical specialist or expert' },
        { value: 'entrepreneur', label: 'Starting my own business or venture' },
        { value: 'exploring', label: 'Still exploring different opportunities' }
      ]
    }
  ];

  const yearOptions = [
    { value: '', label: 'Select your year' },
    { value: 'freshman', label: 'Freshman (1st year)' },
    { value: 'sophomore', label: 'Sophomore (2nd year)' },
    { value: 'junior', label: 'Junior (3rd year)' },
    { value: 'senior', label: 'Senior (4th year)' },
    { value: 'graduate', label: 'Graduate Student' },
    { value: 'recent_grad', label: 'Recent Graduate' },
    { value: 'working', label: 'Currently Working' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInterestsChange = (interests) => {
    setFormData(prev => ({
      ...prev,
      interests
    }));

    if (errors.interests) {
      setErrors(prev => ({
        ...prev,
        interests: ''
      }));
    }
  };

  const handleQuizAnswerChange = (questionId, value) => {
    setFormData(prev => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [questionId]: value
      }
    }));

    if (errors.quizAnswers) {
      setErrors(prev => ({
        ...prev,
        quizAnswers: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.college.trim()) {
      newErrors.college = 'College/University is required';
    }

    if (!formData.year) {
      newErrors.year = 'Please select your academic year';
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please add at least one interest';
    }

    if (!formData.skills.trim()) {
      newErrors.skills = 'Please enter your skills';
    }

    // Quiz validation - all questions must be answered
    const answeredQuestions = Object.keys(formData.quizAnswers).length;
    if (answeredQuestions < quizQuestions.length) {
      newErrors.quizAnswers = 'Please answer all quiz questions';
    }

    // Resume validation (optional but validate if provided)
    if (formData.resume) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(formData.resume.type)) {
        newErrors.resume = 'Please upload a PDF or Word document';
      }
      
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.resume.size > maxSize) {
        newErrors.resume = 'File size must be less than 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const submitData = new FormData();
      
      // Add basic form fields
      submitData.append('name', formData.name.trim());
      submitData.append('email', formData.email.trim());
      submitData.append('college', formData.college.trim());
      submitData.append('year', formData.year);
      submitData.append('interests', JSON.stringify(formData.interests));
      submitData.append('skills', formData.skills.trim());
      submitData.append('quizAnswers', JSON.stringify(formData.quizAnswers));
      
      // Add resume file if provided
      if (formData.resume) {
        submitData.append('resume', formData.resume);
      }

      const response = await fetch('/api/profile', {
        method: 'POST',
        body: submitData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (onSubmitSuccess) {
        onSubmitSuccess(result);
      } else {
        alert('Profile created successfully!');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        college: '',
        year: '',
        interests: [],
        skills: '',
        resume: null,
        quizAnswers: {}
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      
      if (onSubmitError) {
        onSubmitError(error);
      } else {
        alert('Error creating profile. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Create Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* College */}
            <div>
              <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-2">
                College/University *
              </label>
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                className={`input-field ${errors.college ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your college or university"
              />
              {errors.college && <p className="mt-1 text-sm text-red-600">{errors.college}</p>}
            </div>

            {/* Year */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year *
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className={`input-field ${errors.year ? 'border-red-500 focus:ring-red-500' : ''}`}
              >
                {yearOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
            </div>
          </div>
        </div>

        {/* Interests and Skills Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Interests & Skills</h3>
          
          <div className="space-y-6">
            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests *
              </label>
              <TagInput
                tags={formData.interests}
                onChange={handleInterestsChange}
                placeholder="Type interests and press Enter (e.g., Web Development, AI, Data Science)"
                className={errors.interests ? 'border-red-500' : ''}
                maxTags={10}
              />
              <p className="mt-1 text-xs text-gray-500">
                Add up to 10 interests. Press Enter or comma to add each tag.
              </p>
              {errors.interests && <p className="mt-1 text-sm text-red-600">{errors.interests}</p>}
            </div>

            {/* Skills */}
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                Skills *
              </label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows={4}
                className={`input-field resize-none ${errors.skills ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="List your skills separated by commas (e.g., JavaScript, Python, React, Communication, Leadership)"
              />
              <p className="mt-1 text-xs text-gray-500">
                Separate skills with commas. Include both technical and soft skills.
              </p>
              {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
            </div>
          </div>
        </div>

        {/* Resume Upload Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Resume Upload</h3>
          
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume (Optional)
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleInputChange}
              accept=".pdf,.doc,.docx"
              className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.resume ? 'border-red-500' : ''}`}
            />
            <p className="mt-1 text-xs text-gray-500">
              Accepted formats: PDF, DOC, DOCX. Maximum size: 5MB
            </p>
            {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
          </div>
        </div>

        {/* Mini Quiz Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Career Assessment Quiz *</h3>
          <p className="text-sm text-gray-600 mb-6">
            Answer these questions to help us provide better career recommendations.
          </p>
          
          <div className="space-y-6">
            {quizQuestions.map((question, index) => (
              <div key={question.id} className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-3">
                  {index + 1}. {question.question}
                </h4>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={formData.quizAnswers[question.id] === option.value}
                        onChange={(e) => handleQuizAnswerChange(question.id, e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {errors.quizAnswers && (
            <p className="mt-2 text-sm text-red-600">{errors.quizAnswers}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-primary px-8 py-3 text-lg font-semibold ${
              isSubmitting 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Profile...
              </>
            ) : (
              'Create Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
