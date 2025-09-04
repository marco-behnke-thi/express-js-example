exports.isAuthenticated = function(req, res, next) {
  if (req.session && req.session.user && req.session.user.loggedIn) {
    return next();
  }
  
  return res.redirect('/users/login');
};

exports.isGuest = function(req, res, next) {
  if (req.session && req.session.user && req.session.user.loggedIn) {
    return res.redirect('/users/index');
  }
  
  return next();
};