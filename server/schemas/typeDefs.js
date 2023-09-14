const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        resume: String
        jobSaves: [Job]
        jobApp: [Job]
    }

    type Job {
        _id: ID!
        title: String!
        company: Employer!
        salary: Int
        description: String!
        category: [Category]!
        tags: [Tag]!
    }

    type locationSchema {
        locationID: ID
        firstLine: String!
        secondLine: String
        city: String!
        county: String!
        postCode: String!
    }

    type Employer {
        _id: ID!
        companyName: String!
        location: locationSchema
        about: String
        jobs: [Job] 
    }

    type Auth {
        token: ID!
        user: User
    }

    type Category {
        _id: ID!
        name: String
    }

    type Tag {
        _id: ID!
        name: String
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
        me: User
        users: [User]
        user(id: ID): User
        jobs(limit: Int, offset: Int, category: String): [Job]
        categories: [Category]
        tags: [Tag]
    }

    type Mutation {
        createUser(userData: userInput!): Auth
        loginUser(email: String! password: String!): Auth
        singleUpload(file: Upload!): File
        createTag(name: String!): Tag
        saveJob(id: ID!): User
    }

`;

module.exports = typeDefs;