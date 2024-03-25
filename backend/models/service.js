
const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const service = mongoose.model('Service', serviceSchema);

module.exports = service;
