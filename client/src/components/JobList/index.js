/* eslint-disable */
import { useEffect, useState } from "react";
import { useJobContext } from "../../utils/GlobalState";
import { QUERY_JOBS } from "../../utils/queries";
import { UPDATE_JOBS } from "../../utils/actions";
import { useQuery } from "@apollo/client";

import JobItem from "../JobItem";

const PAGE_SIZE = 3;

const JobList = () => {
    const [state, dispatch] = useJobContext();

    const { currentCategory } = state;

    const [page, setPage] = useState(0);
  
    const { data,  loading, error } = useQuery(QUERY_JOBS,
      {
        variables: {
          limit: 2,
          offset: page * PAGE_SIZE,
          category: currentCategory
        },
      }
    );

    function filterJobs() {
      if(!currentCategory) {
        return state.jobs
      }

      console.log(currentCategory)
      console.log(state.jobs)

      return state.jobs.filter(
        (job) => job.category[0]._id === currentCategory
      )
    }

    //Runs when data or currentCategory is updated.
    useEffect(() => {
        if(data) {
            dispatch({
              type: UPDATE_JOBS,
              jobs: data.jobs
            })
        }
        filterJobs()
    }, [data, loading, dispatch]);
    

    console.log(state.jobs)

    return (
        <div>
            <h2>Jobs:</h2>
            {state.jobs?.length ? (
                <div>
                    {filterJobs().map((job) => {
                      return <JobItem {...job} key={job._id} />
                    })}
                </div>
            ) : (
                <div><p>No Jobs</p></div>
            )}
            {loading ? <span>Loading...</span> : null}
        </div>
    )
}

export default JobList;