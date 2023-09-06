// Imports
const { Schema, model } = require("mongoose");

const jobSchema = new Schema(

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
            type: Number,
        },
        description: {
            type: String,
            required: true
        },
        categories: [{
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }]
    }
);


const Job = model('Job', jobSchema)

module.exports = Job