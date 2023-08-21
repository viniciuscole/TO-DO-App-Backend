const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    task : {
        type: String,
        required: true
    },
    isCompleted : {
        type: Boolean,
        required: true,
        default: false
    },
    date : {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('Task', TaskSchema);

