import React, { useState, useEffect } from "react";
import "./HomePage.css";
import * as gamesApi from "../../utils/gamesApi";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import GameFeed from "../../components/GameFeed/GameFeed";
import { Grid } from "semantic-ui-react";
import Loading from "../../components/Loader/Loader";


export default function HomePage({ user, handleLogout }) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    async function handleAddGame(game) {
        console.log(game, '<= this is the game name')
        try {
            setLoading(true);
            let duplicate = games.find(element => element.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === game.replace(/[^a-z0-9]/gi, '').toLowerCase())
            if (duplicate) {
                setLoading(false);
                setError('Duplicate game!')
                return
            }
            const data = await gamesApi.queryApi(game);
            console.log(data.gameData, " this is response from the server, in handleAddGame");
            setGames([data.gameData, ...games]);
            console.log(games)
            setLoading(false);
            setError('')
        } catch (err) {
            setLoading(false);
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
            setLoading(false);
            console.log(err.message, " this is the error");
            setError(err.message);
        }
    }

    async function handleReloadGame(id, name, appid, playerCount) {
        try {
            const data = await gamesApi.reloadApi(appid, playerCount, id);
            getGames();
            setError('')
        } catch (err) {
            setError(err.message);
            console.log(err);
            setError(err.message);
        }
    }

    async function removeGame(gameId) {
        try {
            await gamesApi.deleteApi(gameId);
            getGames();
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    }

    

    useEffect(() => {
        console.log(user)
        getGames();
    }, []);


    if (loading) {
        return (
          <>
            <Header handleLogout={handleLogout} />
            <Loading />
          </>
        );
      }



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
