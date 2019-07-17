import Joi from 'joi';
import BookingSchema from '../utilities/bookingValidator';

const { BookingCreateSchema } = BookingSchema;

/**
 *
 * @exports
 * @class BookingMiddleware
 */
class BookingMiddleware {
  /**
   * BookingMiddleware
   * @staticmethod  BookingValidateData
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  // eslint-disable-next-line consistent-return
  static BookingCreateValidate(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "error",
        error: 'Please fill all fields',
      });
    }
    Joi.validate(req.body, BookingCreateSchema)
      .then(() => next())
      .catch(err => res.status(400).json({
        status: "error",
        error: err.details[0].message,
      }));
  }
}
export default BookingMiddleware;
