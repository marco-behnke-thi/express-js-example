exports.login = function(req, res, next) {
  let errorMessage = '';
  
  if (req.session.loginErrorCode) {
    switch (req.session.loginErrorCode) {
      case 'user_not_found':
        errorMessage = req.t('auth.user_not_found');
        break;
      case 'wrong_password':
        errorMessage = req.t('auth.wrong_password');
        break;
      case 'system_error':
        errorMessage = req.t('auth.system_error');
        break;
      default:
        errorMessage = req.t('auth.login_failed');
        break;
    }
    
    // Clear the error code from session after retrieving it (flash message behavior)
    delete req.session.loginErrorCode;
  }
  
  res.render('user/login', { title: req.t('auth.login_title'), error: errorMessage });
};

exports.index = function(req, res, next) {
  const username = req.session.username || 'User';
  res.render('user/index', { 
    title: req.t('pages.user_dashboard'), 
    username: username,
    welcomeMessage: req.t('auth.welcome_message', { username: username }),
    user: req.session.user || {}
  });
};
