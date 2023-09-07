const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("mongoose-type-email");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.Email,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["recruiter", "applicant"],
      required: true,
    },
  },
  { collation: { locale: "en" } }
);

// Password hashing using async/await
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

// Password verification upon login using async/await
userSchema.methods.login = async function (password) {
  try {
    const result = await bcrypt.compare(password, this.password);
    if (result) {
      return Promise.resolve();
    } else {
      return Promise.reject("Password doesn't match");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = mongoose.model("UserAuth", userSchema);
