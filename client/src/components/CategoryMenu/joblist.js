import React, {useEffect} from "react";
import {useJobContext} from "../../utils/GlobalState";
import {UPDATE_JOBS} from "../../utils/actions";

import JobItem from "../JobItem"; // Import your job item component

function ProductList() {
  const [state, dispatch] = useJobContext();

  const {currentCategory, jobs} = state;

  useEffect(() => {
    // Fetch jobs initially (if needed)
    if (!jobs.length && currentCategory) {
      fetchJobsByCategory(currentCategory);
    }
  }, [currentCategory, jobs]);

  // Fetch jobs for the selected category
  const fetchJobsByCategory = async (categoryId) => {
    try {
      const response = await fetch(`/api/jobs/category/${categoryId}`);
      if (!response.ok) {
        throw new Error("Job data could not be fetched.");
      }

      const data = await response.json();

      dispatch({
        type: UPDATE_JOBS,
        jobs: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-2">
      <h2>Jobs:</h2>
      {jobs.length ? (
        <div className="flex-row">
          {jobs.map((job) => (
            <JobItem
              key={job._id}
              _id={job._id}
              title={job.title}
              description={job.description}
              // Add other job properties here
            />
          ))}
        </div>
      ) : (
        <h3>No jobs found for the selected category.</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
