const mongoose = require('mongoose');
const validator = require('validator')
const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required:true,
            minLength: 4,
            maxLength: 150,
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
            validator(value){
                if(!validator.isEmail(value)){
                    throw new Error("invalid email address:" + value)
                }
            },
        }, 
        password:{
            type: String,
            required:true,
            validator(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Enter a strong password:" + value)
                }
            },
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
            default: "https://dummyphotos.png",
            validator(value){
                if(!validator.isURL(value)){
                    throw new Error("Enter a valid url:" + value)
                }
            },
        },
        about: {
            type: String,
            default: "this is a default about of the user"
        },
        skills: {
            type: [String]
        }
    },
    {
        timestamps: true, //this is use for when is create , update timing show
    }
); 

module.exports = mongoose.model("User" , userSchema);