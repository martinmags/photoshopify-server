require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { test } = require("./config/db");
const jwt = require("jsonwebtoken");

const getUser = (token) => {
  try {
    console.log(token);
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};
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
  context: ({ req }) => {
    // Get user token from the headers
    const tokenWithBearer = req.headers.authorization || "";
    const token = tokenWithBearer.split(" ")[1];
    console.log("Req:", req.headers);
    console.log("Tokenwithbearer:", tokenWithBearer);
    console.log("Token:", token);
    console.log();
    // Try to retrieve a user with the token
    const user = getUser(token);

    // Block non existing user or failed user lookup
    // if (!user) throw new AuthenticationError("you must be logged in");

    // add the user to the context
    return { user };
  },
});

// Run Server
const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
