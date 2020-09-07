module.exports = `
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    firstname: String
    lastname: String
    createdat: String!
    updatedat: String!
    photos: [Photo]
  }

  type LoginResponse {
    user: User
    token: String
  }

  type Query {
    currentUser: User!
    userById(id: ID!): User
    users: [User]
    userByUsername(username: String!): User
  }

  type Mutation {
    registerUser(
      username: String!, 
      password: String!,
      confirmPassword: String!,
      email: String!, 
      firstname: String, 
      lastname: String,
    ): LoginResponse!
    loginUser(
      username: String!,
      password: String!
    ): LoginResponse!
  }
`;
