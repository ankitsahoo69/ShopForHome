const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

router.get('/', UserController.getUsers);


router.get('/:id', UserController.getUser);


router.post('/', UserController.createUser);


router.post('/register', UserController.registerUser);


router.post('/login', UserController.loginUser);


router.put('/:id', UserController.updateUser);


router.delete('/:id', UserController.deleteUser);


router.get('/get/count', UserController.getUserCount);


module.exports = router;