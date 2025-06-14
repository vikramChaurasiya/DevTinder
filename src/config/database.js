require('dotenv').config();
const mongoose = require('mongoose');

const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const dbConnection = async () => {
    
    await mongoose.connect(DB_URI);
};

module.exports = {
    dbConnection
};

