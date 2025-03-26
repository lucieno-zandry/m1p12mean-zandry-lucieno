// src/utils/jwt.js
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',  // Token expiration time (1 hour)
  });
  return token;
};

export default generateToken;
