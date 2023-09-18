const { AuthenticationError } = require('apollo-server-express')
const { GraphQLUpload } = require('graphql-upload');
const { User, Job, Category, Tag, Employer } = require('../models')
const { signToken } = require('../utils/auth')
const AWSS3Uploader = require('../utils/s3config')

const s3Uploader = new AWSS3Uploader()

const resolvers = {

    Upload: GraphQLUpload,

    Query: {

        // Used to get the logged in user.
        me: async (parent, args, context) => {

            if (context.user) {
                const userData = await User.findOne(
                    { _id: context.user._id }
                )
                .populate([
                    { path: 'jobSaves', model: 'Job', populate: [
                        { path: 'category', model: 'Category' },
                        { path: 'tags', model: 'Tag' },
                        { path: 'company', model: 'Employer' }, 
                    ]},
                    { path: 'jobApp', model: 'Job', populate: [
                        { path: 'category', model: 'Category' },
                        { path: 'tags', model: 'Tag' },
                        { path: 'company', model: 'Employer' }, 
                    ]}
                ]);
                return userData;
            };

            return
        },
        getEmp: async (parent, args, context) => {
            // Checks to see if the user is logged in.
            if (context.user) {
                try {
                    const empData = await Employer.findOne(
                        { _id: context.user._id }
                    )
                    .populate([
                        { path: 'location', model: 'Location' },
                        { path: 'jobs', model: 'Job', populate: [
                            { path: 'category', model: 'Category' },
                            { path: 'tags', model: 'Tag' },
                            { path: 'company', model: 'Employer' },
                            { path: 'applicants', model: 'User' },
                        ]},
                    ]);

                    return empData;
                } catch (err) {
                    console.error(err)
                    return
                }
            }
            
            return;

        },
        getCompany: async (parent, { id }) => {
            try {
                const data = await Employer.findOne(
                    { _id: id }
                ).populate([
                    { path: 'location', model: 'Location' },
                    { path: 'jobs', model: 'Job', populate: [
                        { path: 'category', model: 'Category' },
                        { path: 'tags', model: 'Tag' },
                        { path: 'company', model: 'Employer' }, 
                    ]},
                ]);

                return data

            } catch (err) {
                throw new AuthenticationError(err)
            }
        },
        getCompanies: async () => {
            return await Employer.find({})
        },
        // Dev query, queries all users.
        users: async () => {
            return await User
                .find({})
                .populate([
                    { path: 'jobSaves', model: 'Job' },
                    { path: 'jobApp', model: 'Job' }
                ]);
        },
        user: async (parent, { id }) => {
            return await User
                .findOne({_id: id})
                .populate([
                    { path: 'jobSaves', model: 'Job' },
                    { path: 'jobApp', model: 'Job' }
                ]);
                
        },
        jobs: async (parent, { limit, offset, category }) => {

            const params = {};

            if (category) {
                params.category = category
             }

            const data = await Job
                .find(params)
                .populate([
                    { path: 'category', model: 'Category' },
                    { path: 'tags', model: 'Tag' },
                    { path: 'company', model: 'Employer' },
                    { path: 'applicants', model: 'User' },
                ]);
            
            if (offset, limit) {
                return data.slice(offset, limit + offset)
            }


        },
        getJob: async (parent, { id }) => {
            return await Job.findOne(
                { _id: id }
            )
            .populate([
                { path: 'category', model: 'Category' },
                { path: 'tags', model: 'Tag' },
                { path: 'company', model: 'Employer' },
                { path: 'applicants', model: 'User' },
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
            const user = await User.create(userData)
            // Error handler
            if (!user) {
                throw new AuthenticationError('Oops! Something went wrong')
            }
            // Creates a sign in token, allowing the user to navigate and give auth to the rest
            // of the API.
            const token = signToken(user)
            
            // Returns the token and
            return { token, user }
        },
        loginUser: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const token = signToken(user)

            return { token, user }
        },
        createEmployer: async (parent, { userData }) => {
            // Create the user data from the args.
            const employer = await Employer.create(userData)

            // Error handler
            if (!employer) {
                throw new AuthenticationError('Oops! Something went wrong, perhaps you already exist?')
            }
            const token = signToken(employer)
            
            // Returns the token and
            return { token, employer }
        },
        loginEmployer: async (parent, {email, password}) => {
            const employer = await Employer.findOne({email});

            if (!employer) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const correctPw = await employer.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const token = signToken(employer)

            return { token, employer }
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
        },
        saveJob: async (parent, { id }, context) => {

            if (!context.user) {
                throw new AuthenticationError('You must be logged in to perform this action!')
            }

            const userData = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { jobSaves: id } },
                { new: true, runValidators: true }
            )
            .populate([
                { path: 'jobSaves', model: 'Job' },
                { path: 'jobApp', model: 'Job' }
            ]);

            return userData
        },
        applyJob: async (parent, { id }, context) => {

            if (!context.user) {
                throw new AuthenticationError('You must be logged in to perform this action!')
            }

            try {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { jobApp: id } },
                    { new: true, runValidators: true }
                )

                const jobData = await Job.findOneAndUpdate(
                    { _id: id },
                    { $addToSet: { applicants: user._id } },
                    { new: true, runValidators: true }
                ).
                populate([
                    { path: 'category', model: 'Category' },
                    { path: 'tags', model: 'Tag' },
                    { path: 'company', model: 'Employer' },
                    { path: 'applicants', model: 'User' },
                ])

                return jobData
                
            } catch(err) {
                throw new AuthenticationError(err)
            }

            
        },
        createJob: async (parent, { input }, context) => {
            
            try {
                if (context.user) {    
                    const newJob = await Job.create(input)
    
                    await Employer.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { jobs: newJob } }
                    )
    
                    return newJob
                }
            } catch (err) {
                return new AuthenticationError(err)
            }

            
        }
    }
}

module.exports = resolvers;