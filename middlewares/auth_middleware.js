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

exports.isAdmin = function(req, res, next) {
  if (req.session && req.session.user && req.session.user.loggedIn && req.session.user.isAdmin) {
    return next();
  }
  
  return res.status(403).send('Forbidden: Admin access required');
};