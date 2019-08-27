import Joi from 'joi';


const validation = {
  sanitizeEmail: () => (Joi.string().email({ minDomainAtoms: 2 }).required().label('email address')),

  sanitizePassword: () => (Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()),

  validateSignin() {
    return ({
      email: this.sanitizeEmail(),
      password: this.sanitizePassword(),
    }
    );
  },

  passwordCheck: (pass, storePass) => (pass === storePass)
};
export default validation;
