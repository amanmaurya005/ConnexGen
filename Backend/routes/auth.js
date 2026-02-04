import { Router } from "express";
import { checkAuth, login, register } from "../controllers/auth.js";
import { checkToken } from "../middleware/checkToken.js";

const authRouter=Router();

authRouter.post("/login",login);
authRouter.post("/register",register);
authRouter.get("/check",checkToken,checkAuth)

export default authRouter;