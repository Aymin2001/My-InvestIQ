const express=require('express');
const router=express.Router();
const Contact=require('../models/contact');


//storing contactus detail
router.post('/Contact', async (req, res) => {
    try {
      // Extract data from the request body
      const { name, email, subject, message } = req.body;
  
      // Validate input
      if (!name || !email ||  !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
      }
    
      // if (message.length < 15) {
      //   return res.status(400).json({ error: 'Message must be at least 15 characters long' });
      // }
  
      // Create a new Contact document
      const newContact = new Contact({
        name,
        email,
        subject,
        message
      });
  
      // Save the Contact document to MongoDB
      await newContact.save();
  
      res.status(201).json({ message: 'Contact details saved successfully' });
    } catch (error) {
      console.error('Error saving contact details:', error);
      res.status(500).json({ error: 'An error occurred while saving contact details' });
      
    }
  });


// Route to get all contact details

router.get('/getContacts', async (req, res) => {
  try {
    // Fetch all contact details from the database
    const contacts = await Contact.find(); // Use Contact.find() instead of contacts.find()
    
    // Send the fetched contacts as a response
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contact details:', error);
    res.status(500).json({ error: 'An error occurred while fetching contact details' });
  }
});



module.exports = router;