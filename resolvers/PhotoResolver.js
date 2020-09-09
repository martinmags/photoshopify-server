const Photo = require("../models/PhotoModel");
const User = require("../models/UserModel");
const checkAuth = require("../util/check-auth");
const { AuthenticationError } = require("apollo-server");
const { cloudinary } = require("../util/cloudinary");

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
    addPhoto: async (_, { fileStr }, context) => {
      // Verify User
      const user = checkAuth(context);

      // Validate user input
      if (fileStr.trim() === "") {
        throw new Error("File must be provided");
      }

      // Upload to Cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "photoshopify",
      });

      // Extract the public_id from cloudinary
      const filepublicid = uploadedResponse.public_id;

      // Detect Tags
      const tags = [];

      const photo = await Photo.build({
        filepublicid,
        userid: user.id,
        username: user.username,
        tags,
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
