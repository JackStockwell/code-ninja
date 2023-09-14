// Imports
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");


const employerSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    about: {
        type: String,
    },
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job',
    }],
})

// hash user password
employerSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
employerSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


const Employer = model('Employer', employerSchema)

module.exports = Employer;