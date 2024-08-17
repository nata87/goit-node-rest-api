import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import User from "../db/models/User.js";

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, "Authorization header missing"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer missing"));
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk({ id });
    if (!user) {
      return next(HttpError(401, "User not found"));
    }

    if (!user.token || user.token !== token) {
      return next(HttpError(401, "Invalid token"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authMiddleware;
