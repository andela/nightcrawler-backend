/**
 * Handles all http responses
 * @exports responseHandler
 */
const responseHandler = {
  /**
   * @param  {object} res
  * @returns {Object} null
   */
  invalidCredential: res => res.status(401).json({
    status: 'error',
    message: 'email or password incorrect',
  }),

  /**
  * @param  {object} res
  * @param  {object} message
  * @returns {Object} null
  */
  validationError: (res, message) => {
    res.status(400).json({
      status: 'error',
      message,
    });
  },

  /**
  * @param  {object} res
  * @param  {object} data
  * @returns {Object} null
  */
  success: (res, data) => {
    if (typeof data.password !== 'undefined') {
      delete data.password;
    }
    res.status(200).json({
      status: 'success',
      data,
    });
  }

};
export default responseHandler;
