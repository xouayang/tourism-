const mongoose = require('mongoose');
const invoiceSchema = new mongoose.Schema({
    total_invoice:{
        type:String,
        required:true
    },
    payment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'payment.model',
        required:true
    },
    is_active:{
        type:Boolean,
        default:true
    }

},{timestamps:true})
module.exports = mongoose.model('invoice',invoiceSchema)