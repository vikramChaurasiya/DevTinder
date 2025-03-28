const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required:true,
    },
    passward:{
        type: String,
        required:true
    },
    age:{
        type: Number
    },
    gender:{
        type:String
    }

});

module.exports = mongoose.model("User" , userSchema);