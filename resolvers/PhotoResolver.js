const Photo = require("../models/PhotoModel");

module.exports = {
  Query: {
    // Search Photo by id
    photo: (parent, args) => Photo.findByPk(args.id),
    photos: () => Photo.findAll(),
    // ownPhotos: (parent, args, context) => {
    // if (!context.user) return null;
    // return user photos where the id == context.user.id?
    // },
  },

  Mutation: {
    addPhoto: (parent, args) => {
      let photo = Photo.build({
        filepath: args.filepath,
        userid: args.userid,
      });
      return photo.save();
    },

    // deletePhoto: (parent, args) => {},
  },
};
