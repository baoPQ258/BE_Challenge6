import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  // Check if the Authorization header is present in the request
  if (!req.headers.authorization) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  // Split the Authorization header to get the token
  const token = req.headers.authorization.split(" ")[1];

  // Check if the token is present
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set req.user to be used in the next middleware
    req.userId = await User.findById(decoded.userId).select("-password");

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export { protect };
