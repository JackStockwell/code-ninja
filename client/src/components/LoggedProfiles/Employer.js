import React, { useEffect, useState } from 'react'
import { GET_ME_EMP } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth'
import JobCreate from '../JobCreate';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import './Employer.css'
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

    if (loading) {
        return <h4 style={{textAlign: 'center'}}><Spinner /></h4>
    }

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
                        <JobListProfile {...userData} />
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