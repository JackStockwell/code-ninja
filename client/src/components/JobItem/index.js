import React from 'react'
import { useMutation } from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Auth from '../../utils/auth';


function JobItem({ _id, title, company, description, location, salary, tags, category }) {

    const handleOnClick = (e) => {
        e.preventDefault()

        console.log(e.target.dataset.id)

        let action = e.target.dataset.action

        switch (action) {
            case "save":
                console.log("save")
                break;
            case "apply":
                console.log("Apply")
                break;
            default:
                break;
        }

    }

    console.log(Auth.getProfile())

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
            {Auth.getProfile() && (
                <button data-id={_id} data-action="save" onClick={handleOnClick}><FontAwesomeIcon icon="fa-solid fa-heart" /></button>      
            )}    
            <button data-id={_id} data-action="apply" onClick={handleOnClick}>Apply</button>
        </>
    )
}

export default JobItem