const traveldestinationService = require("../services/traveldestinations.service");

const createDestination = async (req, res) => {
  const result = await traveldestinationService.createDestination(
    req.file,
    req.body
  );
  res.status(result.status).json(result.response);
};

const updateDestination = async (req, res) => {
  const result = await traveldestinationService.updateDestination(
    req.params.id,
    req.file,
    req.body
  );
  res.status(result.status).json(result.response);
};

const getDestinationById = async (req, res) => {
  const result = await traveldestinationService.getDestinationById(
    req.params.id
  );
  res.status(result.status).json(result.response);
};

const getAllDestinations = async (req, res) => {
  console.log("get all destinations in traveldestinations controller");
  const result = await traveldestinationService.getAllDestinations();
  res.status(result.status).json(result.response);
};

const deleteDestination = async (req, res) => {
  const result = await traveldestinationService.deleteDestination(
    req.params.id
  );
  res.status(result.status).json(result.response);
};

module.exports = {
  createDestination,
  updateDestination,
  getDestinationById,
  getAllDestinations,
  deleteDestination,
};
