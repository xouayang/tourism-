const mongoose = require('mongoose');
const accountCardSchema = new mongoose.Schema({
    bankName:{
        type:String,
        require:true,
    },
    accountID:{
        type:String,
        required:true,
    },
    accountName:{
        type:String,
        required:true
    },
    cvv: {
       type:Number,
       required:true
    },
    expiryDate:{
        type:Date,
        required:true
    },
    qrcode:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user.model',
        require:true
    },
    is_active:{
        type:Boolean,
        default:true,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('account_card', accountCardSchema)