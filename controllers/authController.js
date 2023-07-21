const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse} = require('../utils');


const register = async (req, res) => {
    const {email} = req.body;

    const emailAlreadyExist = await User.findOne({email});
    if  (emailAlreadyExist) {
        throw new CustomError.BadRequestError('Email already exists');
    }
    
    const user = await User.create(req.body);
    const tokenUser = {firstName:user.firstName, lastName: user.lastName, userId:user._id};
    attachCookiesToResponse({res, user: tokenUser});

    
    res.status(StatusCodes.CREATED).json({user: tokenUser});

};

    const login = async (req, res) => {
        const { email, password } = req.body;
      
        if (!email || !password) {
          throw new CustomError.BadRequestError('Please provide email and password');
        }
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new CustomError.UnauthenticatedError('Invalid Credentials');
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
          throw new CustomError.UnauthenticatedError('Invalid Credentials');
        }
        const tokenUser = {firstName:user.firstName, lastName: user.lastName, userId:user._id};
        attachCookiesToResponse({ res, user: tokenUser });
      
        res.status(StatusCodes.OK).json({ user: tokenUser });
}
const logout = async (req, res) => {
    res.send('logout users');
}


module.exports = {register, login, logout};
