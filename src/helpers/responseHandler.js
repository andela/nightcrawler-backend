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
  * @param  {Number} code
  * @returns {Object} null
  */
  success: (res, data, code = 200) => {
    res.status(code).json({
      status: 'success',
      data,
    });
  },

  /**
  * @param  {object} res
  * @param  {object} data
  * @param  {Number} code
  * @returns {Object} null
  */
  error: (res, data, code = 500) => {
    res.status(code).json({
      status: 'error',
      error: data,
    });
  }

};
export default responseHandler;
