const mongoose = require('mongoose');
const reviewerSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user.model',
        required:true
    },
    youtuber:{
        type:String,
        required:true
    },
    tiktoker:{
        type:String,
        required:true
    },
    page:{
        type:String,
        required:true
    },
    account_card_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'account_card.model',
        required:true
    },
    status:{
      type:Boolean,
      default:false
    },
    is_active:{
        type:Boolean,
        default:true,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('reviewers', reviewerSchema)