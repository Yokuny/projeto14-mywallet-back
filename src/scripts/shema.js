import Joi from "joi";

export const cadastradoSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export const transationSchema = Joi.object({
  descricao: Joi.string().required(),
  valor: Joi.number().required(),
  data: Joi.string().required(),
  token: Joi.string().required(),
});
