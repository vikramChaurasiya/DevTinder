const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required:true,
            minLength: 2,
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
            enum: {
                values: ["male" , "female", "otheer"],
                message: `{VALUE} Gender data is not valid`, //this is same as else statement. 
            },
            // validate(value){
            //     if(!["male","female","other"].includes(value)){
            //         throw new Error("Gender data is not valid")
            //     }
            // }
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

userSchema.methods.getJWT = async function(){
    const user = this;
    const tokenPassword = "DEV@Tinder$754";
    const token = await jwt.sign({_id: user._id}, tokenPassword , {expiresIn: "7d"});
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user =  this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser , passwordHash);
    return isPasswordValid;
}

module.exports = mongoose.model("User" , userSchema);