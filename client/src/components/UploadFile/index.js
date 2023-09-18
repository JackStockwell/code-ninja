// React Imports
import React, { useEffect, useState } from 'react';

// GraphQL imports
import { useMutation } from '@apollo/client';
import { SINGLE_UPLOAD } from '../../utils/mutations';


const UploadFile = () => {   

    let fileState = {
        selectedFile: null,
        fileUploadSuccessful: false,
        link: null
    }

    const [fileData, setFileData] = useState(fileState)

    const [singleUpload, { error }] = useMutation(SINGLE_UPLOAD)
    
    const onFileChange = (e) => {

        e.preventDefault();
        
        const file = e.target.files[0]
        
        setFileData({
            selectedFile: file,
            fileUploadSuccessful: false,
        })

    };

    const onFileUpload = async () => {

      if(!fileData.selectedFile) {
        alert('You must select a file to upload!')
        return
      }

      const file = fileData.selectedFile

        try {
          const { data } = await singleUpload(
              { variables: { file }}
          );

          console.log(data)
          
          setFileData({
            selectedFile: null,
            fileUploadSuccessful: true,
            link: data.singleUpload.url
          })

        } catch (error) {
          console.error(error);
          setFileData({
            selectedFile: null,
            fileUploadSuccessful: false
        })
        }
      }


    return (
      <>
        <div>
          <input required type='file' onChange={onFileChange} />
          <button className='button' onClick={onFileUpload}>Submit</button>
        </div>
        <div style={{textAlign: 'center'}}>
          {fileData.fileUploadSuccessful && (
            <div style={{display: 'flex', }}>
              <span>File upload succesful</span>
              <a className='button' target='_blank' href={`${fileData?.link}`}>View Here</a>
            </div>
          )}
        </div>
      </>

    )

}

export default UploadFile