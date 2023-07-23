const express = require('express');
const router = express.Router();
const authenticateAccount= require('../middleware/authentication');
const Validate = require('../middleware/validator');
const {
    getCurrentAccount,
    createAccount,
    updateCurrentAccount,
    deleteCurrentAccount,
} = require('../controllers/accountController');


router.route('/createAccount').post(Validate('createAccount'), createAccount);
router.route('/getCurrentAccount').get(authenticateAccount, getCurrentAccount);
router.route('/updateCurrentAccount').patch(authenticateAccount,Validate('updateAccount'), updateCurrentAccount);
router.route('/deleteCurrentAccount').delete(authenticateAccount, deleteCurrentAccount);


module.exports = router;