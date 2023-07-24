const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createAccount = async (req, res) => {
    const { email } = req.body

    const emailAlreadyExist = await User.findOne({ email })
    if (emailAlreadyExist) {
        throw new CustomError.BadRequestError('Email already exists')
    }

    const user = await User.create(req.body)

    const userWithoutPassword = { ...user.toObject() }
    delete userWithoutPassword.password

    res.status(StatusCodes.CREATED).json({ user: userWithoutPassword })
}

const getCurrentAccount = async (req, res) => {
    const loggedInUserId = req.user.userId
    const user = await User.findOne({ _id: loggedInUserId }).select(
        '-password'
    )

    if (!user) {
        throw new CustomError.NotFoundError(
            `No user with id: ${loggedInUserId}`
        )
    }

    res.status(StatusCodes.OK).json({ user })
}

const updateCurrentAccount = async (req, res) => {
    const { password, confirmPassword, ...otherFields } = req.body

    if (password !== undefined || confirmPassword !== undefined) {
        if (!password || !confirmPassword) {
            throw new CustomError.BadRequestError(
                'Please provide both password and confirm password values.'
            )
        }

        if (password !== confirmPassword) {
            throw new CustomError.BadRequestError(
                'New password and confirm password do not match'
            )
        }

        const user = await User.findOne({ _id: req.user.userId })

        if (password) {
            const isPrevious = await user.comparePassword(password)
            if (isPrevious) {
                throw new CustomError.UnauthenticatedError(
                    'This was your previous password, input a new one'
                )
            }

            user.password = password
            await user.save()
        }
    }

    if (Object.keys(otherFields).length > 0) {
        const user = await User.findOne({ _id: req.user.userId })

        Object.assign(user, otherFields)

        await user.save()
    }

    const updatedUser = await User.findOne({ _id: req.user.userId })
        .select('-password')
        .exec()
    res.status(StatusCodes.OK).json({ user: updatedUser })
}

const deleteCurrentAccount = async (req, res) => {
    const userId = req.user.userId

    const user = await User.findOne({ _id: userId })

    if (!user) {
        throw new CustomError.NotFoundError(`No user with id: ${userId}`)
    }

    await User.deleteOne({ _id: userId })

    res.status(StatusCodes.OK).json({ msg: 'Success! User Deleted.' })
}

module.exports = {
    getCurrentAccount,
    createAccount,
    updateCurrentAccount,
    deleteCurrentAccount,
}
