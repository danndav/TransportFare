import Joi from 'joi';

const origin = Joi.string().trim()
  .min(1)
  .required();
const destination = Joi.string().trim()
  .min(1)
  .required();
const status = Joi.string().trim()
  .min(1)
  .valid('active', 'cancelled')
  .required();
const fare = Joi.number().integer().positive()
  .required();
const busId = Joi.number().integer().positive()
  .required();
const tripDate = Joi.string().trim(true).min(3).regex(/^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/)
  .error(() => 'enter a valid date with this format 1970-01-011')
  .min(1)
  .required();

const TripCreateSchema = {
  origin,
  destination,
  status,
  fare,
  busId,
  tripDate,
};

const tripUpdateStatusSchema = {
  status,
};


export default { TripCreateSchema, tripUpdateStatusSchema };
