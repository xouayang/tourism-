const mongoose = require('mongoose');
const statusSchema = new mongoose.Schema({
    name_la:{
        type:String,
        require:true
    },
    name_en:{
        type:String,
        require:true
    },
    is_active:{
        type:Boolean,
        default:true,
        required:true
    }
   
},{timestamps:true});

module.exports = mongoose.model('status', statusSchema)