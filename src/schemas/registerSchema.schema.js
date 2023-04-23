import Joi from "joi";
const registerSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(3).required(),
});
export default registerSchema;
