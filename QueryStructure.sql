query User {
  username
  password
  email
  firstname
  lastname
  photo {
    filepath
  }
}

type Query {
  user: [User]
}
type User { 
  username: String!
  password: String!
  email: String!
  firstname: String
  lastname: String
}
type Photo {
  ownerID: String!
  filepath: String!
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): User
}