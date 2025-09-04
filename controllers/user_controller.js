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
    return res.status(400).json({ 
      error: 'Username and password are required' 
    });
  }
  
  // Accept any username/password for now
  req.session.user = {
    id: Math.floor(Math.random() * 1000),
    username: username,
    loggedIn: true,
    loginTime: new Date().toISOString()
  };
  
  res.json({ 
    message: 'Login successful',
    user: req.session.user
  });
};

exports.logout = function(req, res, next) {
  if (!req.session.user) {
    return res.status(400).json({ 
      error: 'Not logged in' 
    });
  }
  
  req.session.destroy(function(err) {
    if (err) {
      return res.status(500).json({ 
        error: 'Failed to logout' 
      });
    }
    
    res.json({ 
      message: 'Logout successful' 
    });
  });
};
