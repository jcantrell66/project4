import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";

function GameCard({game, isProfile, user }) { 





	
  return (
	<Card key={game._id} raised>
        {game.name}: 
        {` ${game.playerCount}`}
  </Card>
  )
}

export default GameCard;