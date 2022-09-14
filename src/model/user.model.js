const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
    },
    is_active:{
        type:Boolean,
        default:true
    },
    roles:{
        type:String,
        enum: ["user","hotel","reviewer","admin"],
        default: "user"
    }
    
},{timestamps:true})

module.exports = mongoose.model('users',userSchema)
