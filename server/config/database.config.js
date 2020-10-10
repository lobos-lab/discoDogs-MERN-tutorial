const mongoose = require('mongoose');

module.exports = (db) => {
    mongoose.connect(`mongodb://localhost/${db}` ,{
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
        .then(() => console.log(`Successfully Connected To ${db}`))
        .catch(err => console.log(err));
}

