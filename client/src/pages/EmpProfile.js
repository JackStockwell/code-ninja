import React, { useEffect, useState } from 'react'
import { GET_ME_EMP } from '../utils/queries';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth'


const EmpProfile = () => {

    const userID = Auth.getProfile()?.data._id || null;

    const [loggedUser, setLoggedMatch] = useState(false)

    const { loading, data } = useQuery(GET_ME_EMP)

    const userData = data?.getEmp || []

    useEffect(() => {
        if (userID === userData._id) {
            return setLoggedMatch(true)
        }
        return setLoggedMatch(false)

    }, [loading, data])

    if (loading) {
        return <h4 style={{textAlign: 'center'}}>Loading...</h4>
    }

    console.log(userID)
    console.log(userData._id)

    return (
        <>  
            {loggedUser && <p>LOGGED IN!</p>}
            {userData.companyName}
            <p>Test</p>
        </>
    )
}




export default EmpProfile