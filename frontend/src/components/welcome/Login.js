import React from 'react';
import { AppContext } from "../../App";
// import { useHistory } from "react-router-dom";
import useCookie from '../utils/useCookie'
import '../../App.css';
import { validEmail, validLength, validString } from '../utils'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'

const { useContext, useEffect, useState } = React;

function Login() {
    const [cookieUser, setCookieUser] = useCookie("user", "");
    const { dispatch, state } = useContext(AppContext);
    const { isLoggedIn } = state;
    // const history = useHistory();
    const [userState, setUserState] = useState({
        email: '',
        password: ''
    })
    const [validValue, setValidValue] = useState({
        email: true,
        password: true
    })

    function fetchLoginToken() {
        const route = '/login'
        
        fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(userState)
        })
        .then(res => res.json())
        .then(data => {
            setCookieUser(data.token, 7)
            dispatch({
                type: "LOGIN",
                payload: data
            })
        })
    }

    function checkValidity() {
        let allValid = true
        let isValidEmail = true
        let isValidPassword = true

        if (validEmail(userState.email) === false || validString(userState.email) === false || validLength(0, 100, userState.email) === false) {
            isValidEmail = false
            allValid = false
        }
    
        if (validString(userState.password) === false || validLength(0, 100, userState.password) === false) {
            isValidPassword = false
            allValid = false
        }

        setValidValue({
            email: isValidEmail,
            password: isValidPassword,
        })

        console.log('validityCheck called: ', allValid, validValue)
        return allValid
    }
    
    const handleLoginUser = (e) => { e.preventDefault(); if (checkValidity() === true) { return fetchLoginToken() }}
    
    const handleInputChange = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setUserState({
            ...userState,
            [name]: value
        })
    }

    return (
        <>
            <Jumbotron>
                <h1>Login to Blogger!</h1>
                <p>
                Read your favorite blogs from your favorite people.
                </p>
            </Jumbotron>
            <Form onSubmit={handleLoginUser}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="text" onChange={handleInputChange} value={userState.email} />
                    <Form.Text className="warningText" muted>
                            {validValue.email ? '' : '* Please enter a valid email'}
                    </Form.Text>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" onChange={handleInputChange} value={userState.password} />
                    <Form.Text className="warningText" muted>
                            {validValue.password ? '' : '* Please enter a valid password value'}
                    </Form.Text>
                </Form.Group>
                {/* <Button
                    variant="danger"
                    // onClick={forgotPassword}
                >
                    Forgot Password
                </Button> */}
                <Button
                    variant="success"
                    type="submit"
                >
                    Login
                </Button>
            </Form>
        </>
    );
}

export default Login;