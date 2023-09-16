import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from '@apollo/client';

// Editors
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import Toolbar from "../TextEditor/Toolbar/Toolbar";
import "../TextEditor/DraftEditor.css";

// CSS
import './jobcreate.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Boostrap
import { Button, Dropdown, Modal, Row, Form, FloatingLabel, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'

// Database
import { QUERY_CATEGORIES, QUERY_TAGS } from '../../utils/queries';
import { CREATE_JOB } from "../../utils/mutations";




const JobCreate = () => {
    // State
    // Modal show state
    const [show, setShow] = useState(false)
    // MultiSeclections state. Saves the selections as an array
    const [multiSelections, setMultiSelections] = useState([]);
    // Form data object template
    const formData = {
        title: null,
        salary: null,
        category: null,
        description: null,
        tags: [],
    };
    // User Form data. 
    const [userFormData, setUserFormData] = useState(formData);
    // Error State, displays an error.
    const [errorData, setErrorData] = useState({ error: null});
    // Form validation state
    const [validation, setValidaton] = useState(false)

    // Queries for data.
    const { loading: catLoading, data: catD } = useQuery(QUERY_CATEGORIES)
    const { loading: tagLoading, data: tagD } = useQuery(QUERY_TAGS)
    const [ createJob, {error: createJobErr} ] = useMutation(CREATE_JOB)

    // Create new variables
    const categoryData = catD?.categories || [];
    const tagData = tagD?.tags || [];

    // Handles the input change in form.
    const handleInputChange = (event) => {
        // Deconstruct the target with what has changed as name and the value as well value.
        const { name, value } = event.target;

        // Set the change in form data on the change in name and value.
        setUserFormData({ ...userFormData, [name]: value });
    }

    // Handles form submission.
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return
        }

        setValidaton(true)
        setErrorData({error: null})

        // Gets the current content from the editor state.
        const contentState = editorState.getCurrentContent()
        // Checks to see if there is sufficient text length
        if (contentState.getPlainText().length < 1) {
            setErrorData({error: "To keep your Job Description professional, it must be at least 200 characters in length"})
        }
        // Stringifies the data, sets the user data description to theee string format.
        const data = JSON.stringify(convertToRaw(contentState))

        const tagsArr = userFormData.tags.map((obj) => obj._id)

        console.log(tagsArr)

        setUserFormData({...userFormData, description: data, salary: Number(userFormData.salary), tags: tagsArr })

        try {
            const { data } = await createJob({
                variables: { input: {...userFormData} }
            })
        } catch (err) {
            console.error(err)
        }
    }
    // Handles the modal opening and closing
    const handleOpen = () => setShow(prev => !prev)

    // EDITOR
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(
          convertFromRaw({
            blocks: [
              {
                key: "3eesq",
                text: "",
                type: "unstyled",
                depth: 0,
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          })
        )
      );
      const editor = useRef(null);

    
        const handleKeyCommand = (command) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
            setEditorState(newState);
            return true;
            }
            return false;
        };
        
        // FOR INLINE STYLES
        const styleMap = {
            CODE: {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
            },
            HIGHLIGHT: {
            backgroundColor: "#F7A5F7",
            },
            UPPERCASE: {
            textTransform: "uppercase",
            },
            LOWERCASE: {
            textTransform: "lowercase",
            },
            CODEBLOCK: {
            fontFamily: '"fira-code", "monospace"',
            fontSize: "inherit",
            background: "#ffeff0",
            fontStyle: "italic",
            lineHeight: 1.5,
            padding: "0.3rem 0.5rem",
            borderRadius: " 0.2rem",
            },
            SUPERSCRIPT: {
            verticalAlign: "super",
            fontSize: "80%",
            },
            SUBSCRIPT: {
            verticalAlign: "sub",
            fontSize: "80%",
            },
        };
    
        // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
        const myBlockStyleFn = (contentBlock) => {
            const type = contentBlock.getType();
        switch (type) {
          case "blockQuote":
            return "superFancyBlockquote";
          case "leftAlign":
            return "leftAlign";
          case "rightAlign":
            return "rightAlign";
          case "centerAlign":
            return "centerAlign";
          case "justifyAlign":
            return "justifyAlign";
          default:
            break;
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleOpen}>Post new Job</Button>

            <Modal show={show} onHide={setShow} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validation}>
                        <Row className="g-2 mb-3">
                            <Form.Group as={Col} controlId='formTitle'>
                                <FloatingLabel controlId="formTitle" label="Job Title">
                                    <Form.Control 
                                        name="title" 
                                        type="text"  
                                        onChange={handleInputChange} 
                                        value={userFormData.title || ''} 
                                        required 
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} controlId='formSalar'>
                                <FloatingLabel controlId="formSalar" label="Salary">
                                    <Form.Control 
                                        name="salary" 
                                        type="number"
                                        onChange={handleInputChange} 
                                        value={userFormData.salary || ''} 
                                        required 
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row className="g-2">
                            <Form.Group className="mb-3" as={Col}>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Category"
                                >
                                <Form.Select name="category" value={userFormData.category || ''} onChange={handleInputChange} aria-label="Floating label select example" required>
                                    {categoryData.map((category) => {
                                        return <option key={category._id} value={category._id}>{category.name}</option>
                                    })}
                                </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                            <div className="editor-wrapper mb-3" >
                                <Toolbar editorState={editorState} setEditorState={setEditorState} />
                            <div className="editor-container">
                                <Editor
                                ref={editor}
                                placeholder="Job Description"
                                handleKeyCommand={handleKeyCommand}
                                editorState={editorState}
                                customStyleMap={styleMap}
                                blockStyleFn={myBlockStyleFn}
                                onChange={(editorState) => {
                                    const contentState = editorState.getCurrentContent();
                                    setEditorState(editorState);
                                }}
                                />
                            </div>
                            {errorData && <span style={{color: '#BA4334' }}>{errorData.error || ''}</span>}
                        </div>
                        <Row className="g-2">
                            <Form.Group className="mb-3">
                                <Form.Label>Multiple Selections</Form.Label>
                                <Typeahead
                                    id="basic-typeahead-multiple"
                                    labelKey="name"
                                    multiple
                                    onChange={setMultiSelections}
                                    options={tagData}
                                    placeholder="Tags"
                                    selected={multiSelections}
                                />
                            </Form.Group>
                        </Row>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="large" onClick={handleFormSubmit}>
                                Create Job
                            </Button>
                        </div>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleOpen}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default JobCreate
