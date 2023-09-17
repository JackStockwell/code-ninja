import React from 'react'
import { GET_ME } from '../../utils/queries';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


const Profile = () => {

    const { loading, data } = useQuery(GET_ME)

    if (!data) {
        console.log("Test")
    }

    if (loading) {
        return <h4 style={{textAlign: 'center'}}>Loading...</h4>
    }

    const userData = data?.me || []

    return (
        <>
            {userData?.firstName}
            {!data.me && (
                <>
                    <p>Please Login in to see </p>
                </>
            )}
            <p>Test</p>
        </>
    )
}




export default Profile