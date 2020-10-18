import React from 'react';
import '../../App.css';
import { validString, validLength } from '../utils'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const { useState } = React;

function BlogCreate(props) {
    const { onCreate } = props

    const [bpValue, setBPValue] = useState({
        title: '',
        description:'',
    })
    const [validValue, setValidValue] = useState({
        title: true,
        description: true,
    })
    const [isCreatingPost, setIsCreatingPost] = useState(false)

    function checkValidity() {
        let allValid = true
        let validTitle = true
        let validDescription = true

        if (validString(bpValue.title) === false || validLength(0, 100, bpValue.title) === false) {
            validTitle = false
            allValid = false
        }

        if (validString(bpValue.description) === false || validLength(0, 400, bpValue.description) === false) {
            validDescription = false
            allValid = false
        }

        setValidValue({
            title: validTitle,
            description: validDescription,
        })
        console.log('validityCheck called: ', allValid, validValue)
        return allValid
    }

    const handleCreatePost = (e) => { e.preventDefault(); if (checkValidity() === true) { return onCreate(bpValue) }}

    const handleInputChange = (e) => {
        e.preventDefault()

        const name = e.target.name
        const value = e.target.value
        setBPValue({
            ...bpValue,
            [name]: value
        })
    }

    function toggleForm() {
        if (isCreatingPost) {
            setIsCreatingPost(false)
        } else {
            setIsCreatingPost(true)
        }
    }

    return (
        <div className="BlogCreate">
            {isCreatingPost ?
                <Form onSubmit={handleCreatePost}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" type="text" onChange={handleInputChange} value={bpValue.title} />
                        <Form.Text className="warningText" muted>
                            {validValue.title ? '' : '* Please enter a valid value between 1 and 100 characters'}
                        </Form.Text>
                        <Form.Label>Blogpost</Form.Label>
                        <Form.Control name="description" type="text" as="textarea" rows="5" onChange={handleInputChange} value={bpValue.description} />
                        <Form.Text className="warningText" muted>
                            {validValue.description ? '' : '* Please enter a valid value between 1 and 400 characters'}
                        </Form.Text>
                    </Form.Group>
                    <Button variant="danger" onClick={toggleForm}> Cancel </Button>
                    <Button variant="success" type="submit"> Create Post </Button>
                </Form>
                :
                <Button align="center" variant="primary" onClick={toggleForm}>Create a Blog Post!</Button>
            }
        </div>
    );
}

export default BlogCreate;