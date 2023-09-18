import React from "react";
import {GET_ME} from "../../utils/queries";
import {useQuery} from "@apollo/client";
import "./User.css";
import SavedJobs from "./SavedJobs"; // Import the SavedJobs component
import './EmpProfList.css'

import UploadFile from '../UploadFile'
import JobListProfile from '../JobListProfile';

const Profile = () => {
  const {loading: meLoading, data: meData} = useQuery(GET_ME);

  if (meLoading) {
    return <h4 className="error-message">Loading...</h4>;
  }

  console.log(meData)

  const userData = meData?.me || {};

  return (
      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        {userData.firstName ? (
            <>
                <div className="profile-data">
                    <p><span>First Name:</span> {userData.firstName}</p>
                    <p><span>Last Name:</span> {userData.lastName}</p>
                    <p><span>Email:</span> {userData.email}</p>
                    {/* Add more user data fields as needed */}
                </div>
                <div>
                    <h3>Upload your resume here!</h3>
                    <UploadFile />
                </div>
            </>
        ) : (
          <div className="error-message">
            <p>Please log in to see your profile.</p>
          </div>
        )}
        <p className="test-text">Test</p>
        {userData?.jobSaves && (
          <>
            <h3>Saved Jobs</h3>
            <JobListProfile data={userData.jobSaves} />
          </>
        )}
        {userData?.jobApply && (
          <>
            <h3>Applied Jobs</h3>
            <JobListProfile data={userData.jobApply} />
          </>
        )}
      </div>

    
  );
};

export default Profile;
