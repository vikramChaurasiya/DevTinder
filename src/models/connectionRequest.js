const mongoose = require('mongoose');
const { stripLow } = require('validator');
const { create } = require('./user');

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        toUserId:{
            type :mongoose.Schema.Types.ObjectId,
            required:true,
        },
        status: {
            type: String,
            required:true,
            enum:{
                values:["ignored", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type`
            }
        }
    },
    {
        timestamps: true,
    }
);

// connectionRequest.find({fromUserId:3456789865432, toUserId:23409876543});
// creating index
connectionRequestSchema.index({fromUserId:1,toUserId:1});

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    // check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connection request to yourself! ");
    }
    next();
})

const ConmectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConmectionRequestModel;















