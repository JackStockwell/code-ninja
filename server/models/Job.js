// Imports
const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
        title: {
            type: String,
        },
        company: {
            type: String,
        },
        location: {
            type: String,
        },
        salary: {
            type: Number,
        },
        description: {
            type: String,
        },
        category: [{
            type: Schema.Types.ObjectId,
            ref: 'Category',
        }],
        tags: [{
            type: Schema.Types.ObjectId,
            ref: 'Tag',
        }],
    }
);


const Job = model('Job', jobSchema)

module.exports = Job