const authService = require("../services/auth.service");

const signUp = async (req, res) => {
  const result = await authService.signUp(req.body);
  res.status(result.status).json(result.response);
};

const signIn = async (req, res) => {
  const result = await authService.signIn(req.body);
  res.status(result.status).json(result.response);
};

module.exports = {
  signUp,
  signIn,
};
