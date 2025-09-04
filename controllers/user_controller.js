const userService = require('../services/user_service');

exports.getUsers = function(req, res, next) {
  res.send('respond with a resource');
};

exports.getUserById = function(req, res, next) {
  const userId = req.params.id;
  const userData = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    role: 'standard',
    created: new Date().toISOString()
  };
  res.json(userData);
};

exports.login = function(req, res, next) {
  const { username, password } = req.body;
  
  try {
    const sessionUser = userService.login(username, password);
    
    req.session.user = sessionUser;
    req.session.username = sessionUser.username;
    
    res.redirect('/users/index');
  } catch (error) {
    let errorParam;
    
    switch (error.error) {
      case 'missing_credentials':
        errorParam = '';
        break;
      case 'user_not_found':
        errorParam = '?error=user_not_found';
        break;
      case 'wrong_password':
        errorParam = '?error=wrong_password';
        break;
      default:
        errorParam = '';
        break;
    }
    
    return res.redirect('/users/login' + errorParam);
  }
};

exports.logout = function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/users/login');
  }
  
  req.session.destroy(function(err) {
    if (err) {
      return res.redirect('/users/login');
    }
    
    res.redirect('/users/login');
  });
};

