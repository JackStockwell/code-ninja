import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import TextEdior from '../TextEditor/index'

// React Widgets
import './jobcreate.css'



const JobCreate = () => {

    const formData = {
        title: null,
        salary: null,
        description: null,
    }

    const [userFormData, setUserFormData] = useState(formData);
    const [errorData, setErrorData] = useState({ error: '' });

    const handleInputChange = (event) => {
        // Deconstruct the target with what has changed as name and the value as well value.
        const { name, value } = event.target;

        // Set the change in form data on the change in name and value.
        setUserFormData({ ...userFormData, [name]: value });
    }

    const handleFormSubmit = () => {

    }

    return (
        <>
            <h4>New Job</h4>
            <form onSubmit={handleFormSubmit}>
              <span>&nbsp;{errorData.error}&nbsp;</span>
              <div className="job-group">
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        className='model-input'
                        type="text"
                        name="title"
                        value={userFormData.email || ''}
                        placeholder="Email"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="salary">Salary</label>
                    <input
                        className='model-input'
                        type="text"
                        name="salary"
                        value={userFormData.password || ''}
                        placeholder="30000"
                        onChange={handleInputChange}
                    />
                </div>
                <div>

                </div>
              </div>
              {/* Use Link instead of anchor tag */}
            </form>
            <TextEdior />
        </>
    )
}

export default JobCreate
