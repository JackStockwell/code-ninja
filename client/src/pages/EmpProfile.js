import React, { useEffect, useState } from 'react'
import { GET_ME_EMP } from '../utils/queries';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth'
import Modal from 'react-modal'
import ReactModal from 'react-modal';



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
            {loggedUser && <p>LOGGED IN!</p>}
            {userData.companyName}
            <p>Test</p>
            <button onClick={handleModalState}>Test</button>
            <ReactModal
                isOpen={jobModal}
                contentLabel='New Job modal'
                onRequestClose={handleModalState}            
            >
                <h3>Modal Open!</h3>
                <button onClick={handleModalState}>Test</button>
            </ReactModal>
            {jobModal && (<p>Open</p>)}
        </>
    )
}




export default EmpProfile