/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import { SECRET_KEY, EXPIRATION_DURATION } from '../config/constants';
/**
   * Method to generate token from userId and role
   * @param {object} data
   * @returns {string} generated token
   */
export const generateToken = async (data) => {
  const token = await jwt.sign({ key: data }, SECRET_KEY, { expiresIn: EXPIRATION_DURATION });
  return token;
};

export const verifyToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken;
};
