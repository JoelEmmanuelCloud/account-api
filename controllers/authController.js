const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');
// const { attachCookiesToResponse, createTokenUser } = require('../utils');


const register = async (req, res) => {
    const {email} = req.body;

    const emailAlreadyExist = await User.findOne({email});
    if  (emailAlreadyExist) {
        throw new CustomError.BadRequestError('Email already exists');
    }

    
    const user = await User.create(req.body);
    const tokenUser = {firstName:user.firstName, lastName: user.lastName, userId:user._id}
    const token = jwt.sign(tokenUser, 'jwtSecret', {expiresIn: '1d'});
    res.status(StatusCodes.CREATED).json({user: tokenUser, token});

};

const login = async (req, res) => {
    res.send('login users');
}
const logout = async (req, res) => {
    res.send('logout users');
}


module.exports = {register, login, logout};
