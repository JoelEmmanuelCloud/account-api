const Account = require('../models/account')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenAccount } = require('../utils')

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new CustomError.BadRequestError(
            'Please provide email and password'
        )
    }
    const account = await Account.findOne({ email })

    if (!account) {
        throw new CustomError.UnauthenticatedError('Invalid Password or Email')
    }
    const isPasswordCorrect = await account.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Password')
    }
    const tokenAccount = createTokenAccount(account)
    attachCookiesToResponse({ res, account: tokenAccount })

    res.status(StatusCodes.OK).json({ account: tokenAccount })
}
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({ msg: 'account logged out!' })
}

module.exports = { login, logout }
