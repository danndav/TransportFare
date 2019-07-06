import Joi from 'joi';
import userSchema from '../utilities/userValidator';

const { userSignupSchema, userSigninSchema } = userSchema;

/**
 *
 * @exports
 * @class UserMiddleware
 */
class Middleware {
  /**
   * UserMiddleware
   * @staticmethod  userValidateData
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  // eslint-disable-next-line consistent-return
  static userSignupValidate(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Please fill all fields',
      });
    }
    Joi.validate(req.body, userSignupSchema)
      .then(() => next())
      .catch(err => res.status(400).json({
        status: 400,
        message: err.details[0].message,
      }));
  }

  /**
   * UserMiddleware
   * @staticmethod  userValidateData
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  // eslint-disable-next-line consistent-return
  static userLoginValidate(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Please fill all fields',
      });
    }
    Joi.validate(req.body, userSigninSchema)
      .then(() => next())
      .catch(err => res.status(400).json({
        status: 400,
        message: err.details[0].message,
      }));
  }

}
export default Middleware;
