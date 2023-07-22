const createTokenAccount = (account) => {
    return { firstName: account.firstName, lastName: account.lastName, accountId: account._id };
  };
  
  module.exports = createTokenAccount;
  