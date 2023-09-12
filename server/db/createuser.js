const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserAuth = require('./index.js'); 

// Connect to your MongoDB database
mongoose.connect("http://localhost:3001/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new user
const newUser = new UserAuth({
  email: 'user@example.com',
  password: 'password123', 
  type: 'applicant', // or 'recruiter' depending on the user type
});

// Save the user to the database
newUser.save((err) => {
  if (err) {
    console.error('Error creating user:', err);
  } else {
    console.log('User created successfully.');
  }
});
