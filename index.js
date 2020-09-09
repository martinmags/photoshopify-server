require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { test } = require("./config/db");
const { verify, jwt } = require("jsonwebtoken");
const express = require("express");
const { cloudinary } = require("./util/cloudinary");
const cors = require("cors");

// Test Connection to Database
test();

// Create instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "*",
    credentials: true,
  },
  context: ({ req }) => ({ req }),
});

const app = express();

// CLOUDINARY API
// Increase limit of image uploads to 50mb
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS
app.use(cors());
server.applyMiddleware({ app });

// Run Server
const PORT = process.env.PORT || 4000;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
