import React, { useEffect, useState } from 'react'
import { GET_ME_EMP } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth'
import JobCreate from '../JobCreate';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import './EmpProfList.css'

import JobListProfile from '../JobListProfile';



const EmpProfile = () => {
        
    const userID = Auth.getProfile()?.data._id || null;

    const [loggedUser, setLoggedMatch] = useState(false)
    const [jobModal, setJobModal] = useState(false)

    const { loading, data } = useQuery(GET_ME_EMP)

    const userData = data?.getEmp || []

    useEffect(() => {
        if (userID === userData._id) {
            return setLoggedMatch(true)
        }
        return setLoggedMatch(false)

    }, [loading, data])

    useEffect(() => {
        
    }, [data])

    if (loading) {
        return <h4 style={{textAlign: 'center'}}><Spinner /></h4>
    }

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
      
      {/* Job Create Card */}
      <div className="post-job">
        <JobCreate />
      </div>
      
      {/* Job List Profile Card */}
      <div className="job-card">
        <JobListProfile data={userData.jobs} />
      </div>
      
      {/* Add more job cards here if needed */}
    </div>
  ) : (
    <>
      {!loading && !userData.companyName && <Navigate to='/employer' />}
    </>
  )}
</div>

        </>
    )
}




export default EmpProfile