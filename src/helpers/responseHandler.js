/**
  * @param  {object} res
  * @param  {Number} statusCode
  * @param  {string} message
  * @param  {object} additionalFields
  * @returns {Object} null
  */
export function respondWithSuccess(res, statusCode = 200, message, additionalFields = {}) {
  return res.status(statusCode).send({ success: true, message, payload: { ...additionalFields } });
}

/**
  * @param  {object} res
  * @param  {Number} statusCode
  * @param  {Array} message
  * @param  {object} additionalFields
  * @returns {Object} null
  */
export function respondWithWarning(res, statusCode = 500, message, additionalFields = {}) {
  return res.status(statusCode).send({ success: false, message, payload: { ...additionalFields } });
}
