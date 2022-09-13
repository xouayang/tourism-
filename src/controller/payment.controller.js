const paymentModel = require("../model/payment.model");
exports.createPayment = async (req, res) => {
  try {
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Not found roles`);
    } else if (roles == "user") {
      if (!req.body.totalPayment || !req.body.des || !req.body.booking_id) {
        return res.status(400).json({ text: "the body is could not emty" });
      }
      const newData = {
        ...req.body,
      };
      const payment = await paymentModel.create(newData);
      const response = {
        totalPayment: payment.totalPayment,
        des: payment.des,
        booking_id: payment.booking_id,
      };
      return res.status(201).json(response);
    } else if (roles == "hotel" || roles == "reviewer") {
      return res.status(400).json(`can not found roles to access`);
    } else {
      return res.status(400).json(`can not access`);
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// get single payment
exports.getSinglePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Not found roles`);
    } else if (roles == "user") {
      const payment = await paymentModel.findById(id);
      if (payment == null) {
        return res.status(40).json(`not found data`);
      } else {
        return res.status(200).json(payment);
      }
    } else {
      return res.status(400).json(`Can not access`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server error ${error}` });
  }
};
// delete payment

exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`not found roles`);
    } else if (roles == "user") {
      const payment = await paymentModel.findOneAndUpdate(
        { id: id, roles: "user" },
        { $set: req.body }
      );
      if (!payment) {
        return res.status(400).json(`not found data`);
      } else {
        return res.status(200).json(`Successed`);
      }
    } else if (roles == "hotel") {
      const payment = await paymentModel.findOneAndUpdate(
        { _id: id, roles: "hotel" },
        { $set: req.body }
      );
      if (!payment) {
        return res.status(400).json(`not found data`);
      } else {
        return res.status(200).json(`Successed`);
      }
    } else if (roles == "reviewer") {
      const payment = await paymentModel.findByIdAndUpdate({
        _id: id,
        roles: "reviewer",
      });
      if (!payment) {
        return res.status(400).json(`not found data`);
      } else {
        return res.status(200).json(`Successed`);
      }
    } else {
      return res.status(400).json(`can not found data`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};
// delete payment
exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`not found roles`);
    } else if (roles == "hotel") {
      const payment = await paymentModel.findByIdAndDelete({
        _id: id,
        roles: "hotel",
      });
      if (!payment) {
        return res.status(400).json(`Not found data `);
      } else {
        return res.status(400).json(`Successed`);
      }
    } else if (roles == "user") {
      const payment = await paymentModel.findByIdAndDelete({
        _id: id,
        roles: "user",
      });
      if (payment == null) {
        return res.status(400).json(`not found data`);
      } else {
        return res.status(200).json(`Successed`);
      }
    } else if (roles == "reviewer") {
      const payment = await paymentModel.findByIdAndDelete({
        _id: id,
        roles: "reviewer",
      });
      if (!payment) {
        return res.status(400).json(`not found data`);
      } else {
        return res.status(200).json(`Successed `);
      }
    } else {
      return res.status(400).json(`can not access`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
}

