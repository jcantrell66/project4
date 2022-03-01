import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";

export default function SignUpPage(props) {

  const [error, setError] = useState('')
  const [state, setState] = useState({
    username: '',
    password: '',
    passwordConf: '',
  })

  const navigate = useNavigate() // navigate hook from react-router

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (state.password != state.passwordConf){
        setError('Passwords do not match!')
        return
      }
      await userService.signup(state)
      // after we signup, we can navigare/and decode our token and set in local storage
      props.handleSignUp() // <- get the token from localstorage and decode it
      // and set the user state in the App.js componennt
      navigate('/') // < route the user to our home component (all our routes are defined in App.js)

    } catch (err) {
      // err, is defined in the throw new Error in the 
      // userServiceSignUp
      setError(err.message)
    }

  }

  return (
    <>
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Sign Up
          </Header>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                name="username"
                placeholder="username"
                value={state.username}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="password"
                type="password"
                placeholder="password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="passwordConf"
                type="password"
                placeholder="Confirm Password"
                value={state.passwordConf}
                onChange={handleChange}
                required
              />
              <Button type="submit" className="btn">
                Signup
              </Button>
            </Segment>
            {error ? <ErrorMessage error={error} /> : null}
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
}

{/* <h1>Signup PAGE</h1>
<ul>
  <li>Read the Login Model, You can change it to fit your needs</li>
  <li>
    Make sure you read the Login Controller, to know how it is setup to
    find the user!
  </li>
</ul> */}