const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const multer = require('multer');

// const Storage = multer.diskStorage({
//   destination: 'uploads',

//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({
//   storage: Storage
// }).single('testimg');

// router.post('/uploading', (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send("An error occurred during file upload.");
//     }
//     const newImage = new Profile({
//       name: req.body.name,
//       image: {
//         data: req.file.path,
//         contentType: 'image/png'
//       }
//     });
//     newImage.save()
//       .then(() => res.send("Successfully uploaded"))
//       .catch((err) => {
//         console.log(err);
//         res.status(500).send("An error occurred while saving the image to the database.");
//       });
//   });
// });
// Multer configuration for file upload
// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'ayminisagoodgir@l'); // Replace 'your_secret_key' with your actual secret key
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Upload profile picture
router.post('/profile-picture', verifyToken, upload.single('profilePicture'), async (req, res) => {
  try {
    const user = await Profile.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profilePicture = req.file.path; // Assuming the file path is stored in the 'path' property
    await user.save();

    res.json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
