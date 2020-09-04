const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// Create instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

// Run Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
