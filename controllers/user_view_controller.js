exports.login = function(req, res, next) {
  let errorMessage = '';
  const error = req.session.loginErrorCode || null;
  if (req.session.loginErrorCode) {
    errorMessage = `auth.${req.session.loginErrorCode}`
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
