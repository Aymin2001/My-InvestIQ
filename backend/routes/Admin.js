const express = require('express');     //importing express
const User = require('../models/AdminRegister');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');      //provide token to user on terminal for secuirty purpose.
const getuser = require('../middleware/getuser');

const JWT_SECRETE = 'Ayminisagoodgir@l'; 


//1st Route
//Create a User using: POST "api/auth". No login required. 
//Now Creating"api/auth/createuser" instead of router.post( '/'.
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('dateOfBirth').isISO8601(), // Assuming dateOfBirth is in ISO 8601 format
    body('city').isString(),
    body('phone').isMobilePhone(), // Assuming phone number validation according to locale
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "User with this Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
            dateOfBirth: req.body.dateOfBirth,
            city: req.body.city,
            phone: req.body.phone
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});





//2nd Route
//Authenticat a User using: POST "api/auth/login". No login required. 
router.post( '/login', [
  body('email', 'Enter a valid  email').isEmail(),     /*Copy from express validator website*/
  body('password', 'Password cannot be blank').exists(),
  ], 
 async (req, res)=>{

    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;   //taking email and password from user.
    /* Now comparing user entered email and password with already eneterd or stored email. */
    try {      
      let user = await User.findOne({email});
      if(!user){
        success = false;
        return res.status(400).json({ error: "Enter correct credentials"});
      }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({success, error: "Enter correct credentials"});
    }

    const data ={
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRETE);   
    success = true;
    res.json({success, authToken});

  } catch (error) {
      console.error(error.message);   
      res.status(500).send("Internal Server Error"); 
  }
});




//3rd Route


router.post('/getuser', getuser, async (req, res) => {
    try {
      // Here we will get our user by token e.g with its id.
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password"); // Exclude password field
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

//   get specific user profile detail
  
  router.post('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
module.exports = router;