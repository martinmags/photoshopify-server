const Photo = require("../models/PhotoModel");
const User = require("../models/UserModel");
const checkAuth = require("../util/check-auth");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    // Search Photo by id
    photoById: async (_, { id }) => {
      try {
        const photo = await Photo.findByPk(id);
        if (photo) {
          return photo;
        } else {
          throw new Error("Photo not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    // Return all photos
    photos: () => Photo.findAll(),
    // Search for all of a user's photos
    photosByUsername: async (_, { username }) => {
      try {
        const photo = await Photo.findAll({ where: { username } });
        if (photo) {
          return photo;
        } else {
          throw new Error("Photo not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    // ownPhotos: (parent, args, context) => {
    // if (!context.user) return null;
    // return user photos where the id == context.user.id?
    // },
  },

  Mutation: {
    addPhoto: async (_, { filepath }, context) => {
      // Verify User
      const { id, username } = checkAuth(context);

      // Detect Tags

      const photo = await Photo.build({
        filepath,
        userid: id,
        username,
      });
      await photo.save();
      return photo;
    },
    deletePhoto: async (_, { id }, context) => {
      const user = checkAuth(context);
      try {
        const photo = await Photo.findByPk(id);
        if (user.username === photo.username) {
          // delete photo by photo's id
          await photo.destroy();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error("Photo does not exist");
      }
    },
  },
};
