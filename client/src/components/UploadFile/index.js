// React Imports
import React, { useEffect, useState } from 'react';

// GraphQL imports
import { useMutation } from '@apollo/client';
import { SINGLE_UPLOAD } from '../../utils/mutations';


const UploadFile = () => {   

    let fileState = {
        selectedFile: null,
        fileUploadSuccessful: false,
    }

    const [fileData, setFileData] = useState(fileState)

    const [singleUpload, { error }] = useMutation(SINGLE_UPLOAD)
    
    // const onFileChange = (e) => {

    //     e.preventDefault();
        
    //     const file = e.target.files[0]

    //     console.log(file)
        
    //     setFileData({
    //         ...fileData,
    //         selectedFile: file,
    //     })

    // };

    // const onFileUpload = async () => {
    //     // Takes the saved state file to be uploaded.
    //     const file = fileData.selectedFile

    //     console.log(file)
        
    //     try {
            
    //         const { data } = await singleUpload(
    //             { variables: { file } }
    //         )

    //         console.log(data)
    //     } catch (err) {
    //         console.error(err)
    //     }

    // }

    const onChange = async ({ target }) => {
        const {
          validity,
          files: [file],
        } = target;
    
        if (validity.valid) {

            console.log(file)

          try {
            const { data } = await singleUpload(
                { variables: { file }}
            );
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }
    };

    return (
        <div>
            <h3>File Upload</h3>
            <p>Upload your resume here</p>
            <div>
                <input required type='file' onChange={onChange} />
                {/* <button onClick={onFileUpload}>Submit</button> */}
            </div>
        </div>
    )

}

export default UploadFile