const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');


//storing contactus detail
router.post('/Contact', async (req, res) => {
  try {

    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });


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

    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contact details:', error);
    res.status(500).json({ error: 'An error occurred while fetching contact details' });
  }
});

// Route to delete a specific contact by ID
router.delete('/Contact/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'An error occurred while deleting contact' });
  }
});

module.exports = router;