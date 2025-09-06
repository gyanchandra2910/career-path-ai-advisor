import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    title: '',
    bio: '',
    skills: [],
    interests: [],
    experience: '',
    location: '',
    linkedIn: '',
    github: '',
    portfolio: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API call
    setProfile({
      name: 'John Doe',
      email: 'john.doe@example.com',
      title: 'Full Stack Developer',
      bio: 'Passionate developer with 3 years of experience in web development and a keen interest in AI technologies.',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      interests: ['Web Development', 'AI/ML', 'Cloud Computing'],
      experience: '2-5',
      location: 'San Francisco, CA',
      linkedIn: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      portfolio: 'https://johndoe.dev'
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    // TODO: Save to API
    console.log('Saving profile:', profile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Profile</h1>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="btn-primary"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="title"
                      value={profile.title}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.location}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-field resize-none"
                  />
                ) : (
                  <p className="text-gray-900">{profile.bio}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Experience Level</label>
                {isEditing ? (
                  <select
                    name="experience"
                    value={profile.experience}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="0-1">0-1 years (Entry Level)</option>
                    <option value="2-5">2-5 years (Mid Level)</option>
                    <option value="6-10">6-10 years (Senior Level)</option>
                    <option value="10+">10+ years (Expert Level)</option>
                  </select>
                ) : (
                  <p className="text-gray-900">
                    {profile.experience === '0-1' && '0-1 years (Entry Level)'}
                    {profile.experience === '2-5' && '2-5 years (Mid Level)'}
                    {profile.experience === '6-10' && '6-10 years (Senior Level)'}
                    {profile.experience === '10+' && '10+ years (Expert Level)'}
                  </p>
                )}
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Links</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn</label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="linkedIn"
                        value={profile.linkedIn}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    ) : (
                      <a 
                        href={profile.linkedIn} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.linkedIn}
                      </a>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub</label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="github"
                        value={profile.github}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    ) : (
                      <a 
                        href={profile.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.github}
                      </a>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Portfolio</label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="portfolio"
                        value={profile.portfolio}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    ) : (
                      <a 
                        href={profile.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.portfolio}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Interests Sidebar */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {isEditing && (
                <div className="space-y-3">
                  <button className="btn-secondary w-full">Update Skills</button>
                  <button className="btn-secondary w-full">Update Interests</button>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <button onClick={handleSave} className="btn-primary">
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
