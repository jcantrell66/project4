import React, { useState } from 'react';

import { Button, Form, Grid, Segment, Header } from 'semantic-ui-react'

export default function SearchGames(props){
  const [state, setState] = useState({
    game: ''
  })

 


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    // const formData = new FormData()
    // formData.append('game', state.game)
    // props.handleAddGame(formData)
	props.handleAddGame(state.game)
    // Have to submit the form now! We need a function!
  }


  return (
    
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
          <Header>
          Enter game here:
          </Header>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            
              <Form.Input
                  className="form-control"
                  name="game"
                  value={state.caption}
                  placeholder="Search for games"
                  onChange={handleChange}
                  required
              />   
          <Header>
          {props.error}
          </Header>
              <Button
                type="submit"
                className="btn"
              >
                Search games
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
   
  ); 
}