const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

const authenticateAccount = async (req, res, next) => {
    const token = req.signedCookies.token

    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }

    try {
        const { firstName, lastName, accountId } = isTokenValid({ token })
        req.account = { firstName, lastName, accountId }
        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
}

module.exports = authenticateAccount
