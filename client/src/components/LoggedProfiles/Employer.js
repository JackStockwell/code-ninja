import React, {useEffect, useState} from "react";
import {GET_ME_EMP} from "../../utils/queries";
import {useQuery} from "@apollo/client";
import Auth from "../../utils/auth";
import JobCreate from "../JobCreate";
import {Spinner} from "react-bootstrap";
import {Navigate} from "react-router-dom";

import "./Employer.css";
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
        <div>
          <div className="emp-info">{/* Your existing JSX */}</div>
          <div>
            <JobCreate />
          </div>
          {userData.jobs?.length && (
            <>
              <div>
                <h3>Jobs</h3>
                <JobListProfile data={userData.jobs} />
              </div>
              <div>
                <h3>Applications</h3>
                <JobApplyList data={userData.jobs} />
              </div>
            </>
          )}
        </div>
      ) : (
        <>{!loading && !userData.companyName && <Navigate to="/employer" />}</>
      )}
    </div>
  );
};

export default EmpProfile;
