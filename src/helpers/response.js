
const response = {
  invalidCredential: (res) => res.status(401).json({
    status: 'error',
    message: 'Provide correct login credentials',
  }),
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
export default response;
