const { mergeTypeDefs } = require("@graphql-tools/merge");
const UserType = require("./UserType");
const PhotoType = require("./PhotoType");

const types = [UserType, PhotoType];
module.exports = mergeTypeDefs(types);
