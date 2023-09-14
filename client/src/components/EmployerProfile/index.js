import React from 'react'
import { GET_EMP } from '../../utils/queries';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


const EmployerProfile = () => {

    const { id } = useParams();

    // const { loading, data } = useQuery(GET_EMP)

    return (
        <>
        
        </>
    )
}




export default EmployerProfile
