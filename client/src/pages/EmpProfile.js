import React, { useEffect, useState } from 'react'
import { GET_ME_EMP } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth'
import Modal from 'react-modal'
import ReactModal from 'react-modal';
import JobCreate from '../components/JobCreate';
import './styles/modal.css'




const EmpProfile = () => {
        
    const userID = Auth.getProfile()?.data._id || null;

    const [loggedUser, setLoggedMatch] = useState(false)
    const [jobModal, setJobModal] = useState(false)

    const { loading, data } = useQuery(GET_ME_EMP)

    const userData = data?.getEmp || []

    useEffect(() => {
        if (userID === userData._id) {
            return setLoggedMatch(true)
        }
        return setLoggedMatch(false)

    }, [loading, data])

    if (loading) {
        return <h4 style={{textAlign: 'center'}}>Loading...</h4>
    }

    const handleModalState = () => setJobModal((prev) => prev = !prev)
    
    Modal.setAppElement('#root')

    return (
        <>  
            <div>
                {loggedUser && <p>LOGGED IN!</p>}
                {userData.companyName}
                <p>Test</p>
                <button onClick={handleModalState}>Open</button>
                    <ReactModal
                        isOpen={jobModal}
                        contentLabel='New Job modal'
                        onRequestClose={handleModalState}
                        className='modal' 
                    >
                        <JobCreate />
                        <button onClick={handleModalState}>Post a New Job</button>
                    </ReactModal>
            </div>
        </>
    )
}




export default EmpProfile