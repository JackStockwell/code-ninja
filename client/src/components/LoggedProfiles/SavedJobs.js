import React from "react";

const SavedJobs = ({savedJobs}) => {
  return (
    <div className="saved-jobs-container">
      <h2>Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        <ul>
          {savedJobs.map((job) => (
            <li key={job._id}>
              <h3>{job.title}</h3>
              {job.company ? (
                <>
                  <p>Company: {job.company.companyName}</p>
                  <p>Location: {job.company.location || "St Luke's, London"}</p>
                </>
              ) : (
                <p>Company information not available</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedJobs;
