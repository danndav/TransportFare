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
const tripDate = Joi.date().required();

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
