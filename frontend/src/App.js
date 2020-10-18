import React from 'react'
import './App.css'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom' // include yarn install and explanation for each import also mention how yarn install adds it to the dependencies
import Blog from './components/blog/Blog'
import Blogs from './components/blog/Blogs'
import Footer from './components/navigation/Footer'
import Header from './components/navigation/Header'
import Home from './components/home/Home'
import Login from './components/welcome/Login'
import Welcome from './components/welcome/Welcome'

const { createContext, useReducer, useEffect } = React;
export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        apiURL: ''
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        token: '',
        apiURL: ''
      };
    default:
      return state;
  }
};

function App() {
  const cookies = document.cookie
  const cookieSplitByUser = cookies.split("user=").pop()
  const cookiesSplitBySemicolon = cookieSplitByUser.split(";").pop(0)
  const cookieValues = cookiesSplitBySemicolon.split(" && ")
  const cookieUser = cookieValues[0]
  const cookieToken = cookieValues[1]
  const initialState = {
    isLoggedIn: cookies ? true : false,
    token: cookies ? cookieToken : '',
    apiURL: ''
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoggedIn } = state;

  const LoginRoute = ({ component: Component, authorized, ...rest }) => (
    <Route {...rest} render={(props) => (
        authorized
            ? <Redirect to='/home' />
            : <Component />
      )}
    />
  )

  const AuthRoute = ({ component: Component, authorized, ...rest }) => (
    <Route {...rest} render={(props) => (
        authorized
            ? <Component />
            : <Redirect to='/login' />
      )}
    />
  )

  useEffect(() => {
    console.log("updated cookie: ", document.cookie)
    console.log("cookieUser: ", cookieUser)
    console.log("cookieToken: ", cookieToken)
    console.log("state: ", state)
  }, [state])

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Header />
      <div style={{ marginBottom: "40px" }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>

            <LoginRoute component={Login} authorized={isLoggedIn} path="/login" />

            <AuthRoute component={Home} authorized={isLoggedIn} path="/home" />

            <Route path="/blog/:id">
              <Blog />
            </Route>

            <Route path="/blog">
              <Blogs />
            </Route>

          </Switch>
        </Router>
      </div>
      <Footer />
    </AppContext.Provider>
  );
}

export default App;
