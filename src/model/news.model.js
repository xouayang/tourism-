const mongoose = require('mongoose');
const newSchema = new mongoose.Schema({
    titleNews:{
        type:String,
        required:true
    },
    desNews : {
        type:String,
        required:true
    },
    imageNews: {
        type:String,
        required:true
    },
    is_active:{
        type:Boolean,
        default:true,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('news', newSchema)