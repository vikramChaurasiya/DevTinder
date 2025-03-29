const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLength: 4,
        maxLength: 50,
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required:true,
        lowercase:true,
        unique:true,
        trim: true, 
    }, 
    password:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        min: 18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type:String,
    },
    about: {
        type: String,
        default: "this is a default about of the user"
    },
    skills: {
        type: [String]
    }

});

module.exports = mongoose.model("User" , userSchema);