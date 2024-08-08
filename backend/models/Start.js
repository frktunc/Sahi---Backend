const mongoose = require('mongoose');
const Schema = mongoose.Schema

const startSchema = new Schema({
    startCommand: {
        value: Number,
    },
   
})



const Start = mongoose.model('Start', startSchema)

module.exports = Start


// const mongoose = require('mongoose');

// const StartSchema = new mongoose.Schema({
//     value: Number,
//     timestamp: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Start', StartSchema);
