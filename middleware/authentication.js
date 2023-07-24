const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token

    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }

    try {
        const { firstName, lastName, userId } = isTokenValid({ token })
        req.user = { firstName, lastName, userId }
        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
}

module.exports = authenticateUser
