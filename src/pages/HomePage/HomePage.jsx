import React, { useState, useEffect } from "react";
import "./HomePage.css";
// import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import tokenService from "../../utils/tokenService";
import * as gamesApi from "../../utils/gamesApi";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import GameFeed from "../../components/GameFeed/GameFeed";
import { Grid } from "semantic-ui-react";

const axios = require('axios').default;

export default function HomePage({ user, handleLogout }) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    async function handleAddGame(game) {
        console.log(game, '<= this is the game name')
        try {
            setLoading(true);
            let duplicate = games.find(element => element.name === game)
            if (duplicate) {
                setError('Duplicate game!')
                return
            }
            const data = await gamesApi.queryApi(game); // our server is going to return
            // the created post, that will be inside of data, which is the response from
            // the server, we then want to set it in state
            console.log(data.gameData, " this is response from the server, in handleAddGame");
            setGames([data.gameData, ...games]);
            console.log(games)
            setLoading(false);
            setError('')
        } catch (err) {
            setError(err.message);
            console.log(err);
            setError(err.message);
        }
    }

    async function getGames() {
        try {
            const data = await gamesApi.getAll();
            console.log(data, " this is data,");
            setGames([...data.gameData]);
            setLoading(false);
        } catch (err) {
            console.log(err.message, " this is the error");
            setError(err.message);
        }
    }

    async function handleReloadGame(id, name, appid, playerCount) {
        try {
            // console.log(name, id, appid, playerCount, '<= name and id of game')
            const data = await gamesApi.reloadApi(appid, playerCount, id);
            console.log(games, '<= games state after pushing colorCount')
            console.log(data, '<= 1 updated game')
            getGames();

        } catch (err) {
            setError(err.message);
            console.log(err);
            setError(err.message);
        }
    }

    async function removeGame(gameId) {
        try {
            const data = await gamesApi.deleteApi(gameId);
            getGames(); // < - will get all the posts and update the state, with our like added to the post
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    }

    

    useEffect(() => {
        console.log(user)
        getGames();
    }, []);


    // if (loading) {
    //     return (
    //       <>
    //         <Header handleLogout={handleLogout} user={user} />
    //         <Loading />
    //       </>
    //     );
    //   }

    // if (error) {
    //     return (
    //         <>
    //             <Header handleLogout={handleLogout} user={user} />
    //             <ErrorMessage error={error} />;
    //         </>
    //     );
    // }




    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <Header handleLogout={handleLogout} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <SearchBar handleAddGame={handleAddGame} error={error} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 800 }}>
                    <GameFeed
                        games={games}
                        gamesPerRow={2}
                        loading={loading}
                        removeGame={removeGame}
                        handleReloadGame={handleReloadGame} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
