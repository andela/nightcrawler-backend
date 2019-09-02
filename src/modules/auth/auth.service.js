/* eslint-disable import/prefer-default-export */
import db from '../../models';

/**
 * @param {object} condition
 * @returns {object} an object containing the information of the user or null
 */
export const getAUser = (condition = {}) => {
  const user = Object.keys(condition).length
    ? db.User.findOne({
      where: condition,
      logging: false
    })
    : null;

  return user;
};
