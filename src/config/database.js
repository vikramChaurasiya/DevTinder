const mongoose = require('mongoose')
const DB_URI = 'mongodb+srv://vikramkrchaurasiya:vikram7654@namastedev.jecfp.mongodb.net/devTinder'
const dbConnection = async() => {
    await mongoose.connect(DB_URI);
    
}

module.exports = {
    dbConnection
}
