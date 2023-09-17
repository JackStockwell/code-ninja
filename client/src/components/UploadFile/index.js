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
    
    const onFileChange = (e) => {

        e.preventDefault();
        
        const file = e.target.files[0]

        console.log(file)
        
        setFileData({
            ...fileData,
            selectedFile: file,
        })

    };

    const onFileUpload = async () => {

      const file = fileData.selectedFile

        try {
          const { data } = await singleUpload(
              { variables: { file }}
          );
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }


    return (
      <div>
          <input required type='file' onChange={onFileChange} />
          <button onClick={onFileUpload}>Submit</button>
      </div>
    )

}

export default UploadFile