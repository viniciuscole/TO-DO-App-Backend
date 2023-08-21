const mongoose = require('mongoose');
const TaskSchema = require('./Task');
const ListSchema = new mongoose.Schema({
    list : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    tasks : [TaskSchema]
});

module.exports = mongoose.model('List', ListSchema);