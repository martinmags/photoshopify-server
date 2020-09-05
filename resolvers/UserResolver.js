const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

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
    // deleteUser: (parent, args) => {},
  },
};
