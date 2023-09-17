import React, { useEffect, useState } from 'react'
import { GET_ME_EMP } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth'
import JobCreate from '../JobCreate';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import './Employer.css';


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
    <div className="container">
  {loggedUser ? (
    <>
      <div>
        <h3 className="greeting">Hi {userData?.companyName}, welcome back.</h3>
        <JobCreate />
      </div>
    </>
  ) : (
    <>
      {!loading && !data && (
        <p className="navigate-link"><Navigate to="/employer">Go to Employer Page</Navigate></p>
      )}
    </>
  )}

  <p className="test-paragraph">Test</p>
</div>

        </>
    )
}




export default EmpProfile