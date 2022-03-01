const Game = require('../models/game');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr
const axios = require('axios');
// now s3 can crud on our s3 buckets



const create = async (req, res) => {
    // console.log(req.body, '<= req.body', req.user, '<= req.user')
    try {
        const replaced = req.body.data.replace(/[^a-z0-9]/gi, '').toLowerCase();
        console.log(replaced, '<= new string from reg exp');
        let allGames = await axios.get(`http://api.steampowered.com/ISteamApps/GetAppList/v0002`)
        let gameArray = allGames.data.applist.apps

        // trying it with reg exp
        let appid = gameArray.find(element => element.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === req.body.data.replace(/[^a-z0-9]/gi, '').toLowerCase())


        console.log(appid.appid, '<= game id')
        let data = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=${appid.appid}`);
        // console.log(data, '<= game stats')
        let playerCount = data.data.response.player_count;
        console.log(playerCount, '<= game player count')
        console.log(req.user._id, '<= req.user._id')
        let gameData = await Game.create({
            user: req.user,
            name: appid.name,
            appid: appid.appid,
            playerCount: playerCount,
            color: 'grey',
            active: true
        })
        // console.log(gameData, '<= gameData before populate')
        // gameData = await gameData.populate('user')
        // console.log(gameData, '<= gameData after populate')
        if (!data) res.status(404).json({ message: 'Could not load data' });
        res.status(201).json({ gameData });
    } catch (e) {
        res.status(500).json({ message: 'Bad Request' })
    }
}

const deleteGame = async (req, res) => {
    console.log(req.params.id, '<= req.params.id')
    try {
        const game = await Game.findOne({ '_id': req.params.id });
        console.log(game, '<= game to be removed')
        game.remove(req.params.id) // mutating a document
        console.log(post, " <-= post in delete!")
        // req.params.id is the like id 
        await game.save() // after you mutate a document you must save
        res.json({ data: 'game removed' })
    } catch (err) {
        res.status(400).json({ err })
    }
}

const reloadGame = async (req, res) => {
    try {
        // console.log(req.params.id, req.body.playerCount, req.body.id, '<= req.params.id in reloadGame')
        let appid = req.params.id
        let data = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=${appid}`);
        let newPlayerCount = data.data.response.player_count;
        console.log(newPlayerCount, '<= new player count')

        let countColor = newPlayerCount > req.body.playerCount ? 'green' : 'red'
        if (req.body.playerCount === newPlayerCount) {
            countColor = 'grey'
        }
        // console.log(countColor, '<= countColor')


        const clickedGame = await Game.findById(req.body.id)
        // console.log(clickedGame, '<= game to change')
        clickedGame.color = countColor
        clickedGame.playerCount = newPlayerCount
        await clickedGame.save()
        console.log(clickedGame, '<= clicked game after color change')
        if (!data) res.status(404).json({ message: 'Could not load data' });
        res.status(201).json({ clickedGame });
    } catch (e) {
        res.status(500).json({ message: 'Bad reload request' })
    }
}


const getGames = async (req, res) => {
    // console.log(req.user.username, '<= req.user.username')
    try {
        const user = await User.findOne({ username: req.user.username })
        if (!user) return res.status(404).json({ err: 'User not found' })

        const gameData = await Game.find({ user: user._id }).populate("user").exec();
        // console.log(gameData, '<= gameData in getGames')
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

