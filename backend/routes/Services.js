const express = require('express');
const router = express.Router();
const Service = require('../models/service');


//storing contactus detail
router.post('/Service', async (req, res) => {
  try {
    const { name, email, mobileNo, subject, message } = req.body;
    if (!name || !email || !mobileNo || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newService = new Service({
      name,
      email,
      mobileNo,
      subject,
      message
    });
    await newService.save();

    res.status(201).json({ message: 'Service details saved successfully' });
  } catch (error) {
    console.error('Error saving contact details:', error);
    res.status(500).json({ error: 'An error occurred while saving contact details' });

  }
});


// Route to get all contact details

router.get('/getServices', async (req, res) => {
  try {

    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching service details:', error);
    res.status(500).json({ error: 'An error occurred while fetching service details' });
  }
});

// Route to delete a specific contact by ID
router.delete('/Service/:id', async (req, res) => {
  try {
    const serviceId = req.params.id;
    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({ message: 'service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'An error occurred while deleting service' });
  }
});

module.exports = router;