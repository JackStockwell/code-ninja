import React from 'react'

import './Applicant.css'

const JobApplicants = ({data}) => {

    const applicantData = data || []

    const useOpenLink = (url) => {
        return window.open(url, "_blank", "noreferrer")
    }

    return (
        <div className='applicant-wrapper'>
            {applicantData?.map((user) => {
                return (
                    <div key={user._id} className='job-card'>
                        <div className='user-header'>
                            <div>
                                <h4>{user.firstName} {user.lastName}</h4>
                                <a href={`mailto:${user.mail}`}>{user.email}</a>
                            </div>
                            <div>
                                <button onClick={() => useOpenLink(user.resume)} >View Resume</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default JobApplicants
