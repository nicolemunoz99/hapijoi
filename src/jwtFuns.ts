const jwt = require('jsonwebtoken');
const secret = require('my-secret');

const createToken = (username: string) => {
  let scopes;

  return jwt.sign( {username}, secret, { algorithm: 'HS256', expiresIn: "1h" } )
};

module.exports = createToken;
