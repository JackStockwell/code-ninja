// Imports
const { Schema, model } = require("mongoose");

const jobSchema = new Schema(

    {
        title: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String,
        },
        salary: {
            type: Number,
        },
        description: {
            type: String,
            required: true
        },
        categories: [{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }],
        tags: [{
            type: Schema.Types.ObjectId,
            ref: 'Tag',
            required: true
        }],
    }
);


const Job = model('Job', jobSchema)

module.exports = Job