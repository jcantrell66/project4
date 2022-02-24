import React from "react";
import { Card, Dimmer, Segment, Image, Loader } from "semantic-ui-react";
import GameCard from "../GameCard/GameCard";
// import Loader from '../Loader/Loader'

export default function GameFeed({ games, gamesPerRow, loading }) {


    return (
        <>
            {games.map((game) => {
                return (
                    <GameCard
                        game={game}
                        key={game.appId}
                    />
                );
            })}
        </>
    );
}
