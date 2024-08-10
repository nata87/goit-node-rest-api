import Joi from "joi";

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().min(5).max(60).required(),
  phone: Joi.string().min(7).required(),
  favorite: Joi.bool(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(60),
  email: Joi.string().email().min(5).max(60),
  phone: Joi.string().min(7),
  favorite: Joi.bool(),
});

const updateContactStatusSchema = Joi.object({
  favorite: Joi.bool().required(),
});

export default {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
};
