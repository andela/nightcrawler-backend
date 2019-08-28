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

export { generateToken, verifyToken };
