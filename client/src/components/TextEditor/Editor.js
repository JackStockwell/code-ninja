import React from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

const EditorRender = ({children}) => {

    const contentState = convertFromRaw(JSON.parse(children));
    const editorState = EditorState.createWithContent(contentState)

    return (
        <>
            <Editor editorState={editorState} readOnly={true} />
        </>  
    )

}

export default EditorRender