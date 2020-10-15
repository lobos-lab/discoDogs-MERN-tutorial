const mongoose = require ('mongoose');
    DanceMove = require('./dance.model')

const DiscoDog = new mongoose.Schema(
    {
    name:{
        type: String,
        required:[true, "A dog must have a name"]
    },

    breed:{  
        type: String,
        required: [true, "The dog's breed is required"],
        minlength:[3, "Breed must be at least 3 characters in length"]
    }, 

    age:{
        type: Number,
        required:[true, "A dog must have an age"],
        min:[1, "A dog must be at least 1 to get into the disco"]
    },

    moves:[DanceMove],
}, 

{timestamps:true})

module.exports = DiscoDog;


