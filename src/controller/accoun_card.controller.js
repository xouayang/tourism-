const accountCardModel = require("../model/account_card.model");

exports.createAccount = async (req, res) => {
  try {
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`not found roles`);
    } else if (roles == "hotel" || roles == "user" || roles == "reviewer") {
      if (
        !req.body.bankName ||
        !req.body.accountID ||
        !req.body.accountName ||
        !req.body.cvv ||
        !req.body.expiryDate ||
        !req.body.qrcode
      ) {
        return res.status(400).json({ message: "the body is not emty" });
      }
      const newData = {
        ...req.body,
      };
      const account = await accountCardModel.create(newData);
      const response = {
        bankName: account.bankName,
        accountID: account.accountID,
        accountName: account.accountName,
        cvv: account.cvv,
        expiryDate: account.expiryDate,
        qrcode: account.qrcode,
        user_id: account.user_id,
      };
      return res.status(201).json(response);
    } else {
      return res.status(400).json(`Can not access `);
    }
  } catch (error) {
    console.log({ message: error.message });
    return res.status(500).json({ message: "Server Error" });
  }
};
// get all account
exports.getAllAccount = async (req, res) => {
  try {
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`not found roles`);
    } else if (roles == "hotel" || roles == "user" || roles == "reviewer") {
      const account = await accountCardModel.find({}).select("-__v");
      if (account == null) {
        return res.status(400).json(`Not found data`);
      } else {
        return res.status(200).json(account);
      }
    } else {
      return res.status(400).json(`can not access data`);
    }
  } catch (error) {
    return res.status(200).json({ message: `Server Error` });
  }
};
// get single data
exports.getSingleAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`not found roles`);
    } else if (roles == "hotel" || roles == "user" || roles == "reviewer") {
      const account = await accountCardModel.findById(id);
      if (!account) {
        return res.status(400).json(`not found data`);
      } else {
        return res.status(200).json(account);
      }
    } else {
      return res.status(400).json(`can not access data`);
    }
  } catch (error) {
    return res.status(500).json(`Server Error`);
  }
};
// update account
exports.updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`not found roles`);
    } else if (roles == "hotel" || roles == "user" || roles == "reviewer") {
      const account = await accountCardModel.findByIdAndUpdate(
        { _id: id },
        { $set: req.body }
      );
      if (!account) {
        return res.status(400).json(`not found data`);
      } else {
        return res.status(200).json(`Successed to update`);
      }
    } else {
      return res.status(400).json(`can not access`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};
// delete account
exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`not found roles`);
    } else if (roles == "hotel" || roles == "user" || roles == "reviewer") {
      const account = await accountCardModel.findByIdAndDelete(id);
      if (!account) {
        return res.status(400).json(`not found data`);
      } else {
        return res.status(200).json(`Successed to delete`);
      }
    } else {
      return res.status(400).json(`can not access`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` })
  }
}
