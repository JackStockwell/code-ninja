// Imports
const { Schema, model } = require("mongoose");


// Location Schema.
const locationSchema = (
    {
        locationID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
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

module.exports = locationSchema