import React from 'react';
import '../../App.css';
import BlogPreview from './BlogPreview'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'

const { useEffect, useState } = React; 

function Blogs() {
  const [blogposts, setBlogposts] = useState([]);

  useEffect(() => {
    fetch('/blogposts')
    .then(res => res.json())
    .then(data => {
      console.log('blogposts data: ', data)
      setBlogposts(data);
    });
  }, []);

  return (
    <>
      <Jumbotron>
        <h1>My Blog</h1>
      </Jumbotron>
      <Row xs={1} md={2}>
        {blogposts.map(bp => <BlogPreview key={bp.id} bp={bp} isHome={false} />)}
      </Row>
    </>
  );
}

export default Blogs;