const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
            await mongoose.connect('mongodb://localhost:27017/cyber_database', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
module.exports = connectMongo;