import React, { useEffect, useState } from 'react';

// GraphQL imports
import { useQuery, useMutation } from '@apollo/client';

const CreateJob = () => {

    // States for form data to be used and saved.
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [errorData, setErrorData] = useState({ error: '' });

    // CreateJob mutation
    

    // Use useNavigate to get the navigation function
    const navigate = useNavigate();

    // Handles for change input
    const handleInputChange = (event) => {
        // Deconstruct the target with what has changed as name and the value as well value.
        const { name, value } = event.target;

        // Set the change in form data on the change in name and value.
        setUserFormData({ ...userFormData, [name]: value });
    }

    

    return (
        <div className="login-container">
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
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={userFormData.password || ''}
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Login</button>
              {/* Use Link instead of anchor tag */}
            </form>
            <button className='button'><Link className='link' to="/register">Don't have an account? Register here.</Link></button>
          </div>
        </div>
    )
}