const { AuthenticationError } = require('apollo-server-express')
const { User, Job } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        jobs: async () => {
            return await Job.find({});
        }
    }
}

module.exports = resolvers;