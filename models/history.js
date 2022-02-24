const mongoose = require('mongoose');

// const watchingSchema = mongoose.Schema({

//   username: String,
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// })

const gamesSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    appid: Number,
    playerCount: Number,
    active: false,
    watching: false
})

const HistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    games: [gamesSchema]
    // watching: [watchingSchema] // < one post has many likes
  })
 

module.exports = mongoose.model('Games', gamesSchema);