const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    village:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    province:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user.model'
    },
    is_active:{
        type:Boolean,
        default:true,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('address', addressSchema)