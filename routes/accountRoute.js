const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')
const Validate = require('../middleware/validator')
const {
    getCurrentAccount,
    createAccount,
    updateCurrentAccount,
    deleteCurrentAccount,
} = require('../controllers/accountController')

router.route('/createAccount').post(Validate('createAccount'), createAccount)
router.route('/getCurrentAccount').get(authenticateUser, getCurrentAccount)
router
    .route('/updateCurrentAccount')
    .patch(authenticateUser, Validate('updateAccount'), updateCurrentAccount)
router
    .route('/deleteCurrentAccount')
    .delete(authenticateUser, deleteCurrentAccount)

module.exports = router
