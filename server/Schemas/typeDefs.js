const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        username: String
        email: String
        password: String,
        skateSpot: [skateSpot]
    }

    type skateSpot {
        location: String
        name: String
        lighting: Number
        police_presence: Array
        pedestrians: Number
        typeOf: String
    }`

module.exports = typeDefs;