const newModel = require("../model/news.model");

exports.postNews = async (req, res) => {
  try {
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`Can Not Found Roles`);
    } else if (roles == "hotel" || roles == "reviewer") {
      if (!req.body.titleNews || !req.body.desNews) {
        return res.status(400).json({ message: "the body is not emty" });
      }
      const posterData = {
        ...req.body,
      };
      const newPoster = await newModel.create(posterData);
      const returnNews = {
        titleNews: newPoster.titleNews,
        desNews: newPoster.desNews,
        imageNew: newPoster.imageNews,
      };

      return res.status(200).json(returnNews);
    } else {
      return res.status(400).json(`Can not post News`);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all news data
exports.getAllNews = async (req, res) => {
  try {
    const news = await newModel.find({}).select("-_v");
    if (!news) {
      return res.status(400).json(`Not Found Data`);
    } else {
      return res.status(200).json(news);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};
// get singel news data

exports.getSingleNewData = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await newModel.findById(id).select("-__v");
    if (!news) {
      return res.status(400).json(`Not Found Data`);
    } else {
      return res.status(200).json(news);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};
// update news
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`No found roles`);
    } else if (roles == "hotel" || roles == "reviwer") {
      const news = await newModel.findByIdAndUpdate(
        { _id: id },
        { $set: req.body }
      );
      if (!news) {
        return res.status(400).json(`Not found data to update`);
      } else {
        return res.status(200).json(`Successed to update`);
      }
    } else {
      return res.status(400).json(`Can no access data`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};

// delete news data
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.roles;
    if (roles == null) {
      return res.status(400).json(`can not found roles`);
    } else if (roles == "hotel" || roles == "reviewer") {
      const news = await newModel.findByIdAndDelete(id);
      if (!news) {
        return res.status(400).json(`Not found data to delete`);
      } else {
        return res.status(200).json(`Successed to delete`);
      }
    } else {
      return res.status(400).json(`Can not access data`);
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};

