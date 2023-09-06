const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        jobSaves: [Jobs]
        jobApp: [Jobs]
    }

    type Jobs {
        _id: ID!
        title: String!
        location: String!
        salary: Float
    }

`;

module.exports = typeDefs;