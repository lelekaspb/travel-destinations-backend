const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { ErrorHandler } = require("../utils/errorHandler");
const { bufferToDataURI } = require("../utils/file");

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

const uploadFile = async (file) => {
  if (file) {
    const fileFormat = file.mimetype.split("/")[1];
    const { base64 } = bufferToDataURI(fileFormat, file.buffer);
    return await uploadToCloudinary(base64, fileFormat);
  }
  return null;
};

const deleteFile = async (fileId) => {
  const { uploader } = cloudinary;
  await uploader.destroy(fileId);
};

module.exports = {
  upload,
  uploadFile,
  deleteFile,
};
