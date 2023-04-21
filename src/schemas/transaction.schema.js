import Joi from "joi";
const transationSchema = Joi.object({
  tipo: Joi.string().equal("entrada", "saida").required(),
  descricao: Joi.string().required(),
  valor: Joi.number().required(),
  data: Joi.string().required(),
  token: Joi.string().required(),
});
export default transationSchema;
