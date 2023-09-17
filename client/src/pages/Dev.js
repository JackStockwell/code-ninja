import { Editor, EditorState, convertFromRaw } from 'draft-js';
import React from 'react';
import descriptionData from '../utils/descriptionData.json'

const Dev = () => {

    const contentState = convertFromRaw(descriptionData)
    const editorState = EditorState.createWithContent(contentState)

    return (
        <>
            <div>
                <Editor editorState={editorState} readOnly={true} />
            </div>
        </>
    )
}

export default Dev
