import React from "react";
import { Card } from "semantic-ui-react";
import GameCard from "../GameCard/GameCard";

export default function GameFeed({ games, gamesPerRow, removeGame, handleReloadGame }) {


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
