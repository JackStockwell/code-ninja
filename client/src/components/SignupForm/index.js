import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth'
import { trimObjectValues } from '../../utils/helpers';
import { redirect } from 'react-router-dom';

const CreateUser = () => {
    
    // States for form data to be used and saved.
    const [userFormData, setUserFormData] = useState({ email: null, password: null, passwordConfirm: null, firstName: null, lastName: null});
    const [errorData, setErrorData] = useState({error: ''});

    // Login in user mutation.
    const [createUser, { error }] = useMutation(CREATE_USER)

    // Handles for change input
    const handleInputChange = (event) => {
        // Deconstruct the target with what has changed as name and the value as well value.
        const { name, value } = event.target;

        // Set the change in form data on the change in name and value.
        setUserFormData({ ...userFormData, [name]: value})

    }

    // Submits the form to the server to processed, includes error handling.
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log(userFormData)

        const userInput = await trimObjectValues(userFormData)

        // Error Handling
        if (!userFormData.email) {
            setErrorData({ ...errorData, error: 'You must enter an email!'})
            return
        }

        if (!userFormData.password) {
            setErrorData({ ...errorData, error: 'You must enter a password!'})
            return
        }

        if (!userFormData.firstName || !userFormData.lastName) {
            setErrorData({ ...errorData, error: 'Enter your first and last name!'})
            return
        }

        // Checks passwords match
        if (userFormData.password !== userFormData.passwordConfirm) {
            setErrorData({ ...errorData, error: 'Your passwords must match!'})
            return
        }

        delete userInput.passwordConfirm

        console.log(userInput)

        try {
            // Request to server to create user, returns auth and user as data.
            const { data } = await createUser({
                variables: { userData: userInput }
            })

            Auth.login(data.createUser.token)

            return redirect('/')

        } catch (err) {
            console.error(err)
        }
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
                <button type="submit">Create User</button>
            </form>
        </div>
    )
}

export default CreateUser