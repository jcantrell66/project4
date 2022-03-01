import React from 'react';
import { Card, Icon, Image, Button, Grid } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import "./GameCard.css";

function GameCard({ game, isProfile, user, removeGame, handleReloadGame }) {

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
          <Card>
            <p className={`ui black header`}>Current player count: <span className={`ui ${game.color} header`}>{` ${game.playerCount}`}</span></p>
          </Card>
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
          {/* </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </Card >
  )
}

export default GameCard;