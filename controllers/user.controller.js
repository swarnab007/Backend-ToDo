import { User } from "../models/user.model.js";
import { ErrorHandler } from "../middlewares/error.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, fullname, password } = req.body;
    console.log(username, password);
    if (
      [username, email, fullname, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.json(new ErrorHandler("All fields are required", 400));
    }

    let user = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (user) return res.send(new ErrorHandler("User Already exists", 400));
    const hashedPass = await bcrypt.hash(password, 10);
    user = await User.create({
      username,
      fullname,
      email,
      password: hashedPass,
    });
    return sendCookie(user, res, "Registered successfully", 201);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    console.log(username);
    let user = await User.findOne({username}).select("+password");
    
    if (!user) return res.send(new ErrorHandler("Register First", 400));
    const isMatchedPass = bcrypt.compare(password, user.password);
    if (!isMatchedPass)
      return res.send(new ErrorHandler("Wrong Password !", 400));

    sendCookie(user, res, `Welcome Back ${user.fullname}`, 200);
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      user: req.user,
    });
};

export const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  })
};
