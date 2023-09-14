import React from 'react';
import { Link } from 'react-router-dom';
import './styles/404.css'




const Lost = () => {
    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', flexFlow: 'column nowrap', height: '100vh', width: '100%'}}>
                <div style={{flexGrow: '1', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <h1 style={{textAlign: 'center'}}>404</h1>
                    <Link to='/' className='button'>Take me home</Link>
                </div>
            </div>
        </>
    )
}

export default Lost