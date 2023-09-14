import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Auth from '../../utils/auth';
import { SAVE_JOB } from '../../utils/mutations';

function JobItem({ _id, title, company, description, location, salary, tags, category }) {

    console.log(company)
    
    // Mutations
    const [ saveJob , { error }] = useMutation(SAVE_JOB)

    // Handles the onClick of the button, performs a different action depending on what was clicked.
    const handleOnSave = async ({target}) => {
        // Gets the id from the target.
        const id = target.dataset.id
        // Checks to see if logged in, returns if not.
        if (!Auth.loggedIn()) {
            return
        }
        // API call to save the job.
        try {
            const { data } = await saveJob({
                variables: { id: id }
            })
            console.log(data)
        } catch(err) {
            console.error(err)
        }
    }

    const handleOnApply = () => {
        
    }

    return (
        <>
            <div>
                <h3>{title}</h3>
                {/* Company div, deconstructs the prop */}
                <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
                    <h4>{company.companyName}</h4>
                    <p>{company.about}</p>
                    {company.location ? (
                        <p>{company.location}</p>
                    ) : (
                        <p>St Luke's, London</p>
                    )}
                </div>
                <p>{location}</p>
                <p>{salary},000k</p>
                {tags && tags.map((tag) => {
                    return <p key={tag._id} id={tag._id}>{tag.name}</p>
                }
                )}
                {category && category.map((cat) => <p key={cat._id} id={cat._id}>{cat.name}</p>)}
                <p>{description}</p>
            </div>
            {Auth.loggedIn() ? (
                <>
                    <button data-id={_id} data-action="save" onClick={handleOnSave}>Save</button>
                    <button data-id={_id} data-action="apply" onClick={handleOnApply}>Apply</button>
                </>
            ) : (
                <>
                    <span>You must be logged to apply!</span>
                </>
            )}    
        </>
    )
}

export default JobItem