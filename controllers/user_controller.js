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
  
  // Load users from JSON file
  const fs = require('fs');
  const path = require('path');
  const usersPath = path.join(__dirname, '..', 'users.json');
  
  try {
    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    const foundUser = usersData.users.find(u => u.username === username);
    
    if (!foundUser) {
      return res.redirect('/users/login?error=user_not_found');
    }
    
    if (foundUser.password !== password) {
      return res.redirect('/users/login?error=wrong_password');
    }
    
    req.session.user = {
      id: Math.floor(Math.random() * 1000),
      username: username,
      isAdmin: foundUser.isAdmin,
      loggedIn: true,
      loginTime: new Date().toISOString()
    };
    req.session.username = username;
    
    res.redirect('/users/index');
  } catch (error) {
    console.error('Error reading users file:', error);
    return res.redirect('/users/login');
  }
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

