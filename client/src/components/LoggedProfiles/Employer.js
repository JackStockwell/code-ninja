import React, { useEffect, useState } from 'react'
import { GET_ME_EMP } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth'
import JobCreate from '../JobCreate';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import './employer.css'
import JobItem from '../JobItem';



const EmpProfile = () => {
        
    const userID = Auth.getProfile()?.data._id || null;

    const [loggedUser, setLoggedMatch] = useState(false)
    const [jobModal, setJobModal] = useState(false)
    const [selectedJob, setSelectedJob] = useState({})

    const { loading, data } = useQuery(GET_ME_EMP)

    const userData = data?.getEmp || []

    useEffect(() => {
        if (userID === userData._id) {
            return setLoggedMatch(true)
        }
        return setLoggedMatch(false)

    }, [loading, data])

    if (loading) {
        return <h4 style={{textAlign: 'center'}}><Spinner /></h4>
    }
    
    console.log(selectedJob)
    console.log(userData)
    return (
        <>  
            <div className=''>
                {loggedUser ? (
                    <div>
                        <div className='emp-info'>
                            <h3>Hi {userData.companyName}, welcome back.</h3>
                            <p>{userData.about}</p>
                            <p>{userData.location}</p>
                        </div>
                        <div>
                            <JobCreate />
                        </div>
                        <div className='emp-wrapper'>
                            <div className='emp-job-list'>
                                {userData?.jobs.map((job) => {
                                    return (
                                        <div key={job._id} onClick={() => setSelectedJob(job)}>
                                            <p>{job.title}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div>
                                {selectedJob?.title && 
                                    <JobItem {...selectedJob} />
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {!loading && !userData.companyName && <Navigate to='/employer'/>}
                    </>
                )}
            </div>
        </>
    )
}




export default EmpProfile