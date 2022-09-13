const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user.model',
        required:true
    },
    hotelName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        requiree:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    hotelProfile:{
        type:String,
        required:true
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'address.model',
        required:true
    },
    account_card:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'account_card.model',
    },
    is_active:{
        type:Boolean,
        default:true,
    },
    status:{
        type:Boolean,
        default:false
    }


},{timestamps:true})

module.exports = mongoose.model('hotel', hotelSchema)