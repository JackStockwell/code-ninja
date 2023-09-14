import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Auth from '../../utils/auth';
import { ADD_JOB } from '../../utils/mutations';

function JobItem({ _id, title, company, description, location, salary, tags, category }) {

    // Mutations

    const [ saveJob , { error }] = useMutation(ADD_JOB)

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
                <p>{company}</p>
                <p>{description}</p>
                <p>{location}</p>
                <p>{salary}</p>
                {tags && tags.map((tag) => {
                    return <p key={tag._id} id={tag._id}>{tag.name}</p>
                }
                )}
                {category && category.map((cat) => <p key={cat._id} id={cat._id}>{cat.name}</p>)}
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