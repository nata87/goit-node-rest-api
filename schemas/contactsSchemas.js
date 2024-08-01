import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().min(3).max(50).required(),
  phone: Joi.string().min(7).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email().min(3).max(50),
  phone: Joi.string().min(7),
});
