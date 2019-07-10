import Joi from 'joi';

const numberPlate = Joi.string().alphanum().trim()
  .min(7)
  .required();
const manufacturer = Joi.string().trim()
  .min(5)
  .required();
const model = Joi.string().trim()
  .min(1)
  .required();
const year = Joi.number().integer().min(4)
  .required();
const capacity = Joi.number().integer().min(5)
  .required();

const BusCreateSchema = {
  numberPlate,
  manufacturer,
  model,
  year,
  capacity,
};


export default { BusCreateSchema };
