import React, { useEffect } from 'react';
import { AppContext } from "../../App";
import '../../App.css';
import useCookie from '../utils/useCookie'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const { useContext } = React;

function Header() {
  const { dispatch, state } = useContext(AppContext);
  const [cookieUser, setCookieUser] = useCookie("user", "");
  const { isLoggedIn } = state;

  const logout = (e) => {
    e.preventDefault()
    console.log("isLoggedIn: ", isLoggedIn)
    setCookieUser('', 0)
    console.log("cookieUser: ", cookieUser)
    dispatch({
        type: "LOGOUT"
    })
  }

  // useEffect(() =>{
  //   console.log("cookie: ", document.cookie)
  // }, [])
  
  return (
    <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Blogger</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/blog">Posts</Nav.Link>
            { isLoggedIn
              ?
              <>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
                <Nav.Link href="/home">Home</Nav.Link>
              </>
              :
              <Nav.Link href="/login">Login</Nav.Link>
            }
        </Nav>
    </Navbar>
  );
}

export default Header;