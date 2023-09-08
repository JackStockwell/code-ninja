import React, { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'


const UploadFile = () => {   

    let fileState = {
        selectedFile: null,
        fileUploadSuccessful: false,
        test: false
    }

    const [fileData, setFileData] = useState(fileState)

    

    console.log(fileData)

    const onFileChange = (e) => {
        e.preventDefault();
        
        console.log(e.target.files)

        setFileData({ ...fileData,
            selectedFile: [e.target.files[0]],
            test: true
        })

    }

    

    const onFileUpload = async () => {

        console.log(fileData)
    
        let filename = uuidv4()    
    
        const formData = new FormData();
        formData.append(
            "Dev Test",
            fileData.selectedFile[0],
            filename
        )

        console.log(Object.fromEntries(formData))
        
        try {
            const data = await fetch(`${process.env.REACT_APP_AWS_API_URL}${filename}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/pdf'
                },
                body: formData
            })

            console.log(data)
        } catch (err) {
            console.error(err)
        }

    }

    const fileRes = () => {
        if (fileData.selectedFile) {
            <div>
                <h3>File Details:</h3>
                <p>Name: {fileData.selectedFile.name}</p>
            </div>
        } else if (fileData.fileUploadSuccessful) {
            return (
                <div>
                    <p>Successfully uploaded!</p>
                </div>
            )
        }
    }

    return (
        <div>
            <h3>File Upload</h3>
            <p>Upload your resume here</p>
            <div>
                <input type='file' onChange={onFileChange} />
                <button onClick={onFileUpload}>Submit</button>
            </div>
        </div>
    )

}

export default UploadFile