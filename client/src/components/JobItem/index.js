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
  currentCategory
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
        <div className="job-card">
            <div className="job-header">
                <div className="job-title">
                    <h3>{title}</h3>
                    <h4><Link className="job-link" to={`/cmp/${company.companyName}/${company._id}`}>{company.companyName}</Link></h4>
                    <h5>                        
                        {company.location ? (
                        <p>{company.location.city}</p>
                        ) : (
                            <p>London</p>
                        )}
                    </h5>
                </div>
                {!Auth.empLogged() && Auth.loggedIn() && (
                    <div className="buttons">
                    {/* Button container */}
                        <button className="category-button" data-id={_id} data-action="save" onClick={handleOnSave}>
                            Save
                            </button>
                        <button className="category-button" data-id={_id} data-action="apply" onClick={handleOnApply}>
                            Apply
                        </button>
                    </div>
                )}
                {!Auth.loggedIn() && (
                    <>
                        <Link to='/login' className="button link">You must be logged in to Apply!</Link>
                    </>
                )}           
            </div>
            <div className="job-header">
                <div>
                    <p className="job-category">{category.name}</p>
                </div>
                <div className="job-tag-container">
                    <h6>Tags:</h6>
                    <div className="job-tag-div">
                        {tags &&
                            tags.map((tag) => {
                                return <p key={tag._id} id={tag._id}>{tag.name}</p>;
                        })}
                    </div>
                </div>
            </div>
            {/* Company div, deconstructs the prop */}
            <div className="job-info">
                <div className="job-sal-div">
                    <h6>Salary:</h6>
                    <p>{salary}</p>
                </div>
            </div>
            <div className="job-description">
                <Editor editorState={editorState} readOnly={true} />
            </div>            
        </div>
    )
}

export default JobItem;
