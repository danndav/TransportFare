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
const bus_id = Joi.number().integer().positive()
  .required();
const trip_date = Joi.date().required();

const TripCreateSchema = {
  origin,
  destination,
  fare,
  bus_id,
  trip_date,
};

const tripUpdateStatusSchema = {
  status,
};


export default { TripCreateSchema, tripUpdateStatusSchema };
