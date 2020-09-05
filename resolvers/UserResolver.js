require("dotenv").config();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    user: (parent, args) => User.findByPk(args.id),
    users: () => User.findAll(),
  },

  Mutation: {
    registerUser: async (parent, args, context, info) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const user = await User.build({
        username: args.username,
        password: hashedPassword,
        email: args.email,
        firstname: args.firstname,
        lastname: args.lastname,
      });
      return user.save();
    },
    loginUser: async (parent, args, context, info) => {
      const user = await context.user(args.username);

      // Failed user lookup
      if (!user) throw new Error("Invalid Login");

      const passwordMatch = await bcrypt.compare(args.password, user.password);

      // Failed password match
      if (!passwordMatch) throw new Error("Invalid Login");

      // Sign json webtoken and send back to user
      const token = jwt.sign(
        {
          id: user.id,
          username: user.email,
        },
        JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return { token, user };
    },
    // deleteUser: (parent, args) => {},
  },
};
