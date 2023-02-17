const traveldestinationService = require("../services/traveldestinations.service");

const createDestination = async (req, res) => {
  const result = traveldestinationService.createDestination(req.file, req.body);
  res.status(result.status).json(result.response);
};

const updateDestination = async (req, res) => {
  const result = traveldestinationService.updateDestination(
    req.params.id,
    req.file,
    req.body
  );
  res.status(result.status).json(result.response);
};

const getDestinationById = async (req, res) => {
  const result = traveldestinationService.getDestinationById(req.params.id);
  res.status(result.status).json(result.response);
};

const getAllDestinations = async (req, res) => {
  const result = traveldestinationService.getAllDestinations();
  res.status(result.status).json(result.response);
};

const deleteDestination = async (req, res) => {
  const result = traveldestinationService.deleteDestination(req.params.id);
  res.status(result.status).json(result.response);
};

module.exports = {
  createDestination,
  updateDestination,
  getDestinationById,
  getAllDestinations,
  deleteDestination,
};
