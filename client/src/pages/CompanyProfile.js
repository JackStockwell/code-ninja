import React, { useEffect, useState } from 'react'
import EmpProfile from '../components/LoggedProfiles/Employer'
import { useParams } from 'react-router-dom'

// Utils and Comps
import Auth from '../utils/auth'
import Employer from '../components/LoggedProfiles/Employer'

// Database Imports
import { COMPANY_QUERY } from '../utils/queries'
import { useQuery } from '@apollo/client'



const CompanyProfile = () => {

    const { id } = useParams()

    const { loading, data } = useQuery(COMPANY_QUERY,
        { variables: { getCompanyId: id } }
    )

    const empData = data?.getCompany || []

    console.log(empData)

    return (
        <>  
            {loading && (<h4>Loading...</h4>)}
            {empData && (
                <>
                    <div>
                        <h1>{empData.companyName}</h1>
                        <p>{empData.about}</p>
                        <p>{empData.email}</p>
                        <p>{empData.location || "location"}</p>
                    </div>

                    <div>
                        
                    </div>
                </>
            )}
        </>
    )
}

export default CompanyProfile
