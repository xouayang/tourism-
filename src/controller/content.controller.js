const contentModel = require("../model/content.model");
exports.createContent = async (req, res) => {
  try {
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Not Found Roles`);
    } else if (roles == "reviewer") {
      if (
        !req.body.title ||
        !req.body.des ||
        !req.body.like ||
        !req.body.share ||
        !req.body.Amountview
      ) {
        return res.status(400).json({ text: "the body is not emty" });
      } else {
        const newData = {
          ...req.body,
        };
        const content = await contentModel.create(newData);
        const response = {
          title: content.title,
          des: content.des,
          like: content.like,
          share: content.share,
          Amountview: content.Amountview,
          review_id: content.review_id,
        };
        return res.status(201).json(response);
      }
    } else if (roles == "hotel" || roles == "user") {
      return res.status(400).json(`The roles is invailid`);
    } else {
      return res.status(400).json(`Can no access data`);
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// get all conent to show
exports.getContent = async (req, res) => {
  try {
    const content = await contentModel.find({}).select('-__v');
    if (!content) {
      return res.status(400).json("Not found data");
    } else {
      return res.status(200).json(content);
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// get single content to show
exports.getSingleContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Not Found Roles`);
    } else if (roles == "reviewer") {
      const content = await contentModel.findById(id).select("-__v");
      if (!content) {
        return res.status(400).json(`Not found data`);
      } else {
        return res.status(200).json(content);
      }
    } else if (roles == "hotel" || roles == "user") {
      return res.status(400).json(`the roles is invailid`);
    } else {
      return res.status(400).json(`Cant not access`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};

// update content
exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Not found roles`);
    } else if (roles == "reviewer") {
      const content = await contentModel.findByIdAndUpdate(
        { _id: id },
        { $set: req.body }
      );
      if (!content) {
        return res.status(400).json(`Not found data to update`);
      } else {
        return res.status(400).json(`Successed to update data`);
      }
    } else if (roles == "hotel" || roles == "user") {
      return res.status(400).json(`the roles is invailid`);
    } else {
      return res.status(400).json(`Can not access`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};
// delete content
exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Not found roles`);
    } else if (roles == "reviewer") {
      const content = await contentModel.findByIdAndDelete(id);
      if (!content) {
        return res.status(400).json(`Not found data`);
      } else {
        return res.status(400).json(`Successed to delete`);
      }
    } else if (roles == "hotel" || roles == "user") {
      return res.status(400).json(`the roles is invailid`);
    } else {
      return res.status(400).json(`Can not access`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};
