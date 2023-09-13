// RegistrationForm.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { REGISTER_USER } from '../../utils/mutations'; // Define REGISTER_USER mutation
import { useNavigate, Link } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [errorData, setErrorData] = useState({ error: '' });
  const [registerUser, { error }] = useMutation(REGISTER_USER);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!userFormData.email || !userFormData.password) {
      setErrorData({ error: 'You must enter both email and password!' });
      return;
    }

    try {
      const { data } = await registerUser({
        variables: { ...userFormData }
      });

      Auth.login(data.registerUser.token);
      navigate('/');

    } catch (err) {
      console.error(err);
      setErrorData({ error: err.message });
    }
  }

  return (
    <div className="login-container">
      <div className="login">
        <h2>Register</h2>
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
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
