const placeModel = require('../model/place.model')

exports.createPlace = async (req, res) => {
    try {
       const {roles} = req.roles;
       if(roles == null) {
        return res.status(400).json(`Not found roles`)
       } else if(roles == 'hotel') {
        if(!req.body.name || !req.body.des || !req.body.imagePlace) {
            return res.status(400).json({text:"the body is not emty"})
           } 
           const newData = {
            ...req.body
           }
           const place = await placeModel.create(newData);
           const returnPlace = {
            name:place.name,
            des:place.des,
            imagePlace:place.imagePlace,
            address_id : place.address_id
           }
           return res.status(201).json(returnPlace)
       } else if(roles == 'user' || roles == 'reviewer') {
        return res.status(400).json(`the roles is invailid`)
       } else {
        return res.status(400).json(`can not access `)
       }       
    } catch (error) {
     return res.status(500).json({message:"Server Error"})    
    }
}
// get all place 
exports.getAllPlace = async (req, res) => {
    try {
       const place = await placeModel.find({}).select('-__v');
       if(!place) {
        return res.status(400).json('Not found data')
       } else {
        return res.status(200).json(place)
       } 
    } catch (error) {
     return res.status(500).json({message:`Server Error ${error}`})   
    }
}
// get single id data
exports.getSinglePlace = async (req, res) => {
    try {
        const {id} = req.params;
        const {roles} = req.roles;
        if(roles == null) {
            return res.status(400).json(`Not found roles`)
        } else if(roles == 'hotel'){
            const place = await placeModel.findById(id).select('-__v');
            if(!place) {
                return res.status(400).json('Not found data')
            } else {
                return res.status(200).json(place)
            }
        } else if(roles == 'user' || roles == 'reviewer') {
            return res.status(400).json('the roles is invailid')
        } else {
            return res.status(400).json('Can accesse')
        }
        
    } catch (error) {
    return res.status(500).json({message:`Server error ${error}`})    
    }
}
// update place
exports.updatePlace = async (req, res) => {
  try {
    const {id} = req.params
    const {roles} = req.roles
    if(roles == null) {
        return res.status(400).json('Not found roles')
    } else if(roles == 'hotel') {
        const place = await placeModel.findByIdAndUpdate({_id:id},{$set:req.body})
        if(place == null) {
            return res.status(400).json('Not found data')
        } else {
            return res.status(200).json(`Successed to update`)
        }
    } else if(roles == 'user' || roles == 'reviewer') {
        return res.status(400).json('the roles is invailid')
    } else {
        return res.status(400).json(`Can not access`)
    }
  } catch (error) {
    return res.status(500).json({message:`Server error ${error}`})
  }  
}

// delete place
exports.deletePlace = async (req, res) => {
    try {
      const {id} = req.params;
      const {roles} = req.roles;  
      if(roles == null) {
        return res.status(400).json(`Not Found roles`)
      } else if(roles == 'hotel') {
        const place = await placeModel.findByIdAndDelete(id);
        if(!place) {
            return res.status(400).json(`Not Found data`)
        } else {
            return res.status(200).json(`Successed to delete`)
        }
      } else if(roles == 'user' || roles == 'reviewer') {
        return res.status(400).json(`the roles is invailid`)
      } else {
        return res.status(400).json(`can not access`)
      }
    } catch (error) {
     return res.status(500).json({message:`Server Error ${error}`})   
    }
}