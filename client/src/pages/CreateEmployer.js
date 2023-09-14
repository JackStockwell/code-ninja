import React, { useEffect, useState } from 'react';
import { redirect, Link } from 'react-router-dom';

// GraphQL imports
import { useQuery, useMutation } from '@apollo/client';

// Helpers & Utils
import { trimObjectValues } from '../../utils/helpers';
import Auth from '../../utils/auth'

const CreateEmployer = () => {

    // States for form data to be used and saved.
    const [userFormData, setUserFormData] = useState({ email: null, password: null, passwordConfirm: null, companyName: null, location: {}});
    const [errorData, setErrorData] = useState({ error: '' });

    // Create mutation
    

    // Handles for change input
    const handleInputChange = (event) => {
        // Deconstruct the target with what has changed as name and the value as well value.
        const { name, value } = event.target;

        // Set the change in form data on the change in name and value.
        setUserFormData({ ...userFormData, [name]: value });
    }

    

    return (
      <div className="login">
            <h2>Sign up!</h2>
            <form onSubmit={handleFormSubmit}>
                {error && <span>{error}</span>}
                <span>&nbsp;{errorData.error || ''}&nbsp;</span>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userFormData.email || ''}
                        placeholder='Email'
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={userFormData.password || ''}
                        placeholder='Password'
                        onChange={handleInputChange}
                        title="Password. Your password must follow the required pattern"
                        pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,40}$'
                        onInvalid={() => setErrorData({error: 'Password must have at least 1 digit, 1 upper and lower case character and one of the following symbols !,@,#,$,%,^,&,*. Can be no fewer than 8 characters and no more than 40.' })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="passwordConfirm"
                        value={userFormData.passwordConfirm || ''}
                        placeholder='Password Confirm'
                        onChange={handleInputChange}
                        title="Password. Your password must follow the required pattern"
                        pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,40}$'
                        onInvalid={() => setErrorData({error: 'Password must have at least 1 digit, 1 upper and lower case character and one of the following symbols !,@,#,$,%,^,&,*. Can be no fewer than 8 characters and no more than 40.' })}
                    />
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="password">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={userFormData.firstName || ''}
                            placeholder='First Name'
                            pattern='^\S+$'
                            title='Name&#39;s cannot contain spaces'
                            onChange={handleInputChange}
                            onInvalid={() => setErrorData({error: 'Name\'s cannot contain spaces' })}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={userFormData.lastName || ''}
                            placeholder='Last Name'
                            pattern='^\S+$'
                            title='Name&#39;s cannot contain spaces'
                            onChange={handleInputChange}
                            onInvalid={() => setErrorData({error: 'Name\'s cannot contain spaces' })}
                        />
                    </div>
                </div>
                <button type="submit">Register</button>
            </form>
            <button className='button'><Link className='link' to="/login">Already have an account? Login here.</Link></button>
        </div>
    )
}

export default CreateEmployer