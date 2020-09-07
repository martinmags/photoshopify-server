module.exports = `
  type Photo {
    id: ID!
    filepath: String!
    username: String!
    tags: [String]!
    likes: Int!
  }

  type Query {
    photoById(id: ID!): Photo
    photosByUsername(username: String!): [Photo]
    photos: [Photo]
  }

  type Mutation {
    addPhoto(filepath: String!): Photo
    deletePhoto(id: ID!): String!
  }
`;
