const fs = require('fs');
const path = require('path');

class UserService {
  constructor() {
    this.usersPath = path.join(__dirname, '..', 'users.json');
  }

  login(username, password) {
    if (!username || !password) {
      throw { error: 'missing_credentials' };
    }

    try {
      const usersData = JSON.parse(fs.readFileSync(this.usersPath, 'utf8'));
      const foundUser = usersData.users.find(u => u.username === username);

      if (!foundUser) {
        throw { error: 'user_not_found' };
      }

      if (foundUser.password !== password) {
        throw { error: 'wrong_password' };
      }

      return {
        id: Math.floor(Math.random() * 1000),
        username: foundUser.username,
        isAdmin: foundUser.isAdmin,
        loggedIn: true,
        loginTime: new Date().toISOString()
      };
    } catch (error) {
      if (error.error) {
        throw error;
      }
      console.error('Error reading users file:', error);
      throw { error: 'system_error' };
    }
  }
}

module.exports = new UserService();