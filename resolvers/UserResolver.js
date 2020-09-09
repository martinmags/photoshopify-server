require("dotenv").config();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../util/validators");

// Helper for Generate Token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15min",
    }
  );
}

module.exports = {
  Query: {
    userById: (parent, args) => User.findByPk(args.id),
    users: () => User.findAll(),
    userByUsername: (parent, args) =>
      User.findOne({ where: { username: args.username } }),
  },

  Mutation: {
    registerUser: async (
      parent,
      { username, email, firstname, lastname, password, confirmPassword },
      context,
      info
    ) => {
      // Validate Data input
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors:", { errors });
      }

      // Check for existing data conflicts
      const foundUser = await User.findOne({ where: { username } });
      const foundUserText = "Username is taken";
      if (foundUser) {
        throw new UserInputError(foundUserText, {
          errors: { username: foundUserText },
        });
      }
      const foundEmail = await User.findOne({ where: { email } });
      const foundEmailText = "Email is already registered";
      if (foundEmail) {
        throw new UserInputError(foundEmailText, {
          errors: { username: foundEmailText },
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Build user
      const user = await User.build({
        username,
        email,
        firstname,
        lastname,
        password: hashedPassword,
      });
      await user.save();

      // Create auth token
      const token = generateToken(user);

      // Confirm working correctly(?)
      return { user, token };
    },
    loginUser: async (parent, { username, password }, context, { res }) => {
      // Validate Data input
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors:", { errors });
      }

      // Check for user and password
      const user = await User.findOne({ where: { username } });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      // Sign json webtoken and send back to user
      const token = generateToken(user);

      // Cookies
      // res.cookie("refresh-token", refreshToken);
      // res.cookie("access-token", accessToken);
      return { token, user };
    },
  },
};
