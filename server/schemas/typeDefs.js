const { gql } = require('apollo-server-express');
const { GraphQLUpload } = require('graphql-upload');

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
        company: String!
        location: String
        salary: Int
        description: String!
        category: [Category]!
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

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
        url: String!
    }

    scalar Upload

    type Query {
        users: User
        jobs: Job
        categories: [Category]
    }

    type Mutation {
        createUser(userData: userInput!): Auth
        singleUpload(file: Upload!): File
    }

`;

module.exports = typeDefs;