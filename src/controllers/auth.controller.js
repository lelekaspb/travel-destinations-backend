const User = require("../schemas/userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = (req, res) => {
  //   console.log("sign up");
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  user.save(function (err) {
    if (err) {
      res.status(422).json({
        success: false,
        message: err,
      });
    } else {
      res.status(201).json({
        success: true,
        user: user,
      });
    }
  });
};

const signIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = { email: email };
  // find user by email
  User.findOne(query, async function (err, user) {
    if (err) {
      res.status(422).json({
        success: false,
        message: `Could not find user with email ${email}`,
      });
    } else {
      // check if the password is correct
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, {
          expiresIn: 60 * 60 * 3,
        });
        res.status(200).json({
          success: true,
          token: token,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "The password is not correct",
        });
      }
    }
  });
};

module.exports = {
  signUp,
  signIn,
};
