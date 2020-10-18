import React from 'react';
import '../../App.css';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function Footer() {

  return (
    <div className="footer-text">
      <Navbar bg="primary" variant="dark" fixed="bottom">
          <Nav className="mr-auto">
            <Container fluid>
              <Col lg="auto">
                <Nav.Link>Owned by Newark's Students</Nav.Link>
              </Col>
              <Col lg="auto">
                <Nav.Link>Made in 2021</Nav.Link>
              </Col>
              <Col lg="auto">
                <Nav.Link >@CityOfNewark</Nav.Link>
              </Col>
            </Container>
          </Nav>
      </Navbar>
    </div>
  );
}

export default Footer;