const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const userViewController = require('../controllers/user_view_controller');
const userMiddleware = require('../middlewares/user_middleware');

/* GET users listing. */
router.get('/', userController.getUsers);

/* GET login page */
router.get('/login', userMiddleware.login, userViewController.login);

/* GET users index page */
router.get('/index', userMiddleware.userIndex, userViewController.index);

/* GET user by ID. */
router.get('/:id', userMiddleware.getUserById, userController.getUserById);

/* POST API login */
router.post('/api/login', userController.login);

/* POST API logout */
router.post('/api/logout', userController.logout);

module.exports = router;
