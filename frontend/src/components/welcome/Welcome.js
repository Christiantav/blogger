import React from 'react';
import '../../App.css';
import Jumbotron from 'react-bootstrap/Jumbotron'

function Welcome() {
  return (
    <>
      <Jumbotron>
        <h1>Welcome to Blogger!</h1>
        <p>
          Read your favorite blogs from your favorite people.
        </p>
      </Jumbotron>
    </>
  );
}

export default Welcome;