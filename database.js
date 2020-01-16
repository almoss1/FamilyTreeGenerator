const mongoose = require('mongoose');
const Member = require('./models/member');


mongoose.connect('mongodb://localhost:27017/famtree', { useNewUrlParser: true }, (err) => {
    if (err)
        console.error(err);
    console.log("Should be connected to database.");
});


