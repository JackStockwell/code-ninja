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
    },
    Mutation: {
        // Creates a new user entry to the database.
        createUser: async (parent, args) => {
            // Create the user data from the args.
            const newUser = await User.create(args)
            // Error handler
            if (!newUser) {
                throw new AuthenticationError('Oops! Something went wrong')
            }
            // Creates a sign in token, allowing the user to navigate and give auth to the rest
            // of the API.
            const token = signToken(newUser)
            
            // Returns the token and
            return { token, newUser }
        },
        
    }
}

module.exports = resolvers;