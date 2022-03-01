import React from 'react';
import { Card, Icon, Button, Grid } from 'semantic-ui-react'
import "./GameCard.css";

function GameCard({ game, removeGame, handleReloadGame }) {

  function clickHandler() {
    removeGame(game._id)
  }

  function clickRedoHandler() {
    handleReloadGame(game._id, game.name, game.appid, game.playerCount)
  }


  return (
    <Card key={game._id} raised>
      <Card.Content textAlign="left">
        <Card.Header>
          {game.name}
        </Card.Header>
      </Card.Content>
      <Card.Content>

        <Card.Description>
            <p ><span className={`ui black header`}>Current player count: </span><span className={`ui ${game.color} header`}>{` ${game.playerCount}`}</span></p>
        </Card.Description>

      </Card.Content>
      <Grid columns={2} >
        <Grid.Row>
          <Grid.Column textAlign={"left"} >
            <div>
              <Button onClick={clickRedoHandler}>
                <Icon name={"redo"} />
              </Button>
            </div>
          </Grid.Column>
          <Grid.Column textAlign={"right"} >
            <div>
              <Button basic color='red' onClick={clickHandler}>
                X
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card >
  )
}

export default GameCard;