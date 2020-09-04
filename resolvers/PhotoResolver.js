const Photo = require("../models/PhotoModel");

module.exports = {
  Query: {
    photo: (parent, args) => Photo.findByPk(args.id),
    photos: () => Photo.findAll(),
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
