const Destination = require("../schemas/traveldestination");
const { uploadFile, deleteFile } = require("../services/file.service");
// const cloudinary = require("cloudinary").v2;

const createDestination = async (file, data) => {
  const imageDetails = uploadFile(file);

  const destination = new Destination({
    title: data.title,
    date_from: new Date(data.date_from),
    date_to: new Date(data.date_to),
    country: data.country,
    location: data.location,
    description: data.description,
    picture: imageDetails ? imageDetails.secure_url : null,
    picture_public_id: imageDetails ? imageDetails.public_id : null,
  });

  destination.save(function (err) {
    if (err) {
      return {
        status: 422,
        response: err,
      };
    } else {
      return {
        status: 201,
        response: destination,
      };
    }
  });
};

const updateDestination = async (id, file, data) => {
  const ObjectID = require("mongodb").ObjectId;
  const destination = await Destination.findOne({ _id: ObjectID(id) });

  destination.title = data.title;
  destination.date_from = new Date(data.date_from);
  destination.date_to = new Date(data.date_to);
  destination.country = data.country;
  destination.location = data.location;
  destination.description = data.description;

  if (file) {
    deleteFile(destination.picture_public_id);
    const imageDetails = uploadFile(file);
    destination.picture = imageDetails ? imageDetails.secure_url : null;
    destination.picture_public_id = imageDetails
      ? imageDetails.public_id
      : null;
  }

  try {
    const savedDestination = await destination.save();
    return {
      status: 201,
      response: savedDestination,
    };
  } catch (err) {
    return {
      status: 422,
      response: err,
    };
  }
};

const getDestinationById = (id) => {
  const ObjectID = require("mongodb").ObjectId;
  const o_id = new ObjectID(id);
  const query = { _id: o_id };

  Destination.findOne(query, function (err, destination) {
    if (err) {
      return {
        status: 422,
        response: err,
      };
    } else {
      return {
        status: 200,
        response: destination,
      };
    }
  });
};

const getAllDestinations = () => {
  Destination.find({}, function (err, destinations) {
    if (err) {
      return { status: 422, response: err };
      //   res.status(422).json({
      //     errors: err,
      //   });
    } else {
      return {
        status: 200,
        response: destinations,
      };
    }
  });
};

const deleteDestination = async (id) => {
  var ObjectID = require("mongodb").ObjectId;
  var o_id = new ObjectID(id);
  const query = { _id: o_id };

  const destination = await Destination.findOne(query);
  deleteFile(destination.picture_public_id);

  Destination.deleteOne(query, function (err) {
    if (err) {
      return {
        status: 422,
        response: err,
      };
    } else {
      // res.status(200).json({
      //   success: true,
      //   message: "deleted",
      // });
      return {
        status: 200,
        response: {
          success: true,
          message: "deleted",
        },
      };
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
