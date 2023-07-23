const Account = require('../models/account');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createAccount = async (req, res) => {
    const { email } = req.body;

    const emailAlreadyExist = await Account.findOne({ email });
    if (emailAlreadyExist) {
        throw new CustomError.BadRequestError('Email already exists');
    }

    const account = await Account.create(req.body);

    const accountWithoutPassword = { ...account.toObject() };
    delete accountWithoutPassword.password;

    res.status(StatusCodes.CREATED).json({ account: accountWithoutPassword });
};

const getCurrentAccount = async (req, res) => {
    const loggedInAccountId = req.account.accountId;
    const account = await Account.findOne({ _id: loggedInAccountId }).select('-password');

  
    if (!account) {
      throw new CustomError.NotFoundError(`No account with id: ${loggedInAccountId}`);
    }
  
    res.status(StatusCodes.OK).json({ account });
  };


  const updateCurrentAccount = async (req, res) => {
    const { password, confirmPassword, ...otherFields } = req.body;

    if (password !== undefined || confirmPassword !== undefined) {
        
        if (!password || !confirmPassword) {
            throw new CustomError.BadRequestError('Please provide both password and confirm password values.');
        }

        if (password !== confirmPassword) {
            throw new CustomError.BadRequestError('New password and confirm password do not match');
        }

        const account = await Account.findOne({ _id: req.account.accountId });

        
        if (password) {
            const isPrevious = await account.comparePassword(password);
            if (isPrevious) {
                throw new CustomError.UnauthenticatedError('This was your previous password, input a new one');
            }

            
            account.password = password;
            await account.save();
        }
    }

    if (Object.keys(otherFields).length > 0) {
        const account = await Account.findOne({ _id: req.account.accountId });

        
        Object.assign(account, otherFields);

        await account.save();
    }

    
    const updatedAccount = await Account.findOne({ _id: req.account.accountId }).select('-password').exec();
    res.status(StatusCodes.OK).json({ account: updatedAccount });
};


const deleteCurrentAccount = async (req, res) => {
    const accountId = req.account.accountId;

    const account = await Account.findOne({ _id: accountId });

    if (!account) {
        throw new CustomError.NotFoundError(`No account with id: ${accountId}`);
    }

    await Account.deleteOne({ _id: accountId });


    res.status(StatusCodes.OK).json({ msg: 'Success! Account Deleted.' });
};

module.exports = {
    getCurrentAccount,
    createAccount,
    updateCurrentAccount,
    deleteCurrentAccount,
};
