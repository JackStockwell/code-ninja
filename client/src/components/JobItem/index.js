import React from "react";
import {useMutation} from "@apollo/client";
import Auth from "../../utils/auth";
import {SAVE_JOB} from "../../utils/mutations";
import "./JobItem.css";
import { Link } from 'react-router-dom';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

function JobItem({
  _id,
  title,
  company,
  description,
  location,
  salary,
  tags,
  category,
}) {

    // Mutations
    const [saveJob, { error }] = useMutation(SAVE_JOB)
    
    const contentState = convertFromRaw(JSON.parse(description));
    const editorState = EditorState.createWithContent(contentState)

    // Handles the onClick of the button, performs a different action depending on what was clicked.
    const handleOnSave = async ({ target }) => {
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
        } catch (err) {
            console.error(err)
        }
    }

    const handleOnApply = () => {
        
    }

    console.log(company)

    return (
        <div className="job-item-container"> {/* Container for each job item */}
            {" "}
            <div className="job-card">
                <h3 className="job-title">{title}</h3>
                {/* Company div, deconstructs the prop */}
                <div className="company-info">
                    <h4>{company.companyName}</h4>
                    <p>{company.about}</p>
                    {company.location ? (
                        <p>{company.location}</p>
                    ) : (
                        <p>St Luke's, London</p>
                    )}
                    <Link className="category-button" to={`/cmp/${company.companyName}/${company._id}`} >Profile</Link>
                </div>
                <p>{salary}</p>
                {tags &&
                    tags.map((tag) => {
                        return <p key={tag._id} id={tag._id}>{tag.name}</p>;
                    })}
                <p>{category.name}</p>
                <Editor editorState={editorState} readOnly={true} />
                {Auth.loggedIn() ? (
                  <div className="buttons">
                  {/* Button container */}
                    <button data-id={_id} data-action="save" onClick={handleOnSave}>
                        Save
                        </button>
                    <button data-id={_id} data-action="apply" onClick={handleOnApply}>
                    Apply
                    </button>
                </div>
                ) : (
                    <>
                        <Link to='/login' className="button">You must be logged in to Apply!</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default JobItem;
