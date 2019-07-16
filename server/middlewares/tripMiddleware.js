import Joi from 'joi';
import TripSchema from '../utilities/tripValidator';

const { TripCreateSchema, tripUpdateStatusSchema } = TripSchema;

/**
 *
 * @exports
 * @class TripMiddleware
 */
class TripMiddleware {
  /**
   * TripMiddleware
   * @staticmethod  TripValidateData
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  // eslint-disable-next-line consistent-return
  static TripCreateValidate(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Please fill all fields',
      });
    }
    Joi.validate(req.body, TripCreateSchema)
      .then(() => next())
      .catch(err => res.status(400).json({
        status: 400,
        message: err.details[0].message,
      }));
  }

  /**
   * TripMiddleware
   * @staticmethod  TripUpdateStatus
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  // eslint-disable-next-line consistent-return
  static TripUpdateStatus(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      /* istanbul ignore next-line */
      return res.status(400).json({
        status: 400,
        message: 'Please fill all fields',
      });
    }
    Joi.validate(req.body, tripUpdateStatusSchema)
    /* istanbul ignore next-line */
      .then(() => next())
      .catch(err => res.status(400).json({
        status: 400,
        message: err.details[0].message,
      }));
  }
}
export default TripMiddleware;
