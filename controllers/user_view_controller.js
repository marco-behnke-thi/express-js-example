exports.login = function(req, res, next) {
  let errorMessage = '';
  
  if (req.session.loginErrorCode) {
    switch (req.session.loginErrorCode) {
      case 'user_not_found':
        errorMessage = 'User not found';
        break;
      case 'wrong_password':
        errorMessage = 'Password wrong';
        break;
      case 'system_error':
        errorMessage = 'System error, please try again';
        break;
      default:
        errorMessage = 'Login failed';
        break;
    }
    
    // Clear the error code from session after retrieving it (flash message behavior)
    delete req.session.loginErrorCode;
  }
  
  res.render('user/login', { title: 'Login', error: errorMessage });
};

exports.index = function(req, res, next) {
  res.render('user/index', { 
    title: 'User Dashboard', 
    username: req.session.username || 'User',
    user: req.session.user || {}
  });
};
