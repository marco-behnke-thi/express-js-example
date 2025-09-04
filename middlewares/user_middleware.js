var authMiddleware = require('./auth_middleware');
var baseMiddleware = require('./base_middleware');

exports.getUserById = [
  authMiddleware.isAuthenticated,
  baseMiddleware.param('id').isInt
];

exports.userIndex = authMiddleware.isAuthenticated;

exports.login = authMiddleware.isGuest;