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
    token: String
    user: User
  }

  type Query {
    currentUser: User!
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    registerUser(
      username: String!, 
      password: String!, 
      email: String!, 
      firstname: String, 
      lastname: String,
    ): User
    loginUser(
      username: String!,
      password: String!
    ): LoginResponse!
  }
`;
