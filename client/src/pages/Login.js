import React from 'react';
import './styles/login.css';
import Header from "../components/Header/Header";
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

function Login() {
  return (
    <>
      <Header /> {/* Include the Header component */}
      <LoginForm />
      <RegistrationForm />
    </>
  );
}

export default Login;