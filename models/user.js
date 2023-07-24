const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Provide a valid email address',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        maxlength: 100,
    },
    carType: {
        type: String,
        enum: ['SEDAN', 'SUV', 'HATCHBACK', 'TRUCK', 'OTHER'],
        required: [true, 'Car type is required'],
    },
    zipCode: {
        type: String,
        required: [true, 'Zip code is required'],
        trim: true,
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        maxlength: 20,
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
        maxlength: 20,
    },
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', userSchema)
