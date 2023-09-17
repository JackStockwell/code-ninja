import React, {useEffect, useState }from 'react'

import JobItem from '../JobItem';

const JobListProfile = (userData) => {

    const [selectedJob, setSelectedJob] = useState({})

    return (
        <>
            <div className='emp-wrapper'>
                <div className='emp-job-list'>
                    {userData?.jobs.map((job) => {
                        return (
                            <div className='job-card' onClick={() => setSelectedJob(job)}>
                                <div key={job._id}>
                                    <h4>{job.title}</h4>
                                    <h5>{job.company.companyName}</h5>
                                    <h5>{job.location}</h5>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='emp-job-viewer'>
                    {selectedJob?.title && 
                        <JobItem {...selectedJob} />
                    }
                </div>
            </div>
    </>
    )
}

export default JobListProfile
