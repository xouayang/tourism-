const roomModel = require("../model/room.model");
exports.createRoom = async (req, res) => {
  try {
    const { roles } = req.roles;
    if (roles == "hotel") {
      if (
        !req.body.roomNumber ||
        !req.body.bedAmount ||
        !req.body.descroom ||
        !req.body.price
      ) {
        return res.status(400).json({ message: "the body is not emty" });
      }
      const newData = {
        ...req.body,
      };
      const room = await roomModel.create(newData);
      const response = {
        roomAmout: room.roomNumber,
        bedAmount: room.bedAmount,
        descroom: room.descroom,
        price: room.price,
        hotelId: room.hotelId,
      };
      return res.status(201).json(response);
    } else {
      return res.status(400).json({ message: "Can not add room" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// get data room
exports.getAllRoom = async (req, res) => {
  try {
    const room = await roomModel.find({}).select("-__v");
    if (!room) {
      return res.status(400).json({ message: "Not found data in room" });
    } else {
      return res.status(200).json(room);
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// get singel room
exports.getSingleRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await roomModel.findById(id).select("-__v");
    if (room) {
      return res.status(200).json(room);
    } else {
      return res.status(400).json({ message: "not found data id in room" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// update room
exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json({ message: "Not found roles" });
    } else if (roles == "hotel") {
      const room = await roomModel.findByIdAndUpdate(
        { _id: id },
        { $set: req.body }
      );
      if (!room) {
        return res.status(400).json("Not found data and can not updat data");
      } else {
        return res.status(201).json({ message: "Successed to update " });
      }
    } else {
      return res.status(400).json({ message: "can not update data" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// delete room
exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json({ message: "Can not found roles" });
    } else if (roles == "hotel") {
      const room = await roomModel.findByIdAndDelete(id);
      if (!room) {
        return res.status(400).json({ message: "Can not found room" });
      } else {
        return res.status(400).json({ message: "Suucessed delete room" });
      }
    } else {
      return res.status(400).json({ message: "Can not delete room" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
