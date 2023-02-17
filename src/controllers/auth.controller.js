const { signUserUp, signUserIn } = require("../services/auth.service");

const signUp = (req, res) => {
  const result = signUserUp(req.body);
  res.status(result.status).json(result.response);
};

const signIn = async (req, res) => {
  const result = await signUserIn(req.body);
  res.status(result.status).json(result.response);
};

module.exports = {
  signUp,
  signIn,
};
