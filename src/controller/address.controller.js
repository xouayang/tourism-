const addressModel = require("../model/address.model");
exports.createAddress = async (req, res) => {
  try {
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json({ text: "Not found user" });
    } else if (roles == "user" || roles == "hotel" || roles == "reviewer") {
      if (
        !req.body.village ||
        !req.body.district ||
        !req.body.province ||
        !req.body.location
      ) {
        return res.status(400).json({ message: "the body is not emty" });
      }
      const newData = {
        ...req.body,
      };
      const address = await addressModel.create(newData);
      const response = {
        village: address.village,
        district: address.district,
        province: address.province,
        location: address.location,
        user_id: address.user_id,
      };
      return res.status(201).json(response);
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// get singel address
exports.getSingleAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Not found roles`);
    } else if (roles == "hotel" || roles == "user" || roles == "reviewer") {
      const address = await addressModel.findById(id).select("-__v");
      if (!address) {
        return res.status(400).json({ message: "Data is not found" });
      } else {
        return res.status(200).json(address);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};

// update address
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Not found roles`);
    } else if (roles == "hotel" || roles == "user" || roles == "reviewer") {
      const address = await addressModel.findByIdAndUpdate(
        { _id: id },
        { $set: req.body }
      );
      if (!address) {
        return res.status(400).json({ message: `Not Found Data to update` });
      } else {
        return res.status(200).json(`Successed to Update`);
      }
    } else {
      return res.status(400).json(`Can not update data`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};

// delete address
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Not found roles`);
    } else if (roles == "hotel" || roles == "user" || roles == "reviewer") {
      const address = await addressModel.findByIdAndDelete(id);
      if (!address) {
        return res.status(400).json(`Not found data to delete`);
      } else {
        return res.status(200).json(`Suucessed to delete`);
      }
    } else {
      return res.status(400).json(`Can not delete data`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};
