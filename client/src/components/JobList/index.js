/* eslint-disable */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useJobContext } from "../../utils/GlobalState";
import { QUERY_JOBS } from "../../utils/queries";
import { UPDATE_JOBS } from "../../utils/actions";
import { useQuery } from "@apollo/client";

import JobItem from "../JobItem";

const PAGE_SIZE = 3;

const JobList = () => {
    // State import
    const [state, dispatch] = useJobContext();

    // Get the current category from state.
    let { currentCategory } = state;

    // If there is no currentCat, turn the value to null. Allowing for an unfiltered response.
    if (!currentCategory.length) {
      currentCategory = null
    }

    // 
    const [page, setPage] = useState(0);
  
    const { data,  loading, error } = useQuery(QUERY_JOBS,
      {
        variables: {
          limit: 5,
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
            console.log(data.jobs)
        }

        setHasMore(true)

    }, [data, loading, dispatch]);

    const [hasMore, setHasMore] = useState(true)

    return (
        <div>
            <h2>Jobs:</h2>
            {state.jobs?.length ? (
                <div>
                    {filterJobs().map((job, index) => {
                    return <JobItem {...job} key={index} />
                    })}
                </div>
            ) : (
                <div><p>No Jobs</p></div>
            )}
            <button disabled={!page} onClick={() => setPage(prev => prev - 1)}><FontAwesomeIcon icon="fa-solid fa-chevron-left" /></button>
            <button disabled={state.jobs?.length < 5} onClick={() => setPage(prev => prev + 1)}><FontAwesomeIcon icon="fa-solid fa-chevron-right" /></button>
            {loading ? <span>Loading...</span> : null}
        </div>
    )
}

export default JobList;