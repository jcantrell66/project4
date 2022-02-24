import React, { useState, useEffect } from "react";
import "./HomePage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import tokenService from "../../utils/tokenService";
import * as gamesApi from "../../utils/gamesApi";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import GameFeed from "../../components/GameFeed/GameFeed";

const axios = require('axios').default;

export default function HomePage({ user, handleLogout }) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    async function handleAddGame(game) {
        try {
            setLoading(true);
            let duplicate = games.find(element => element.name === game)
            if (duplicate){
                setError('Duplicate game')
            }
            const data = await gamesApi.queryApi(game); // our server is going to return
            // the created post, that will be inside of data, which is the response from
            // the server, we then want to set it in state
            console.log(data.gameData, " this is response from the server, in handleAddGame");
            setGames([data.gameData, ...games]);
            console.log(games)
            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err);
            setError(err.message); 
        }
    }

    useEffect(() => {
        console.log(user)
        // getGames();
    }, []);


    // if (loading) {
    //     return (
    //       <>
    //         <Header handleLogout={handleLogout} user={user} />
    //         <Loading />
    //       </>
    //     );
    //   }

    if (error) {
        return (
            <>
                <Header handleLogout={handleLogout} user={user} />
                <ErrorMessage error={error} />;
            </>
        );
    }




    return (
        <>
            <Header handleLogout={handleLogout} />
            <h1>info</h1>
            <SearchBar handleAddGame={handleAddGame} />
            <GameFeed games={games} gamesPerRow={2} loading={loading} />
        </>
    );
}
