import React from 'react';
import '../../App.css';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const { useState } = React;

function BlogHome(props) {
    const { bp, onDelete, onEdit } = props

    const splitBlogpostDescription = bp.description.split(' ')
    const bpPreviewList = splitBlogpostDescription.slice(0, 5)
    const bpPreviewString = bpPreviewList.join(' ')
    const bpPreview = `${bpPreviewString}...`

    const [bpText, setBPText] = useState(bpPreview)
    const [bpValue, setBPValue] = useState({
        title: bp.title,
        email: bp.email,
        description: bp.description,
    })
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const handleDeletePost = () => onDelete(bp.id)

    const handleEditPost = () => onEdit(bpValue, bp.id)

    const handleInputChange = (e) => {
        e.preventDefault()
        console.log('event handler ', e.target.name, ' and val ', e.target.value)
        const name = e.target.name
        const value = e.target.value
        setBPValue({
            ...bpValue,
            [name]: value
        })
        console.log('handleInputChange has been called', bpValue)
    }

    function toggleEditPost() {
        if (isEditing) {
            setIsEditing(false)
            setBPValue({
                title: bp.title,
                description: bp.description,
            })
        } else {
            setIsEditing(true)
            setBPValue({
                title: bp.title,
                description: bp.description,
            })
        }

        console.log('isEditing is now: ', isEditing)
    }

    function expandPost() {
        if (isExpanded) {
            setIsExpanded(false)
            setBPText(bpPreview)
        } else {
            setIsExpanded(true)
            setBPText(bp.description)
        }

        console.log('isExpanded is now: ', isExpanded)
    }

    return (
        <Col className="BlogHome">
            <Card style={{ margin: '5px' }}>
                {/* <Card.Img/> */}
                <Card.Body>
                    {isEditing ?
                        <>
                            <Form onSubmit={handleEditPost}>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name="title" type="text" onChange={handleInputChange} value={bpValue.title} />
                                    <Form.Label>Blogpost</Form.Label>
                                    <Form.Control name="description" type="text" as="textarea" rows="5" onChange={handleInputChange} value={bpValue.description} />
                                </Form.Group>
                                <Button
                                    variant="danger"
                                    onClick={toggleEditPost}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="success"
                                    type="submit"
                                >
                                    Confirm Edit
                                </Button>
                            </Form>
                        </>
                    :
                        <Row>
                            <Card.Title>
                                {bp.title}
                            </Card.Title>
                            <Card.Text>
                                Author: {bp.email}
                            </Card.Text>
                            <Card.Text>
                                {bpText}
                                <Button variant="info" onClick={expandPost}>Expand Post</Button>
                            </Card.Text>
                            <Button
                                variant="secondary"
                                onClick={toggleEditPost}
                                >
                                    Edit Post
                            </Button>
                            <Button
                                variant="danger"
                                id={bp.id}
                                onClick={handleDeletePost}
                            >
                                Delete Post
                            </Button>
                        </Row>
                    }
                </Card.Body>
            </Card>
        </Col>
    );
}

export default BlogHome;