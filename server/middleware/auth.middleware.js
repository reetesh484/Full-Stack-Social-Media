import User from "../model/User.js";
import JWT from "jsonwebtoken";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/customError.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }


  if (!token) {
    throw new CustomError("Not authorized to access this resource", 401);
  }

  try {
    const decodedJwtPayload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(
      decodedJwtPayload._id,
      "firstName lastName email"
    );
    next();
  } catch (error) {
    throw new CustomError("Not authorized to access this resource", 401);
  }
});
