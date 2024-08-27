import { Router } from "express";
import multer from "multer";
import validateBody from "../helpers/validateBody.js";
import authSchema from "../schemas/authSchemas.js";
import emailSchema from "../schemas/authSchemas.js";
import {
  getCurrentUser,
  login,
  logout,
  register,
  updateAvatar,
  verifyUser,
  resendVerificationEmail,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

const upload = multer({ dest: "temp/" });

authRouter.post("/register", validateBody(authSchema), register);

authRouter.post("/login", login);

authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

authRouter.post("/verify", validateBody(emailSchema), resendVerificationEmail);

authRouter.get("/verify/:verificationToken", verifyUser);

export default authRouter;
