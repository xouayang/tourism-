const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    like:{
        type:Number,
        required:true
    },
    share:{
        type:Number,
        required:true
    },
    Amountview:{
        type:Number,
        required:true
    },
    review_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'reviewer.model',
        required:true
    },
    is_active:{
        type:Boolean,
        default:true,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model("contents",contentSchema)