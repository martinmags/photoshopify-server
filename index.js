const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { test } = require("./config/db");
require("dotenv").config();

// Test Connection to Database
test();

// Create instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req }) => {
  //   // Get user token from the headers
  //   const token = req.headers.authorization || "";

  //   // Try to retrieve a user with the token
  //   const user = getUser(token);

  //   // Block non existing user or failed user lookup
  //   if (!user) throw new AuthenticationError("you must be logged in");

  //   // add the user to the context
  //   return { user };
  // },
});

// Run Server
const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
