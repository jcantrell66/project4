const History = require('../models/history');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr
const axios = require('axios');
// now s3 can crud on our s3 buckets



const create = async (req, res) => {
    // console.log(req.body, '<= req.body', req.method, '<= req.method', req.headers, '<= req.headers')
    try {
        let allGames = await axios.get(`http://api.steampowered.com/ISteamApps/GetAppList/v0002`)
        let gameArray = allGames.data.applist.apps
        let appid = gameArray.find(element => element.name === req.body.data)
        console.log(appid.appid, '<= game id')
        let data = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=${appid.appid}`);
        // console.log(data, '<= game stats')
        let playerCount = data.data.response.player_count;
        console.log(playerCount, '<= game player count')
        let gameData = {
            name: appid.name,
            playerCount: playerCount,
            appId: appid.appid
        }
        if (!data) res.status(404).json({ message: 'Could not load data' });
        res.status(201).json({gameData});
    } catch (e) {
        res.status(500).json({ message: 'Bad Request' })
    }
}




const getAPI = async (req, res) => {
    console.log(req.params, '<= req.params', req.method, '<= req.method', req.headers, '<= req.headers')
    try {
        let data = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=1599340`);
        let playerCount = data.data.response.player_count;
        console.log(playerCount, '<= player count in get Api')
        if (!data) res.status(404).send({ message: 'Could not load data' });
        res.status(201).json({playerCount});
    } catch (e) {
        res.status(500).send({ message: 'Bad Request' })
    }
};


module.exports = {
    getAPI,
    create
};

