const Game = require('../models/game');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); 
const axios = require('axios');



const create = async (req, res) => {
    try {

        let allGames = await axios.get(`http://api.steampowered.com/ISteamApps/GetAppList/v0002`)
        let gameArray = allGames.data.applist.apps

        // trying it with reg exp
        let appid = gameArray.find(element => element.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === req.body.data.replace(/[^a-z0-9]/gi, '').toLowerCase())

        let data = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=${appid.appid}`);

        let playerCount = data.data.response.player_count;
        let gameData = await Game.create({
            user: req.user,
            name: appid.name,
            appid: appid.appid,
            playerCount: playerCount,
            color: 'grey',
            active: true
        })
        if (!data) res.status(404).json({ message: 'Could not load data' });
        res.status(201).json({ gameData });
    } catch (e) {
        res.status(500).json({ message: 'Bad Request' })
    }
}

const deleteGame = async (req, res) => {
    try {
        const game = await Game.findOne({ '_id': req.params.id });
        game.remove(req.params.id)
        await game.save()
        res.json({ data: 'game removed' })
    } catch (err) {
        res.status(400).json({ err })
    }
}

const reloadGame = async (req, res) => {
    try {
        let appid = req.params.id
        let data = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=${appid}`);
        let newPlayerCount = data.data.response.player_count;

        let countColor = newPlayerCount > req.body.playerCount ? 'green' : 'red'
        if (req.body.playerCount === newPlayerCount) {
            countColor = 'grey'
        }

        const clickedGame = await Game.findById(req.body.id)

        clickedGame.color = countColor
        clickedGame.playerCount = newPlayerCount
        await clickedGame.save()

        if (!data) res.status(404).json({ message: 'Could not load data' });
        res.status(201).json({ clickedGame });
    } catch (e) {
        res.status(500).json({ message: 'Bad reload request' })
    }
}


const getGames = async (req, res) => {

    try {
        const user = await User.findOne({ username: req.user.username })
        if (!user) return res.status(404).json({ err: 'User not found' })

        const gameData = await Game.find({ user: user._id }).populate("user").exec();

        res.status(200).json({ gameData });
    } catch (err) {
        res.status(400).json({ err });
    }
}


module.exports = {
    getGames,
    create,
    deleteGame,
    reloadGame
};

