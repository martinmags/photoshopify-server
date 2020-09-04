module.exports = `
  type Photo {
    id: ID!
    filepath: String!
    user: User
  }

  type Query {
    photo(id: ID!): Photo
    photos: [Photo]
  }

  type Mutation {
    addPhoto(
      filepath: String!,
      userid: ID!
    ): Photo
  }
`;
