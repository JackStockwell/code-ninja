const { AuthenticationError } = require('apollo-server-express')
const { User, Job, Category } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        jobs: async () => {
            return await Job.find({});
        },
        categories: async () => {
            return await Category.find({})
        }
    }
}

module.exports = resolvers;