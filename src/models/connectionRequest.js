const mongoose = require('mongoose');
const { stripLow } = require('validator');

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
                values:["ignored", "interested", "accepeted", "rejected"],
                message: `{VALUE} is incorrect status type`
            }
        }
    },
    {
        timestamps: true,
    }
);

const ConmectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConmectionRequestModel;















