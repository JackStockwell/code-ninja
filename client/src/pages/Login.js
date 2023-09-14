import React from 'react';
import './styles/login.css';
import Header from "../components/Header/Header";
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

function Login() {
  return (
    <>{/* Include the Header component */}
      <LoginForm />
    </>
  );
}

export default Login;