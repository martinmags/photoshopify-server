const { mergeResolvers } = require("@graphql-tools/merge");
const PhotoResolver = require("./PhotoResolver");
const UserResolver = require("./UserResolver");

const resolvers = [PhotoResolver, UserResolver];
module.exports = mergeResolvers(resolvers);
