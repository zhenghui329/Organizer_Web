const dummy = require('./dummyData');

const users = {
	...dummy.dummyUsers,
};

const DEFAULT_PROFILE = {
  theme: 'colorful',
};

const getInfo = (username) => {
  if(!users[username]) {
    users[username] = { ...DEFAULT_PROFILE, username, categories:{} };
  }
  return users[username];
};

const getUserData = (username) => {
  if(!username || !users[username]) {
    return;
  }
  return users[username];
};

module.exports = {
  getInfo,
  getUserData,
};

