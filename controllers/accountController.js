const Account = require('../models/account');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  createTokenAccount,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');

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
    const { newPassword, confirmPassword, ...otherFields } = req.body;

    if (newPassword !== undefined || confirmPassword !== undefined) {
        // This branch handles password update
        if (!newPassword || !confirmPassword) {
            throw new CustomError.BadRequestError('Please provide both values for password update');
        }

        if (newPassword !== confirmPassword) {
            throw new CustomError.BadRequestError('New password and confirm password do not match');
        }

        const account = await Account.findOne({ _id: req.account.accountId });

        const isPrevious = await account.comparePassword(newPassword);
        if (isPrevious) {
            throw new CustomError.UnauthenticatedError('This was your previous password, input a new one');
        }

        account.password = newPassword;
        await account.save();
        res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
    } else {
        // This branch handles updating other fields except email, name, and password
        if (Object.keys(otherFields).length === 0) {
            throw new CustomError.BadRequestError('Please provide at least one value to update');
        }

        const account = await Account.findOne({ _id: req.account.accountId });

        // Update all account fields from otherFields dynamically
        Object.assign(account, otherFields);

        await account.save();

        const tokenAccount = createTokenAccount(account);
        // Remove attachCookiesToResponse function since it's not needed for updating the account details
        res.status(StatusCodes.OK).json({ account: tokenAccount });
    }
};


// const updateCurrentAccount = async (req, res) => {
//   const { email, name } = req.body;
//   if (!email || !name) {
    // throw new CustomError.BadRequestError('Please provide all values');
//   }
//   const account = await Account.findOne({ _id: req.account.accountId });

//   account.email = email;
//   account.name = name;

//   await account.save();

//   const tokenAccount = createTokenAccount(account);
//   attachCookiesToResponse({ res, account: tokenAccount });
//   res.status(StatusCodes.OK).json({ account: tokenAccount });
// };

// const updateAccountPassword = async (req, res) => {
//     const { newPassword, confirmPassword } = req.body;
//     if (!newPassword || !confirmPassword) {
//         throw new CustomError.BadRequestError('Please provide both values');
//     }

    
//     if (newPassword !== confirmPassword) {
//         throw new CustomError.BadRequestError('New password and confirm password do not match');
//     }

//     const account = await Account.findOne({ _id: req.account.accountId });

//     const isPrevious = await account.comparePassword(newPassword);
//     if (isPrevious) {
//         throw new CustomError.UnauthenticatedError('This was your previous password, input a new one');
//     }

//     account.password = newPassword;

    // await account.save();
    // res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
// };

const deleteCurrentAccount = async (req, res) => {
    const { id: accountId } = req.params;
  
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
    // updateAccountPassword,
    deleteCurrentAccount,
};
