import React, {useEffect, useState }from 'react'

import { useMediaPredicate } from 'react-media-hook';
import EditorRender from '../TextEditor/Editor'
import JobItem from '../JobItem';
import { useNavigate } from 'react-router-dom';

const JobListProfile = (userData) => {

    const navigate = useNavigate()

    const [selectedJob, setSelectedJob] = useState({})

    const handleMinWidth = useMediaPredicate("(min-width: 60em)")

    return (
        <>
            <div className='emp-wrapper'>
                <div className='emp-job-list'>
                    {userData?.jobs.map((job) => {
                        return (
                            <div 
                            key={job._id} 
                            className='job-card' 
                            value={job._id}
                            onClick={() => {
                                if(handleMinWidth) {
                                    setSelectedJob(job)
                                } else {
                                    navigate(`/${job}/${job_id}`)
                                }
                            }}>
                                <h4>{job.title}</h4>
                                <h5>{job.company.companyName}</h5>
                                <h5>{job.category.name}</h5>
                                <div>
                                    <EditorRender>
                                        {job.description}
                                    </EditorRender>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {handleMinWidth && (
                    <div className='emp-job-viewer'>
                        {selectedJob?.title && 
                            <JobItem {...selectedJob} />
                        }
                    </div>
                )}
            </div>
        </>
    )
}

export default JobListProfile
