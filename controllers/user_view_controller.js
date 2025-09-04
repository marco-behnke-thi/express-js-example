exports.login = function(req, res, next) {
  let errorMessage = '';
  
  if (req.query.error === 'user_not_found') {
    errorMessage = 'User not found';
  } else if (req.query.error === 'wrong_password') {
    errorMessage = 'Password wrong';
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
