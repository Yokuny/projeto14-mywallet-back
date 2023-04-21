import { Router } from "express";
import login from "./login.routes.js";
import operations from "./operations.routes.js";

const router = Router();

router.use(login);
router.use(operations);

export default router;
