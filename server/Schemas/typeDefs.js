const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    skateSpot: [skateSpot]
  }

  type skateSpot {
    _id: ID
    userId: User
    location: String!
    name: String!
    lighting: Int
    police_presence: [String]
    pedestrians: Int
    typeOf: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    skateSpots: [skateSpot]
    skateSpot(skateSpotId: ID!): skateSpot
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addSkateSpot(
      userId: ID!
      location: String!
      name: String!
      lighting: Int
      police_presence: [String]
      pedestrians: Int
      typeOf: String
    ): skateSpot
    deleteSkateSpot(skateSpotId: ID!): User
  }
`;

module.exports = typeDefs;
