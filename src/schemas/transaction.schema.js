import Joi from "joi";
const transationSchema = Joi.object({
  valor: Joi.number().required(),
  descricao: Joi.string().required(),
});
export default transationSchema;
