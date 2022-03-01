import React from "react";
import { Card, Dimmer, Segment, Image, Loader } from "semantic-ui-react";
import GameCard from "../GameCard/GameCard";
// import Loader from '../Loader/Loader'

export default function GameFeed({ games, gamesPerRow, loading, removeGame, handleReloadGame }) {


    return (
        <Card.Group itemsPerRow={gamesPerRow} stackable>
            {games.map((game) => {
                return (
                    <GameCard
                        game={game}
                        key={game.appId}
                        removeGame={removeGame}
                        handleReloadGame={handleReloadGame}
                    />
                );
            })}
        </Card.Group>
    );
}
