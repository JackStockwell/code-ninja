import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth'
import { LOGIN_USER } from '../../utils/mutations';
import { redirect } from 'react-router-dom';

const LoginForm = () => {
    
    // States for form data to be used and saved.
    const [userFormData, setUserFormData] = useState({ email: '', password: ''});
    const [errorData, setErrorData] = useState({error: ''});

    // Login in user mutation.
    const [loginUser, { error }] = useMutation(LOGIN_USER)

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

        // Error handling.
        if (!userFormData.email) {
            setErrorData({ ...errorData, error: 'You must enter an email!'})
        }

        if (!userFormData.password) {
            setErrorData({ ...errorData, error: 'You must enter a password!'})
        }

        console.log(userFormData)

        // API request, awaits data.
        try {

            // Returns token and the user.
            const { data } = await loginUser({
                variables: { ...userFormData }
            })

            // Login with JWT tag.
            Auth.login(data.loginUser.token)

            return redirect('/')
        // Error catcher, logs error.
        } catch (err) {
            console.error(err)
            setErrorData({error: error.graphQLErrors[0].message})
        }
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <span>&nbsp;{errorData.error}&nbsp;</span>
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
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm
