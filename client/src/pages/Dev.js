import React from 'react';
// import UploadFile from '../components/UploadFile/index'
// import CreateUser from '../components/SignupForm';
import JobList from '../components/JobList';
import CategoryMenu from '../components/CategoryMenu';

const Dev = () => {
    return (
        <>
            <div>
                <CategoryMenu />
                <JobList />
                {/* <UploadFile /> */}
            </div>
        </>
    )
}

export default Dev
