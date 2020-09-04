/**
 * TODO:
 * - Create PhotoType, PhotoModel, PhotoResolver
 *      - PhotoResolver: connects to s3 bucket and uploads a file from user's
 *        own files. Takes filepath and adds to photoobject to save to db.
 * - Update documentation on how models, schema, and resolvers work together
 * - Naive implementation of authentication
 *     - Hashing Algorithm and hashing passwords
 * - Create unit tests for each resolver (uploading files)
 * - Replace current postgresql server with heroku/AWS postgresql server
 * - Create AWS S3 Bucket for storing photos
 **/

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// Create instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Run Server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
