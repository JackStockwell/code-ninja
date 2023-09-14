// Imports
const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        company: {
            type: Schema.Types.ObjectId,
            required: true
        },
        salary: {
            type: Number,
        },
        description: {
            type: String,
            required: true
        },
        category: [{
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