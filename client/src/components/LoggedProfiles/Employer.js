import React, {useEffect, useState} from "react";
import {GET_ME_EMP} from "../../utils/queries";
import {useQuery} from "@apollo/client";
import Auth from "../../utils/auth";
import JobCreate from "../JobCreate";
import {Spinner} from "react-bootstrap";
import {Navigate} from "react-router-dom";

import "./emp.css";
import "./EmpProfList.css";
import JobListProfile from "../JobListProfile/index";
import JobApplyList from "../JobListProfile/JobApplyList";

const EmpProfile = () => {
  const userID = Auth.getProfile()?.data._id || null;

  const [loggedUser, setLoggedMatch] = useState(false);
  const [jobModal, setJobModal] = useState(false);

  const {loading, data} = useQuery(GET_ME_EMP);

  const userData = data?.getEmp || [];

  useEffect(() => {
    if (userID === userData._id) {
      return setLoggedMatch(true);
    }
    return setLoggedMatch(false);
  }, [loading, data]);

  useEffect(() => {}, [data]);

  if (loading) {
    return (
      <h4 style={{textAlign: "center"}}>
        <Spinner />
      </h4>
    );
  }

  console.log(userData);

  return (
    <div className="emp-profile-container">
      {loggedUser ? (
        <div className="emp-wrap">
          <div className="emp-info">
            <div className="emp-title">
              <h3>Welcome back, {userData.companyName}</h3>
              <p>London</p>
            </div>
            <div>
              <JobCreate />
            </div>
          </div>
          {userData?.jobs.length ? (
            <>
              <div style={{textAlign: 'center', margin: '2rem 0'}}>
                <h3>Jobs</h3>
                <JobListProfile data={userData.jobs} />
              </div>
              <div style={{textAlign: 'center', margin: '2rem 0'}}>
                <h3>Applications</h3>
                <JobApplyList data={userData.jobs} />
              </div>
            </>
          ):(
            <h4 style={{textAlign: 'center', padding: '2rem'}}>No Active Jobs yet. Create one?</h4>
          )}
        </div>
      ) : (
        <>{!loading && !userData.companyName && <Navigate to="/employer" />}</>
      )}
    </div>
  );
};

export default EmpProfile;
