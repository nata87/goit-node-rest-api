import Joi from "joi";
import { emailRegex } from "../constants/constants.js";

export const authSchema = new Joi.object({
  email: Joi.string().regex(emailRegex).required(),
  password: Joi.string().min(10).required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().regex(emailRegex).required(),
});
