const statusModel = require("../model/status.model");

exports.createStatus = async (req, res) => {
  try {
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`not found roles`);
    } else if (roles == "user" || roles == "hotel" || roles == "reviewer") {
      if (!req.body.name_la || !req.body.name_en) {
        return res.status(400).json({ text: "the body colud not emty" });
      }
      const newData = {
        ...req.body,
      };
      const status = await statusModel.create(newData);
      const response = {
        name_la: status.name_la,
        name_en: status.name_en,
      };
      return res.status(201).json(response);
    } else {
      return res.status(400).json(`can not access data`);
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// get singel status
exports.getSingleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Not found roles`);
    } else if (roles == "user") {
      const status = await statusModel.findById({ _id: id, roles: 'user' });
      if (!status) {
        return res.status(400).json(`can not found data`);
      } else {
        return res.status(200).json(status);
      }
    } else if (roles == "hotel" || roles == "reviewer") {
      return res.status(400).json(`not found user`);
    } else {
      return res.status(400).json(`Can not access`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};
