import React from 'react';
import CreateEmployer from '../components/CreateEmployer';
import LoginEmployer from '../components/LoginEmployer';


const EmployerLanding = () => {

    return (
        <>
            <div className='login-container grid-2'>
                <LoginEmployer />
                <CreateEmployer />
            </div>
        </>
    )
}

export default EmployerLanding
