const { v4: uuidv4 } = require('uuid');
const users = require('./users');
const auth = require('./auth');

// In a real example this connects to a database
const sessions = {};

const validateSession = (sid) => {
  if(!sid || !sessions[sid] || sessions[sid].expires < Date.now() ) {
    return false;
  }
  return true;
}

const attemptCreate = (username) => {
  if(!username || !auth.isPermittedUsername(username)) {
    return false;
  }
  const info = users.getInfo(username);
  const sid = uuidv4();
  sessions[sid] = {
    ...info,
    sid,
    expires: Date.now() + 1000*60*30, // in milliseconds
  };
  return sessions[sid];
};

const getSession = (sid) => {
  return sessions[sid];
};

const remove = (sid) => {
  delete sessions[sid];
};

const canReadUser = ({ sid, username }) => {
  if(!sid || !username || sessions[sid].username !== username) {
    return false;
  }
  return true;
};

module.exports =  {
  validateSession,
  attemptCreate,
  getSession,
  remove,
  canReadUser,
};
