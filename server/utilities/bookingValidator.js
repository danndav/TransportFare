import Joi from 'joi';

const tripId = Joi.number().integer().positive()
  .required();
const seatNumber = Joi.number().integer().positive()
  .required();


const BookingCreateSchema = {
  tripId,
  seatNumber,
};

const BookingUpdateSchema = {
  tripId,
  seatNumber,
};


export default { BookingCreateSchema, BookingUpdateSchema };
