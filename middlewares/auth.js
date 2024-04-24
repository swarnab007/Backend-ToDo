import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  // console.log(req);
  const { token } = req.cookies;
  // console.log(token);
  if (!token) {
    res.status(404).json({
      success: false,
      message: "Login first",
    });
  }
  const decoded = jwt.verify(token, "djsjgjohwjhnwigbnmfmag353553hj");
  req.user = await User.findById(decoded.id);
  console.log(req.user);
  next();
};
