module.exports = `
  type Photo {
    id: ID!
    filepublicid: String!
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
    addPhoto(fileStr: String!): Photo
    deletePhoto(id: ID!): String!
  }
`;
