import React, { useEffect, useState } from 'react'
import { GET_ME_EMP } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth'
import JobCreate from '../JobCreate';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';



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

    const handleModalState = () => setJobModal((prev) => prev = !prev)

    return (
        <>  
            <div>
                {loggedUser ? (
                    <>
                        <div>
                            <h3>Hi {userData?.companyName}, welcome back.</h3>
                            <JobCreate />
                        </div>
                    </>
                ) : (
                    <>
                        {!loading && !data && <Navigate to='/employer'/>}
                    </>
                )}
                
                <p>Test</p>
            </div>
        </>
    )
}




export default EmpProfile