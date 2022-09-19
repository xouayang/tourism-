const hotelModel = require("../model/hotel.model");
const { _Response } = require("../middleware/response");
const { _Code, _Status } = require("../middleware/status");
const { success } = require("../middleware/message");
exports.createHotel = async (req, res) => {
  try {
    if (!req.body.hotelName || !req.body.phone || !req.body.email) {
      return res.status(400).json({ message: "the body is not emty" });
    }
    const newData = {
      ...req.body,
    };
    const hotel = await hotelModel.create(newData);
    const response = {
      user_id: hotel.user, // user_id
      hotelName: hotel.hotelName,
      phone: hotel.phone,
      email: hotel.email,
      hotelProfile: hotel.hotelProfile,
      address_id: hotel.address, // address_id
      accound_card_id: hotel.account_card, // account_card_id
    };
    return res.status(201).json(response);
  } catch (error) {
    console.log({ message: error.message });
    return res.status(500).json({ message: "Server Error" });
  }
};
// get data hotel to show
exports.getDataHotel = async (req, res) => {
  try {
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`not found roles`);
    } else if (roles == hotel || roles == "admin") {
      const hotel = await hotelModel.find({}).populate({
        path: "user",
        model: "user.model",
        select: "-__v -password",
      });
      if (!data) {
        return res.status(400).json("not found");
      } else {
        return res.status(200).json(hotel);
      }
    } else if (roles == "user" || roles == "reviewer") {
      return res.status(400).json(`Can not found roles`);
    } else {
      return res.status(400).json(`Can not access data`);
    }
  } catch (error) {
    console.log({ message: error.message });
    return res.status(500).json({ message: "Data is not found" });
  }
};
// get single data
exports.getSingleData = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`not found roles`);
    } else if (roles == "hotel" || roles == "admin") {
      const hotel = await hotelModel.findById(id);
      if (!hotel) {
        return res.status(400).json(`not found data`);
      } else {
        return res.status(200).json(hotel);
      }
    } else if (roles == "user" || roles == "reviewer") {
      return res.status(400).json(`can not access data`);
    } else {
      return res.status;
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// update hotel
exports.updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json("not found roles");
    } else if (roles == "hotel" || roles == "admin") {
      const hotel = await hotelModel.findByIdAndUpdate(
        { _id: id },
        { $set: req.body }
      );
      if (!hotel) {
        return res.status(400).json({ message: "not found data to update" });
      } else {
        return res.status(200).json("Successed to Update");
      }
    } else {
      return res.status(400).json({ message: "Can not update data" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// delete data hotel
exports.deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json({ message: "Can not found roles" });
    } else if (roles == "hotel" || roles == "admin") {
      const hotel = await hotelModel.findByIdAndDelete(id);
      if (!hotel) {
        return res.status(400).json({ message: "not found data" });
      } else {
        return res.status(200).json({ text: "Successed to delete" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// update status
exports.updateStatusHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`not found roles`);
    } else if (roles == "admin") {
      const hotel = await hotelModel.findByIdAndUpdate(
        { _id: id },
        { $set: req.body.status }
      );
      if (!hotel) {
        return res.status(400).json(`not found data to update`);
      } else {
        return res.status(200).json(`Successed to update`);
      }
    } else {
      return res.status(400).json(`Can not access data`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};
