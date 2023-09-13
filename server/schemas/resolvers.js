const { AuthenticationError } = require('apollo-server-express')
const { GraphQLUpload } = require('graphql-upload');
const { User, Job, Category, Tag } = require('../models')
const { signToken } = require('../utils/auth')
const AWSS3Uploader = require('../utils/s3config')

const s3Uploader = new AWSS3Uploader()

const resolvers = {

    Upload: GraphQLUpload,

    Query: {
        // Dev query, queries all users.
        users: async () => {
            return await User
                .find({})
                .populate([
                    { path: 'jobSaves', model: 'Job' },
                    { path: 'jobApp', model: 'Job' }
                ]);
        },
        jobs: async (parent, { category }) => {

            const params = {};

            if (category) {
                params.category = category
            }

            return await Job
                .find(params)
                .populate([
                    { path: 'category', model: 'Category' },
                    { path: 'tags', model: 'Tag' }
                ]);
        },
        categories: async () => {
            return await Category.find({})
        },
        tags: async () => {
            return await Tag.find({})
        }
    },
    Mutation: {
        // Creates a new user entry to the database.
        createUser: async (parent, { userData }) => {
            // Create the user data from the args.
            const newUser = await User.create(userData)
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
        loginUser: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('Incorrect Email')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect PW')
            }

            const token = signToken(user)

            return { token, user }
        },

        // Uploads a file sent from the front end to the S3 webserver.
        singleUpload: async (parent, args) => {
            const upload = s3Uploader.singleFileUploadResovler.bind(s3Uploader);

            try {
              const newUpload = await upload(parent, args);
              return newUpload;
            } catch (error) {
              console.log(error);
              throw new AuthenticationError(error);
            }
        },
        createTag: async (parent, args) => {
            return await Tag.create(args)
        }
    }
}

module.exports = resolvers;