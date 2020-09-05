const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { test } = require("./config/db");
require("dotenv").config();

// Test Connection to Database
test();

// Create instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Run Server
const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
