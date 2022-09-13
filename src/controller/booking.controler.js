const bookingModle = require('../model/booking.model');

exports.bookingHotel = async (req, res) => {
    try {
      const {roles} = req.roles;
      if(roles == null) {
        return res.status(400).json({message:"Not found roles"})
      } else if(roles == 'user') {
        if(!req.body.hotel_id || !req.body.room_id || !req.body.check_in || !req.body.check_out|| !req.body.status_id || !req.body.payment_id) {
          return res.status(400).json({message:"the body is not emty"})  
        }
        const newData = {
          ...req.body
        }
        const booking = await bookingModle.create(newData)
        const response = {
          hotel_id:booking.hotel_id,
          room_id:booking.room_id,
          check_in:booking.check_in,
          check_out:booking.check_out,
          payment_id:booking.payment_id,
          status_id:booking.status_id
        }
        return res.status(201).json(response)  
      } else {
        return res.status(400).json({message:"Can not booking hotel"})
      }
    } 
    catch (error) {
     return res.status(500).json({message:"Server Error"})   
    }
}

// get single data booking 
exports.getSingleDataBooking = async (req, res) => {
  try {
   const {roles} = req.roles
   const {id} = req.params;
   if(roles == 'user') {
     const booking = await bookingModle.findById(id).select('-__v')
     if(!booking) {
      return res.status(400).json({message:"Not found booking data"})
     } else {
      return res.status(200).json(booking)
     }
   } else {
    return res.status(400).json(`can not access`)
   }
  } catch (error) {
    return res.status(500).json({message:`Server Error ${error}`})
  }
}

// delete booking 
exports.deleteBooking = async (req, res) => {
  try {
    const {roles} = req.roles;
    const {id} = req.params;
    if(roles == 'user') {
      const booking = await bookingModle.findByIdAndDelete(id);
      if(!booking) {
        return res.status(400).json({message:"Not found data to delete"})
      }else {
        return res.status(200).json({message:"Successed to delete data"})
      }
    } else {
      return res.status(400).json(`can access to delete`)
    }
  } catch (error) {
    return res.status(500).json({message:`Server Error ${error}`})
  }
}
// update booking 
exports.updateBooking = async (req, res) => {
  try {
    const {id} = req.params;
    const {roles} = req.roles;
    if(roles == null) {
      return res.status(400).json(`not found roles`)
    } else if(roles == 'user') {
      const booking = await bookingModle.findByIdAndUpdate({_id:id},{$set:req.body})
      if(booking) {
        return res.status(200).json(`Successed to update`)
      } else {
        return res.status(400).json(`not found data`)
      }
    } else {
      return res.status(400).json(`can not access`)
    }
  } catch (error) {
   return res.status(500).json({message:`Server Error ${error}`}) 
  }
}