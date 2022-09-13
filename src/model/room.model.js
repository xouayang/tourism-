const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    roomNumber: {
        type:String,
        required:true
    },
    bedAmount:{
        type:Number,
        required:true
    },
    descroom:{
        type:String,
        required:true
    },
    price:{
      type:Number,
      required:true
    },
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "hotel",
       
    },
    is_active:{
        type:Boolean,
        default:true,
        required:true
    }

},{timestamps:true})

module.exports = mongoose.model("rooms", roomSchema)