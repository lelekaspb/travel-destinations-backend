const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { ErrorHandler } = require("../utils/errorHandler");

cloudinary.config({
  cloud_name: process.env.cloudinaryCloudName,
  api_key: process.env.cloudinaryApiKey,
  api_secret: process.env.cloudinaryApiSecret,
});

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
});

const uploadToCloudinary = async (fileString, format) => {
  try {
    const { uploader } = cloudinary;

    const res = await uploader.upload(
      `data:image/${format};base64,${fileString}`,
      {
        folder: "traveldestinations",
        unique_filename: true,
      }
    );

    return res;
  } catch (error) {
    throw new ErrorHandler(500, error);
  }
};

module.exports = {
  upload,
  uploadToCloudinary,
};
