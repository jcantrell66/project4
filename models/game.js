const mongoose = require('mongoose');



const gamesSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    appid: Number,
    playerCount: Number,
    color: String,
    active: false,
    watching: false
})



module.exports = mongoose.model('Games', gamesSchema);