const userModel = require("../model/user.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  EXPIRESIN = '7d' // setimer for token
// api SignUp(Register User)
exports.SignUp = async (req, res) => {
  try {
    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
      return res.status(400).json({text:"The body is not emty"})
    }
    const checking = await userModel.findOne({email:req.body.email});
    if(checking) {
      return res.status(200).json({text1:"Email Already Exist"})
      
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const newData = {
        ...req.body,
        password:hashPassword
      }
      const user = await userModel.create(newData);
      const asignToken = await jwt.sign({
        id:user._id, roles:user.roles,
        expiresIn: EXPIRESIN
      },process.env.TOKEN_SECRET);
      const returnUser = {
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        token : asignToken
      }
      return res.status(201).json(returnUser)
    }  
  } catch (error) {
     return res.status(500).json({message:'Server Error'}); 
  }
};

// api SignIn (Login User)
exports.SignIn = async (req, res) => {
    try {
     if(!req.body.email || !req.body.password) {
       return res.status(400).json({title:"email and password could not emty"}) 
     }
     const user = await userModel.findOne({email:req.body.email});
     if(!user) {
        return res.status(404).json({text2:"user could not found"})
     } else {
      const validationPasswrod = await bcrypt.compare(req.body.password,user.password);
    if(!validationPasswrod) {
      return res.status(400).json("Password is Incorrect")  
    }else{
      const signinToken = await jwt.sign({
        id:user._id,roles:user.roles,
        expiresIn: EXPIRESIN
      },process.env.TOKEN_SECRET)
      const data = {
        email:user.email,
        roles:user.roles,
        token:signinToken
       }
       return res.status(200).json({Sign_In_Email_Successed : data})
    }  
     }
          
    } catch (error) {
     return res.status(500).json({message:'Server Error'})   
    }
}

// get single user
exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {roles} = req.roles;
    if(roles == null) {
      return res.status(400).json(`not found roles`)
    } else if(roles == 'hotel' ||roles == 'user' || roles == 'reviewer') {
      const user = await userModel.findById(id).select('-__v -password');
      if(!user) {
        return res.status(400).json({text:"Not found user id"})
      } else {
        return res.status(200).json(user)
      }
    } else {
      return res.status(400).json(`can not access`)
    }
  } catch (error) {
   return res.status(500).json({message:"Server Error"}) 
  }
}
// get all user 
exports.getAllUser = async (req, res) => {
  try {
   const {roles} = req.roles;
   let users;
   if(roles == null) {
    return res.status(400).json(`not found roles`)
   } else if(roles == 'hotel') {
    users = await userModel.find({roles:'hotel'}).select('-password -__v')
   } else if(roles == 'user') {
    users = await userModel.find({roles:'user'}).select('-password -__v')
   } else if(roles == 'reviewer') {
    users = await userModel.find({roles:'reviewer'}).select('-password -__v')
   } else {
    return res.status(400).json(`can not access`)
   }
   return res.status(200).json(users)
  } catch (error) {
    console.log({messasge:error.message})
   return res.status(500).json({message:"Server Error"})  
  }
}

// update user
exports.updateUser = async (req, res) => {
  try {
    const {id} = req.params;
    const {roles} = req.roles;
    if(roles == null) {
      return res.status(400).json(`can not roles`)
    } else if(roles == 'user') {
      const user = await userModel.findByIdAndUpdate({_id:id},{$set:req.body})
      if(!user) {
        return res.status(400).json(`not found data`)
      } else {
        return res.status(200).json(`Successed to update`)
      }
    } else {
      return res.status(400).json(`can not access`)
    }
  } catch (error) {
   return res.status(500).json({message:`Server Error ${error}`}) 
  }
}

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const {id} =  req.params;
    const {roles} = req.roles;
    if(roles == null) {
      return res.status(400).json(`can not roles`)
    } else if(roles == 'user') {
      const user = await userModel.findByIdAndDelete(id);
      if(!user) {
        return res.status(400).json(`not found data to delete`)
      } else {
        return res.status(400).json(`Successed to delete`)
      }
    } else {
      return res.status(400).json(`can not access`)
    }
  } catch (error) {
    return res.status(500).json({message:error.message}) 
  }
}

// forgot password 
exports.forgotPassword = async (req, res) => {
  try {
   const {id} = req.params;
   const {roles} = req.roles;
   const forgotPassword = await userModel.findOne({_id:id},{set:req.body.password}) 
  } catch (error) {
    return res.status(500).json({message:`Server error ${error}`})
  }
}