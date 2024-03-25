const express=require('express');
const router=express.Router();
const Service=require('../models/service');


//storing contactus detail
router.post('/Service', async (req, res) => {
    try {
      // Extract data from the request body
      const { name, email,mobileNo, subject, message } = req.body;
  
      // Validate input
      if (!name || !email || !mobileNo ||  !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
      }
    
      // if (message.length < 15) {
      //   return res.status(400).json({ error: 'Message must be at least 15 characters long' });
      // }
  
      // Create a new Contact document
      const newService = new Service({
        name,
        email,
        mobileNo,
        subject,
        message
      });
  
      // Save the Contact document to MongoDB
      await newService.save();
  
      res.status(201).json({ message: 'Service details saved successfully' });
    } catch (error) {
      console.error('Error saving contact details:', error);
      res.status(500).json({ error: 'An error occurred while saving contact details' });
      
    }
  });





module.exports = router;