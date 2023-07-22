const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
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

accountSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

accountSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('Account', accountSchema);