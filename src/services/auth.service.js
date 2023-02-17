const User = require("../schemas/userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (data) => {
  const user = new User({
    email: data.email,
    password: data.password,
  });

  try {
    await user.save();
    return {
      status: 201,
      response: {
        success: true,
        user: user,
      },
    };
  } catch (err) {
    return {
      status: 422,
      response: {
        success: false,
        message: err,
      },
    };
  }
};

const signIn = async (data) => {
  const email = data.email;
  const password = data.password;
  const query = { email: email };
  // find user by email
  try {
    const user = await User.findOne(query);
    const isValid = await bcrypt.compare(password, user.password);

    // if password is correct
    if (isValid) {
      const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, {
        expiresIn: 60 * 60 * 3,
      });

      return {
        status: 200,
        response: {
          success: true,
          token: token,
        },
      };
    }

    // if password is not correct
    return {
      status: 400,
      response: {
        success: false,
        message: "The password is not correct",
      },
    };
  } catch (err) {
    return {
      status: 422,
      response: {
        success: false,
        message: `Could not find user with email ${email}`,
      },
    };
  }
};

module.exports = {
  signUp,
  signIn,
};
