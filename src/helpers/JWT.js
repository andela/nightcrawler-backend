import jwt from 'jsonwebtoken';
import { SECRET_KEY, EXPIRATION_DURATION } from '../config/constants';

/**
   * Method to generate token
   * @param {object} data
   * @returns {string} generated token
   */

const generateToken = async (data) => {
  const token = await jwt.sign({ key: data }, SECRET_KEY, { expiresIn: EXPIRATION_DURATION });
  return token;
};

/**
   * Verify a token
   * @param {object} token
   * @returns {Object} decoded data
   */

const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

/**
   * Verify a token
   * @param {object} token
   * @returns {Object} decoded data
   */

const formatJWTErrorMessage = (message) => {
  if (message.includes('invalid') || message.includes('malformed')) {
    return 'Session is invalid. Signin to continue';
  }
  if (message.includes('expired')) {
    return 'Session has expired. Signin to continue';
  }
  return message;
};

export { generateToken, verifyToken, formatJWTErrorMessage };
