import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Auth from '../../utils/auth';
import {
    GET_ME
} from '../../utils/queries'


function JobItem({ _id, title, company, description, location, salary, tags, category }) {

    // Checks to see if the user is logged in.
    const { data, loading, error } = useQuery(GET_ME)

    console.log(title)

    // Handles the onClick of the button, performs a different action depending on what was clicked.
    const handleOnClick = (e) => {
        e.preventDefault()
        // Get's the action.
        let action = e.target.dataset.action

        switch (action) {
            // Adds the job to the logged user's saved jobs array.
            case "save":
                // CALL API
                // RETURN UPDATED USER
                console.log("save")
                break;
            // Adds the job to the logged user's applied jobs array.
            case "apply":
                console.log("Apply")
                break;
            default:
                break;
        }

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
                    <button data-id={_id} data-action="save" onClick={handleOnClick}><FontAwesomeIcon icon="fa-solid fa-heart" /></button>
                    <button data-id={_id} data-action="apply" onClick={handleOnClick}>Apply</button>
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