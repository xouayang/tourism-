const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    totalPayment:{
        type:String,
        required:true,
    },
    des:{
        type:String,
        required:true
    },
    booking_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'booking.model',
        required:true
    },
    is_active:{
        type:Boolean,
        default:true
    }

},{timestamps:true})
module.exports = mongoose.model("payment",paymentSchema)