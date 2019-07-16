import Joi from 'joi';

const trip_id = Joi.number().integer().positive()
  .required();
const seat_number = Joi.number().integer().positive()
  .required();


const BookingCreateSchema = {
  trip_id,
  seat_number,
};

const BookingUpdateSchema = {
  trip_id,
  seat_number,
};


export default { BookingCreateSchema, BookingUpdateSchema };
