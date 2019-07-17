import Joi from 'joi';

const first_name = Joi.string().trim(true).min(3).regex(/^[A-Za-z]*$/)
  .min(1)
  .required();
const last_name = Joi.string().trim().min(3).regex(/^[A-Za-z]*$/)
  .min(1)
  .required();
const email = Joi.string().email().trim().min(8)
  .min(1)
  .required();
const password = Joi.string().trim()
  .min(1)
  .required();



const userSignupSchema = {
  first_name,
  last_name,
  email,
  password,

};

const userSigninSchema = {
  email,
  password,
};

export default { userSignupSchema, userSigninSchema };
