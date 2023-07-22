const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateAccount = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }

  try {
    const { firstName, lastName, accountId} = isTokenValid({ token });
    req.account = { firstName, lastName, accountId};
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

// const authorizePermissions = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.account.role)) {
//       throw new CustomError.UnauthorizedError(
//         'Unauthorized to access this route'
//       );
//     }
//     next();
//   };
// };

module.exports = {
  authenticateAccount,
//   authorizePermissions,
};
