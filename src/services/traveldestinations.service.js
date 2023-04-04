const Destination = require("../schemas/traveldestination.schema");
const { uploadFile, deleteFile } = require("../services/file.service");

const createDestination = async (file, data) => {
  const imageDetails = await uploadFile(file);

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

  try {
    await destination.save();
    return {
      status: 201,
      response: destination,
    };
  } catch (err) {
    return {
      status: 422,
      response: { ...err },
    };
  }
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
    if (destination.picture && destination.picture_public_id) {
      deleteFile(destination.picture_public_id);
    }
    const imageDetails = await uploadFile(file);
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
      response: { ...err },
    };
  }
};

const getDestinationById = async (id) => {
  const ObjectID = require("mongodb").ObjectId;
  const o_id = new ObjectID(id);
  const query = { _id: o_id };

  try {
    const destination = await Destination.findOne(query);
    return {
      status: 200,
      response: destination,
    };
  } catch (err) {
    return {
      status: 422,
      response: { ...err },
    };
  }
};

const getAllDestinations = async () => {
  try {
    const destinations = await Destination.find({});
    return {
      status: 200,
      response: destinations,
    };
  } catch (err) {
    return { status: 422, response: { ...err } };
  }
};

const deleteDestination = async (id) => {
  var ObjectID = require("mongodb").ObjectId;
  var o_id = new ObjectID(id);
  const query = { _id: o_id };

  const destination = await Destination.findOne(query);
  if (destination.picture && destination.picture_public_id) {
    await deleteFile(destination.picture_public_id);
  }

  try {
    await Destination.deleteOne(query);
    return {
      status: 200,
      response: {
        success: true,
        message: "deleted",
      },
    };
  } catch (err) {
    return {
      status: 422,
      response: { ...err },
    };
  }
};

module.exports = {
  createDestination,
  updateDestination,
  getDestinationById,
  getAllDestinations,
  deleteDestination,
};
