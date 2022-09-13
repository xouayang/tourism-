const mongoose = require('mongoose');
const placeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    des:{
        type:String,
        required:true
    },
    imagePlace:{
        type:Array,
        required:true
    },
    address_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'address.model',
        required:true
    },
    is_active:{
        type:Boolean,
        default:true,
        required:true
    }
},{timestamps:true});
module.exports = mongoose.model('place', placeSchema)