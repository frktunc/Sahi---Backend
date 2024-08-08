const mongoose = require('mongoose');
const Schema = mongoose.Schema

const startSchema = new Schema({
    startCommand: {
        value: Number,
    },
   
})



const Start = mongoose.model('Start', startSchema)

module.exports = Start

