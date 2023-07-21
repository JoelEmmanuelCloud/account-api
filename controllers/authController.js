// const User = require('../models/user');
// const { StatusCodes } = require('http-status-codes');
// const CustomError = require('../errors');
// const { attachCookiesToResponse, createTokenUser } = require('../utils');


const register = async (req, res) => {
    res.send('register user');

}

const login = async (req, res) => {
    res.send('login users');
}
const logout = async (req, res) => {
    res.send('logout users');
}


module.exports = {register, login, logout};
