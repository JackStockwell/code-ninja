const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        jobSaves: [Job]
        jobApp: [Job]
    }

    type Job {
        _id: ID!
        title: String!
        location: String!
        salary: Float
        description: String!
        categories: [Category]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Category {
        _id: ID!
        name: String!
    }

    input userInput {
        email: String!
        password: String!
        firstName: String!
        lastName: String!
    }

    type Query {
        users: User
        jobs: Job
        categories: [Category]
    }

    type Mutation {
        createUser(userData: userInput!): Auth
    }

`;

module.exports = typeDefs;