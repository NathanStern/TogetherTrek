const jwt = require('jsonwebtoken')

const config = require('../config/config.js')

exports.getDecodedToken = (headers) => {
  const token = headers["authorization"];

  if (!token) {
    throw [401, "Client did not send JWT with request in header."];
  }

  try {
      return jwt.verify(`${token}`, config.app.JWT_KEY);
  } catch (err) {
    throw [500, err.message || "Invalid JWT."];
  }
};

exports.generateToken = (username, id) => {
  jwt.sign(
    {
      username: username,
      id: id,
    },
    config.app.JWT_KEY,
    {
      expiresIn: '2h',
    }
  )
}
