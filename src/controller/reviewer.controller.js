const reviewModel = require("../model/reviewer.model");

exports.createReviewer = async (req, res) => {
  try {
    if (!req.body.youtuber || !req.body.tiktoker || !req.body.page) {
      return res.status(400).json(`The body is not emty`);
    } else {
      const newData = {
        ...req.body,
      };
      const reviewer = await reviewModel.create(newData);
      return res.status(201).json(reviewer);
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// get reviewer
exports.getReviewer = async (req, res) => {
  try {
    const reviewer = await reviewModel.find({}).select("-__v");
    if (!reviewer) {
      return res.status(400).json({ text: "not found data" });
    } else {
      return res.status(200).json(reviewer);
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// get singel reviewer

exports.getSingleReviewer = async (req, res) => {
  try {
    const { id } = req.params;
    const reviewer = await reviewModel.findById(id).select("-__v");
    if (!reviewer) {
      return res.status(400).json(`Not found data`);
    } else {
      return res.status(200).json(reviewer);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};

// update reviewer
exports.updateReviewer = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Can not found roles`);
    } else if (roles == "reviewer") {
      const reviewer = await reviewModel.findByIdAndUpdate(
        { _id: id },
        { $set: req.body }
      );
      if (!reviewer) {
        return res.status(400).json(`Not found data to update`);
      } else {
        return res.status(400).json(`Successed to update data`);
      }
    } else {
      return res.status(400).json(`Can not access data`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};

// delete reviewer
exports.deleteReviewer = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Not found roles`);
    } else if (roles == "reviewer") {
      const reviewer = await reviewModel.findByIdAndDelete(id);
      if (!reviewer) {
        return res.status(400).json(`Not found data to delete`);
      } else {
        return res.status(400).json(`Successed to update data`);
      }
    } else {
      return res.status(400).json(`Can not access data `);
    }
  } catch (error) {
    return res.status(500).json({ message: `Serve Error ${error}` });
  }
};
