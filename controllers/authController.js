const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const {
    attachCookiesToResponse,
    createTokenUser,
    createJWT,
} = require('../utils')

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new CustomError.BadRequestError(
            'Please provide email and password'
        )
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Password or Email')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Password')
    }
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })

    const token = createJWT({ payload: tokenUser })

    res.status(StatusCodes.OK).json({ token, user: tokenUser })
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({ msg: 'account logged out!' })
}

module.exports = { login, logout }
