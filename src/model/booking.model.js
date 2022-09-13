const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user.model',
    required:true
  },
  hotel_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'hotel.model',
    required:true
  },
  room_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'room.model',
    required:true
  },
  check_in:{
    type:Date,
    required:true
  },
  check_out:{
    type:Date,
    required:true
  },
  payment_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"payment.model",
    required:true
  },
  status_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'status.model',
    required:true
  },
  is_active:{
    type:Boolean,
    default:true,
    required:true
  }
},{timestamps:true})

module.exports = mongoose.model('booking',bookingSchema)