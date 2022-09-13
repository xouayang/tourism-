const fs = require("fs");
const upload = require("../../multer");
const cloudinary = require("../../src/config/cloudinary.config");

exports.uploadImage = async () => {
  await upload.array("image"),
    async (req, res) => {
      const uploader = async (path) => await cloudinary.uploads(path, "Images");
      if (req.method === "POST") {
        const urls = [];
        const files = req.files;

        for (const file of files) {
          const { path } = file;
          const newPath = await uploader(path);

          urls.push(newPath);

          fs.unlinkSync(path);
        }
        return res.status(200).json({
          message: "Image Successfully to uploaded",
          data: urls,
        });
      } else {
        return res.status(405).json({
          err: "Images not uploaded successfully",
        });
      }
    };
};
