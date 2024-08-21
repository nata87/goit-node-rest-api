import User from "../db/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/HttpError.js";
import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw HttpError(400, "Missing required fields");
    }

    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      throw HttpError(409, "Email in use");
    }
    const avatarURL = gravatar.url(email, { s: "400", r: "g", d: "mm" });
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({
      where: { email },
    });
    console.log("user", user);

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw HttpError(401, "Email or password is wrong");
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();
    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findByPk(id);
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    user.token = null;
    await user.save();
    res.status(204).json({ message: "User has been logged out successfully." });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findByPk(id);
    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { id, email } = req.user;
    const { path: tempPath, originalname } = req.file;

    const extension = path.extname(originalname);
    const fileName = `${id}${extension}`;
    const avatarPath = path.join("public", "avatars", fileName);

    await fs.rename(tempPath, avatarPath);

    const avatarURL = `/avatars/${fileName}`;
    await User.update({ avatarURL }, { where: { id } });

    res.status(200).json({
      message: "Користувача успішно зареєстровано",
      avatarURL: avatarURL || "тут буде посилання на зображення",
    });
  } catch (error) {
    next(error);
  }
};
