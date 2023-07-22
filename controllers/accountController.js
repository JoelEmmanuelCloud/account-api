const Account = require('../models/account');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  createTokenAccount,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');

const createAccount = async (req, res) => {
    const {email} = req.body;

    const emailAlreadyExist = await Account.findOne({email});
    if  (emailAlreadyExist) {
        throw new CustomError.BadRequestError('Email already exists');
    }
    
    const account = await Account.create(req.body);
    const tokenAccount = {firstName:account.firstName, lastName: account.lastName, accountId:account._id};
    attachCookiesToResponse({res, account: tokenAccount});

    
    res.status(StatusCodes.CREATED).json({account: tokenAccount});

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
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError('Please provide all values');
  }
  const account = await Account.findOne({ _id: req.account.accountId });

  account.email = email;
  account.name = name;

  await account.save();

  const tokenAccount = createTokenAccount(account);
  attachCookiesToResponse({ res, account: tokenAccount });
  res.status(StatusCodes.OK).json({ account: tokenAccount });
};

const updateAccountPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both values');
  }
  const account = await Account.findOne({ _id: req.account.accountId });

  const isPasswordCorrect = await account.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  
  account.password = newPassword;

  await account.save();
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};
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
    updateAccountPassword,
    deleteCurrentAccount,
};
