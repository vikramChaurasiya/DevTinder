const mongoose = require('mongoose')
const DB_URI = 'mongodb+srv://vikramkrchaurasiya:vikr****@namastedev.jecfp.mongodb.net/devTinder'

const dbConnection = async() => {
    await mongoose.connect(DB_URI);
    
}

module.exports = {
    dbConnection
}
