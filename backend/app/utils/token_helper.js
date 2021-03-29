const jwt = require('jsonwebtoken')

const config = require('../config/config.js')

exports.getDecodedToken = (headers) => {
  const token = headers["authorization"];

  if (!token) {
    throw [401, "Client did not send JWT with request in header."];
  }

  let decoded_token;
  try {
      decoded_token = jwt.verify(`${token}`, config.app.JWT_KEY);
  } catch (err) {
    throw [500, err.message || "Invalid JWT."];
  }
  return decoded_token;
};

exports.generateToken = (username, id) => {
  return jwt.sign(
    {
      username: username,
      id: id
    },
    config.app.JWT_KEY,
    {
      expiresIn: '2h',
    }
  )
}
