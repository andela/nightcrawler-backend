/**
   * error: prepare json response for API endpoint
   * @param {object} res response object
   * @param {Number} code error status code of response
   * @param {object} errors error message corresponding with status code
   * @returns {object} json response object
  * */
const errorResponse = (res, code, errors) => res.status(code).json({
  status: 'error',
  errors
});

/**
   * success: prepare json response for API endpoint
   * @param {object} res response object
   * @param {Number} code success status code of response
   * @param {object} data Object data corresponding with success status code
   * @returns {object} json response object
  * */
const successResponse = (res, code, data) => res.status(code).json({
  status: 'success',
  data
});

export { errorResponse, successResponse };
