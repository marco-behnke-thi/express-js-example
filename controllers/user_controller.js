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
  
  if (!username || !password) {
    return res.redirect('/users/login');
  }
  
  // Accept any username/password for now
  req.session.user = {
    id: Math.floor(Math.random() * 1000),
    username: username,
    loggedIn: true,
    loginTime: new Date().toISOString()
  };
  req.session.username = username;
  
  res.redirect('/users/index');
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

