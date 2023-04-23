import { Router } from "express";
import { postNovaTransacao, getHome } from "../controllers/operations.controller.js";
import dataValidation from "../middlewares/dataValidate.middleware.js";
import transactionSchema from "../schemas/transaction.schema.js";
import auth from "../middlewares/auth.middleware.js";

const operations = Router();

operations.use(auth);
operations.get("/home", getHome);
operations.post("/nova-transacao/:tipo", dataValidation(transactionSchema), postNovaTransacao);

export default operations;
