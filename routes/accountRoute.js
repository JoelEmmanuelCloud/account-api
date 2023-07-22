const express = require('express');
const router = express.Router();
const {
  authenticateAccount,
} = require('../middleware/authentication');
const {
    getCurrentAccount,
    createAccount,
    updateCurrentAccount,
    // updateAccountPassword,
    deleteCurrentAccount,
} = require('../controllers/accountController');


router.route('/createAccount').post(createAccount);
router.route('/getCurrentAccount').get(authenticateAccount, getCurrentAccount);
router.route('/updateCurrentAccount').patch(authenticateAccount, updateCurrentAccount);
// router.route('/updateAccountPassword').patch(authenticateAccount, updateAccountPassword);
router.route('/deleteCurrentAccount').get(authenticateAccount, deleteCurrentAccount);


module.exports = router;