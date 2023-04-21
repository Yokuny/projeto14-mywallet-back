import { Router } from "express";
import { postCadastro, postLogin } from "../controllers/login.controller.js";
import dataValidation from "../middlewares/dataValidate.middleware.js";
import registerSchema from "../schemas/registerSchema.schema.js";
import loginSchema from "../schemas/login.schema.js";

const login = Router();
login.post("/login", dataValidation(loginSchema), postLogin);
login.post("/cadastro", dataValidation(registerSchema), postCadastro);

export default login;
