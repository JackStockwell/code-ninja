import React from "react";
import {GET_ME} from "../../utils/queries";
import {useQuery} from "@apollo/client";
import "./User.css";
import SavedJobs from "./SavedJobs"; // Import the SavedJobs component

const Profile = () => {
  const {loading: meLoading, data: meData} = useQuery(GET_ME);

  if (meLoading) {
    return <h4 className="error-message">Loading...</h4>;
  }

  const userData = meData?.me || {};

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      {userData.firstName ? (
        <div className="profile-data">
          <p>
            <span>First Name:</span> {userData.firstName}
          </p>
          <p>
            <span>Last Name:</span> {userData.lastName}
          </p>
          <p>
            <span>Email:</span> {userData.email}
          </p>
        </div>
      ) : (
        <div className="error-message">
          <p>Please log in to see your profile.</p>
        </div>
      )}

      {/* Render the SavedJobs component */}
      <SavedJobs savedJobs={userData.jobSaves} />
    </div>
  );
};

export default Profile;
