import Joi from 'joi';

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).required().label("First Name"),
  lastName: Joi.string().min(2).required().label("Last Name"),
  email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
  password: Joi.string().min(6).required().label("Password"),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().label("Confirm Password")
    .messages({ 'any.only': 'Passwords do not match' })
});

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
  password: Joi.string().min(6).required().label("Password"),
}); 