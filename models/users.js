const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
        validator:validator.isEmail, 
        message: 'Provide a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },

  carType: {
    type: String,
    enum: ['SEDAN', 'SUV', 'HATCHBACK', 'TRUCK', 'OTHER'],
    required: [true, 'Car type is required']
  },
  zipCode: {
    type: String,
    required: [true, 'Zip code is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  }
});

module.exports = mongoose.model('User', userSchema);