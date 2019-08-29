import Joi from '@hapi/joi';
import { joiValidator } from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';

/**
   * validate edit role permission input
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const editRolePermissionValidation = (req, res, next) => {
  const data = {
    permissions: req.body.permissions,
    roleId: req.params.roleId,
  };
  const schema = Joi.object().keys({
    permissions: Joi.array().items(Joi.number().required()).required(),
    /**
     * TODO: in the case where a new role is created, the maximum value in this
     * roleId schema needs to increase to accommodate this changes
     * A dynamic solution is to get the validation from the roles table.
     */
    roleId: Joi.number().min(1).max(6).required()
  });
  const errors = joiValidator(data, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};

/**
   * validate get role input
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const getRolePermissionValidation = (req, res, next) => {
  const data = {
    roleId: req.params.roleId,
  };
  const schema = Joi.object().keys({
    /**
     * TODO: in the case where a new role is created, the maximum value in this
     * roleId schema needs to increase to accommodate this changes
     * A dynamic solution is to get the validation from the roles table.
     */
    roleId: Joi.number().min(1).max(6).required()
  });
  const errors = joiValidator(data, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};


/**
 * validate user email and roleId
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} error
 */
export const editUserRoleValidation = (req, res, next) => {
  const data = {
    email: req.body.email,
    roleId: req.params.roleId,
  };
  const editUserRoleSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    /**
     * TODO: in the case where a new role is created, the maximum value in this
     * roleId schema needs to increase to accommodate this changes
     * A dynamic solution is to get the validation from the roles table.
     */
    roleId: Joi.number().min(1).max(6).required()
  });
  const errors = joiValidator(data, editUserRoleSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};
