const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { bufferToDataURI } = require("../utils/file.util");

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
    throw new Error(500, error);
  }
};

const uploadFile = async (file) => {
  console.log("file");
  console.log(file);
  if (file) {
    const fileFormat = file.mimetype.split("/")[1];
    const { base64 } = bufferToDataURI(fileFormat, file.buffer);

    try {
      return await uploadToCloudinary(base64, fileFormat);
    } catch (err) {
      console.error(err);
    }
  }
  return null;
};

const deleteFile = async (fileId) => {
  const { uploader } = cloudinary;
  try {
    await uploader.destroy(fileId);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  upload,
  uploadFile,
  deleteFile,
};
