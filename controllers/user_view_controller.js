exports.login = function(req, res, next) {
  const errorMessage = req.session.loginError || '';
  
  // Clear the error from session after retrieving it (flash message behavior)
  delete req.session.loginError;
  
  res.render('user/login', { title: 'Login', error: errorMessage });
};

exports.index = function(req, res, next) {
  res.render('user/index', { 
    title: 'User Dashboard', 
    username: req.session.username || 'User',
    user: req.session.user || {}
  });
};
