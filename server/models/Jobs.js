const { Schema, model } = require("mongoose");

const jobsSchema = (
    {
        title: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        salary: {
            type: Float32Array,
        },

    },

    {
        toJSON: {
            virtuals: true,
        },
    }
);


const Jobs = model('Jobs', jobsSchema)

module.exports = Jobs