// const mongoose = require('mongoose');
// const { buffer } = require('stream/consumers');

// const profileSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   profilePicture: {
//     type: String, // or Buffer for storing binary data
//   },
// });

// const Profile = mongoose.model('Profile', profileSchema);

// module.exports = Profile;
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    data: Buffer, // Storing binary data of the image
    contentType: String // Mime type of the image
  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
