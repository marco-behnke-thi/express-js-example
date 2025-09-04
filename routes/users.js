var express = require('express');
var router = express.Router();
var userController = require('../controllers/user_controller');
var userViewController = require('../controllers/user_view_controller');
var baseMiddleware = require('../middlewares/base_middleware');
var authMiddleware = require('../middlewares/auth_middleware');
var userMiddleware = require('../middlewares/user_middleware');

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
