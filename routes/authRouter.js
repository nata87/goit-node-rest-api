import { Router } from "express";

import validateBody from "../helpers/validateBody.js";
import authSchema from "../schemas/authSchemas.js";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/register", validateBody(authSchema), register);

authRouter.post("/login", login);

authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, getCurrentUser);

export default authRouter;
