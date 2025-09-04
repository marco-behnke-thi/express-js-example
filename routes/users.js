var express = require('express');
var router = express.Router();
var userController = require('../controllers/user_controller');
var baseMiddleware = require('../middlewares/base_middleware');

/* GET users listing. */
router.get('/', userController.getUsers);

/* GET user by ID. */
router.get('/:id', baseMiddleware.param('id').isInt, userController.getUserById);

/* POST login */
router.post('/login', userController.login);

/* POST logout */
router.post('/logout', userController.logout);

module.exports = router;
