const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discord_id: {
        type: String,
        required: true,
        min: 17,
        max: 19
    },
    email:{
        type: String,
        required: true,
        max:255,
        min:6
    },
    date: {
        type: Date,
        default: Date.now
    },
    key: {
        type: String,
    }
});


module.exports = mongoose.model('User', userSchema);