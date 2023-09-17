import React from 'react'
import { convertFromHTML, Editor, EditorState } from 'draft-js';

const JobProfileList = ({children}) => {

    const contentState = convertFromRaw(JSON.parse(description));
    const editorState = EditorState.createWithContent(contentState)

  return (
    <div className=''>
        
    </div>
  )
}

export default JobProfileList
