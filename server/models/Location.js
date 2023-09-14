// Imports
const { Schema, model } = require("mongoose");


// Location Schema.
const locationSchema = (
    {
        firstLine: {
            type: String,
            required: true
        },
        secondLine: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        county: {
            type: String,
            required: true
        },
        postCode: {
            type: String,
            required: true
        },
    }
)

const Location = model('Location', locationSchema)

module.exports = Location