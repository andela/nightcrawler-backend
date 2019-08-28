import * as userServices from './user.services';

export default {
  /**
   * Creates a new user
   * @param {Object} req
   * @param {Object} res
   * @returns {Function} CreateUser
   */
  createUser: (req, res) => {
    const data = req.body;
    return userServices.createUser(data, res);
  },

};
