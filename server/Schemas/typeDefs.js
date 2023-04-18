const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
    skateSpot: [skateSpot]
  }

  type skateSpot {
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
    skatespots: [skateSpot]
    skatespot(skateSpotId: ID!): skateSpot
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addSkateSpot(
      location: String!
      name: String!
      lighting: Int
      police_presence: [String]
      pedestrians: Int
      typeOf: String
    ): skateSpot
  }
`;

module.exports = typeDefs;
