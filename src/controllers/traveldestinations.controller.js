const Destination = require("../schemas/traveldestination");
const { bufferToDataURI } = require("../utils/file");
const { uploadToCloudinary } = require("../services/upload.service");
const cloudinary = require("cloudinary").v2;

const createDestination = async (req, res) => {
  let imageDetails = null;
  if (req.file) {
    const fileFormat = req.file.mimetype.split("/")[1];
    const { base64 } = bufferToDataURI(fileFormat, req.file.buffer);
    imageDetails = await uploadToCloudinary(base64, fileFormat);
  }

  const destination = new Destination({
    title: req.body.title,
    date_from: new Date(req.body.date_from),
    date_to: new Date(req.body.date_to),
    country: req.body.country,
    location: req.body.location,
    description: req.body.description,
    picture: imageDetails ? imageDetails.secure_url : null,
    picture_public_id: imageDetails ? imageDetails.public_id : null,
  });

  destination.save(function (err) {
    if (err) {
      res.status(422).json(err);
    } else {
      res.status(201).json(destination);
    }
  });
};

const updateDestination = async (req, res) => {
  const id = req.params.id;
  const ObjectID = require("mongodb").ObjectId;

  const destination = await Destination.findOne({ _id: ObjectID(id) });

  destination.title = req.body.title;
  destination.date_from = new Date(req.body.date_from);
  destination.date_to = new Date(req.body.date_to);
  destination.country = req.body.country;
  destination.location = req.body.location;
  destination.description = req.body.description;

  let imageDetails = null;
  if (req.file) {
    // delete old pic
    const { uploader } = cloudinary;
    const res = await uploader.destroy(destination.picture_public_id);

    // upload new pic
    const fileFormat = req.file.mimetype.split("/")[1];
    const { base64 } = bufferToDataURI(fileFormat, req.file.buffer);
    imageDetails = await uploadToCloudinary(base64, fileFormat);

    // update picture url and public_id in db
    destination.picture = imageDetails.secure_url;
    destination.picture_public_id = imageDetails.public_id;
  }

  try {
    const savedDestination = await destination.save();
    res.status(201).json(savedDestination);
  } catch (err) {
    res.status(422).json(err);
  }
};

const getDestinationById = async (req, res) => {
  const id = req.params.id;
  var ObjectID = require("mongodb").ObjectId;
  var o_id = new ObjectID(id);
  const query = { _id: o_id };

  Destination.findOne(query, function (err, destination) {
    if (err) {
      res.status(422).json(err);
    } else {
      res.status(200).json(destination);
    }
  });
};

const getAllDestinations = async (req, res) => {
  Destination.find({}, function (err, destinations) {
    if (err) {
      console.log(err);
      res.status(422).json({
        errors: err,
      });
    } else {
      res.status(200).json(destinations);
    }
  });
};

const deleteDestination = async (req, res) => {
  const id = req.params.id;
  var ObjectID = require("mongodb").ObjectId;
  var o_id = new ObjectID(id);
  const query = { _id: o_id };

  // delete image from cloudinary
  const destination = await Destination.findOne(query);
  const { uploader } = cloudinary;
  await uploader.destroy(destination.picture_public_id);

  Destination.deleteOne(query, function (err) {
    if (err) {
      res.status(422).json(err);
    } else {
      res.status(200).json({
        success: true,
        message: "deleted",
      });
    }
  });
};

module.exports = {
  createDestination,
  updateDestination,
  getDestinationById,
  getAllDestinations,
  deleteDestination,
};
