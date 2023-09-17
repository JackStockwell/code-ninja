import React from 'react';
import { GET_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import './User.css'; // Import your stylesheet

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);

  if (loading) {
    return <h4 className="error-message">Loading...</h4>;
  }

  const userData = data?.me || {};

  return (

      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        {userData.firstName ? (
          <div className="profile-data">
            <p><span>First Name:</span> {userData.firstName}</p>
            <p><span>Last Name:</span> {userData.lastName}</p>
            <p><span>Email:</span> {userData.email}</p>
            {/* Add more user data fields as needed */}
          </div>
        ) : (
          <div className="error-message">
            <p>Please log in to see your profile.</p>
          </div>
        )}
        <p className="test-text">Test</p>
      </div>

  );
};

export default Profile;
