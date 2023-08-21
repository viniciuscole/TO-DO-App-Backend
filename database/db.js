const mongoose = require('mongoose');
const connectTODB = async () => {
    try {
        await mongoose.connect('mongodb+srv://viniamorim87:passamani7878s@cluster0.3rsm5qk.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB: ' + error);
    }
}
module.exports = connectTODB;