const createTokenUser = (user) => {
    return {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
    }
}

module.exports = createTokenUser
