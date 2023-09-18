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
        category: Category!
        tags: [Tag]!
        applicants: [User]
    }

    type Location {
        _id: ID!
        firstLine: String!
        secondLine: String
        city: String!
        county: String!
        postCode: String!
    }

    type Employer {
        _id: ID!
        email: String!
        password: String!
        companyName: String!
        location: Location
        about: String
        jobs: [Job] 
    }

    type Auth {
        token: ID!
        user: User
    }

    type AuthEmp {
        token: ID!
        employer: Employer
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

    input empInput {
        email: String!
        password: String!
        companyName: String!
    }

    input locationInput {
        firstLine: String!
        secondLine: String
        city: String!
        county: String!
        postCode: String!
    }

    input jobInput {
        title: String!
        salary: Int!
        category: ID!
        company: ID!
        description: String!
        tags: [ID]!
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
        getEmp: Employer
        getCompany(id: ID): Employer
        getJob(id: ID): Job
        users: [User]
        user(id: ID): User
        jobs(limit: Int, offset: Int, category: String): [Job]
        categories: [Category]
        tags: [Tag]
        getCompanies: [Employer]
    }

    type Mutation {
        createUser(userData: userInput!): Auth
        loginUser(email: String! password: String!): Auth
        createEmployer(userData: empInput): AuthEmp
        loginEmployer(email: String! password: String!): AuthEmp
        singleUpload(file: Upload!): File
        createTag(name: String!): Tag
        saveJob(id: ID!): User
        createJob(input: jobInput!): Job
        applyJob(id: ID): Job
    }

`;

module.exports = typeDefs;