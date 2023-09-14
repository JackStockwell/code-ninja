import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';


const JobCreate = () => {

    const formData = {
        title: null,
        salary: null,
        description: null,
    }

    const [userFormData, setUserFormData] = useState({});
    const [errorData, setErrorData] = useState({ error: '' });

    const handleInputChange = (event) => {
        // Deconstruct the target with what has changed as name and the value as well value.
        const { name, value } = event.target;

        // Set the change in form data on the change in name and value.
        setUserFormData({ ...userFormData, [name]: value });
    }

    return (
        <>
            
        </>
    )
}

export default JobCreate
