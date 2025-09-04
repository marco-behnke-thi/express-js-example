exports.login = function(req, res, next) {
  res.render('user/login', { title: 'Login' });
};

exports.index = function(req, res, next) {
  res.render('user/index', { title: 'User Dashboard', username: req.session.username || 'User' });
};
