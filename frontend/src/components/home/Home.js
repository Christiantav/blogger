import React from 'react'
import { AppContext } from "../../App";
import '../../App.css'
import BlogHome from './BlogHome'
import BlogCreate from './BlogCreate'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row'

const { useContext, useEffect, useState } = React;

function Home() {
  const { dispatch, state } = useContext(AppContext);
  const { token, user } = state;
  const [blogposts, setBlogposts] = useState([]);

  function getBlogposts() {
    const route = '/blogposts'
  
    fetch(route).then(res => res.json()).then(data => {
      console.log('blogposts data: ', data)
      setBlogposts(data);
    });
  }

function getHomeBlogposts() {
  const route = '/home/blogposts'

  fetch(route, {
    method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },
  })
    .then(res => res.json())
    .then(data => {
      console.log('user blogposts data: ', data)
      setBlogposts(data);
  });
}

  useEffect(() => {
    getHomeBlogposts()
    console.log('log user', user)
  }, [])

  function createPost(bp) {
    const route = '/blog'
    console.log('blogpost: ', bp)
    console.log('token: ', token)

    fetch(route, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bp)
    })
    .then(data => {
      console.log('blogposts data: ', data)
      getHomeBlogposts()
    });
  }

  function editPost(bp, id) {
    // write some code to delete a blogpost
    const bpEditID = id

    const bpEditRoute = `/blog/${bpEditID}`
    fetch(bpEditRoute, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bp)
    })
    .then(data => {
        console.log('blogposts data: ', data)
        getHomeBlogposts()
    });
  }

  function deletePost(id) {
    // write some code to delete a blogpost
    const bpDeleteID = id

    const bpDeleteRoute = `/blog/${bpDeleteID}`
    fetch(bpDeleteRoute, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    })
    .then(data => {
        console.log('blogposts data: ', data)
        getHomeBlogposts()
    });
  }

  return (
    <>
      <Jumbotron>
        <h1 style={{ marginBottom: '25px' }} >Home Page</h1>
        <BlogCreate onCreate={createPost} />
      </Jumbotron>
      <Row xs={1} md={2}>
        {blogposts.map(bp => <BlogHome bp={bp} onEdit={editPost} onDelete={deletePost} key={bp.id} />)}
      </Row>
    </>
  );
}

export default Home;