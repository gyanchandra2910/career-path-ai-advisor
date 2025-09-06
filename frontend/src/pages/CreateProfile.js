import React from 'react';
import ProfileForm from '../components/ProfileForm';

const CreateProfile = () => {
  const handleSubmitSuccess = (result) => {
    console.log('Profile created successfully:', result);
    // You can redirect to dashboard or show success message
    alert(`Profile created successfully! ID: ${result.data.id}`);
  };

  const handleSubmitError = (error) => {
    console.error('Error creating profile:', error);
    alert('Failed to create profile. Please try again.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ProfileForm 
          onSubmitSuccess={handleSubmitSuccess}
          onSubmitError={handleSubmitError}
        />
      </div>
    </div>
  );
};

export default CreateProfile;
