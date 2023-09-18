import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import "./JobItem.css";
import {Link} from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { SAVE_JOB, APPLY_JOB } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
import { useJobContext } from "../../utils/GlobalState";
import { UPDATE_JOB_APPS, UPDATE_JOB_SAVES } from "../../utils/actions";


import EditorRender from '../TextEditor/Editor'


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

  // Global state and reducer import
  const [state, dispatch] = useJobContext();
  const { jobApps, jobSaves } = state;

  // DB mutations and query
  const [saveJob, { error: saveError }] = useMutation(SAVE_JOB);
  const [applyJob, { error: applyError}] = useMutation(APPLY_JOB)
  const { loading: meLoading, data: meData } = useQuery(GET_ME);

  useEffect(() => {
    if(meData) {
      dispatch({
        type: UPDATE_JOB_APPS,
        jobs: meData.me.jobApp
      })
      dispatch({
        type: UPDATE_JOB_SAVES,
        jobs: meData.me.jobSaves
      })
    }
  }, [meData, meLoading, dispatch])


  const handleOnSave = async ({target}) => {
    const id = target.dataset.id;
    if (!Auth.loggedIn()) {
      return;
    }
    try {
      const {data} = await saveJob({
        variables: {id: id},
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnApply = async ({target}) => {
    // Takes id from the target apply button.
    const applyJobId = target.dataset.id;
    // Checks for them being logged in, returns if not logged in.
    if (!Auth.loggedIn()) {
      return;
    }
    // API request.
    try {
      const {data} = await applyJob({
        variables: {id: applyJobId},
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

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
                <EditorRender>
                    {description}
                </EditorRender>
            </div>            
        </div>
    )
}

export default JobItem;
