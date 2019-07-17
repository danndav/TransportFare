import Joi from 'joi';
import BusSchema from '../utilities/busValidator';

const { BusCreateSchema } = BusSchema;

/**
 *
 * @exports
 * @class UserMiddleware
 */
class BusMiddleware {
  /**
   * UserMiddleware
   * @staticmethod  userValidateData
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  // eslint-disable-next-line consistent-return
  static BusCreateValidate(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "error",
        error: 'Please fill all fields',
      });
    }
    Joi.validate(req.body, BusCreateSchema)
      .then(() => next())
      .catch(err => res.status(400).json({
        status: "error",
        error: err.details[0].message,
      }));
  }
}
export default BusMiddleware;
