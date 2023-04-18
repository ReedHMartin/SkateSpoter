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
    police_presence: Array
    pedestrians: Int
    typeOf: String
  }
`;

module.exports = typeDefs;
