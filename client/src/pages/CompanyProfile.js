import React, {useEffect, useState} from "react";
import EmpProfile from "../components/LoggedProfiles/Employer";
import {useParams} from "react-router-dom";

// Utils and Comps
import Auth from "../utils/auth";
import Employer from "../components/LoggedProfiles/Employer";

// Database Imports
import {COMPANY_QUERY} from "../utils/queries";
import {useQuery} from "@apollo/client";

import JobListProfile from "../components/JobListProfile";
import "./styles/CompanyProfile.css";

const CompanyProfile = () => {
  const {id} = useParams();

  const {loading, data} = useQuery(COMPANY_QUERY, {
    variables: {getCompanyId: id},
  });

  const empData = data?.getCompany || [];

  console.log(empData);

  return (
    <div className="company-profile-container">
      {loading && <h4>Loading...</h4>}
      {empData && (
        <>
          <div>
            <h1 className="company-name">{empData.companyName}</h1>
            <p className="about">{empData.about}</p>
            <p className="email">{empData.email}</p>
            <p className="location">{empData.location || "Location"}</p>
          </div>

          <div className="center">
            {empData.jobs?.length ? (
              <>
                <h3 className="company-profile-title">Active Jobs</h3>
                <ul className="company-profile-job-list">
                  <JobListProfile data={empData?.jobs} />
                </ul>
              </>
            ) : (
              <h3>No active jobs</h3>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyProfile;
