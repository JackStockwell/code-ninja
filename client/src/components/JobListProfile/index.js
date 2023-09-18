import React, {useEffect, useState }from 'react'

import { useMediaPredicate } from 'react-media-hook';
import EditorRender from '../TextEditor/Editor'
import JobItem from '../JobItem';
import { useNavigate } from 'react-router-dom';
import '../LoggedProfiles/EmpProfList.css'
import '../LoggedProfiles/Employer.css'

const JobListProfile = ({data}) => {

    const navigate = useNavigate()

    const [selectedJob, setSelectedJob] = useState({})

    const handleMinWidth = useMediaPredicate("(min-width: 60em)")

    const handleOnClick = (job) => {
        if(handleMinWidth) {
            setSelectedJob(job)
        } else {
            navigate(`/view/${job._id}`)
        }
    }

    return (
        <>
            <div className='emp-wrapper'>
                <div className='emp-job-list'>
                    {data?.map((job) => {
                        return (
                            <div 
                            key={job._id} 
                            className='job-card job-card-widget' 
                            data-value={job._id}
                            onClick={() => handleOnClick(job)}>
                                <h4>{job.title}</h4>
                                <h5>{job.company.companyName}</h5>
                                <h5>{job.category.name}</h5>
                                <div>
                                    <EditorRender>
                                        {job.description}
                                    </EditorRender>
                                </div>
                                <span style={{alignSelf: 'center'}}>Click to view more.</span>
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
