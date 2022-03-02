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
	props.handleAddGame(state.game)
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