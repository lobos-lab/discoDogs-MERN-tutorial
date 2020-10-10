const mongoose = require ('mongoose');

const DanceMove = new mongoose.Schema({

    move:{
        type: String,
        minlength:[4, "not descriptive enough..."]
    },

    skillLevel:{
        type: Number,
        required: true,
        min: 1,
        max: 10
    }
})

module.exports = DanceMove;