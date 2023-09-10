import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid'
// import { SINGLE_UPLOAD } from '../../utils/mutations';


const UploadFile = () => {   

    let fileState = {
        selectedFile: null,
        fileUploadSuccessful: false,
    }

    const [fileData, setFileData] = useState(fileState)

    // const [singleUpload, { error }] = useMutation(SINGLE_UPLOAD)
    
    // const onFileChange = (e) => {
    //     const { target } = e
    //     console.log(target.files)
    //     e.preventDefault();
        
    //     setFileData({ ...fileData,
    //         selectedFile: [e.target.files[0]],
    //     })

    //     console.log(target.validity.valid)

    // }

    // const onFileUpload = async () => {

    //     const file = fileData.selectedFile[0]

    //     console.log("Test")
        
    //     try {
            
    //         const { data } = await singleUpload({ 
    //             variables: {file: fileData.selectedFile[0]}
    //         })

    //         console.log(data)
    //     } catch (err) {
    //         console.error(err)
    //     }

    // }
    const SINGLE_UPLOAD = gql`
    mutation Mutation($file: Upload!) {
        singleUpload(file: $file) {
            encoding
            filename
            mimetype
            url
        }
    }
    `;
    const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD);

    const onChange = async ({ target }) => {
        const {
          validity,
          files: [file],
        } = target;
    
        if (validity.valid) {

            console.log(file)

          try {
            const { data } = await mutate(
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