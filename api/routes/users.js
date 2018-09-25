const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewear/check-auth');
const UserController = require('../controllers/users');

router.post('/signup', UserController.create_user);
router.post('/login', UserController.loginUser);
router.delete('/:userId', UserController.deleteOneUser);
router.get('/:userId', UserController.getOneUser);
router.get('/allusers', UserController.getAllUsers)

module.exports = router;