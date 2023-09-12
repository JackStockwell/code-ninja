const mongoose = require('mongoose');
const UserAuth = require('./index.js');

mongoose.connect("http://localhost:3001/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the user ID you want to update
const userIdToUpdate = 'user_id_to_update'; // Replace with the actual user ID

// Define the updated data
const updatedUserData = {
  email: 'new_email@example.com', // Update the email
  type: 'recruiter', // Update the user type if needed
};

// Find the user by ID
UserAuth.findById(userIdToUpdate, (err, user) => {
  if (err) {
    console.error('Error finding user:', err);
    return;
  }

  if (!user) {
    console.log('User not found.');
    return;
  }

  // Update user data
  user.email = updatedUserData.email;
  user.type = updatedUserData.type;

  // Save the updated user
  user.save((err) => {
    if (err) {
      console.error('Error updating user:', err);
    } else {
      console.log('User updated successfully.');
    }
  });
});
