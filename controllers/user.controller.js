import { User } from "../models/user.model.js";
import { ErrorHandler } from "../middlewares/error.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res) => {
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
    if (user) return res.next(new ErrorHandler("User Already exists", 400));
    const hashedPass = await bcrypt.hash(password, 10);
    user = await User.create({
      username: username.toLowerCase(),
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
    const { username, password } = req.body;
    console.log(username);
    let loginUser = await User.findOne({username}).select("+password");
    if (!loginUser) return res.send(new ErrorHandler("Register First", 400));
    const isMatchedPass = bcrypt.compare(password, loginUser.password);
    if (!isMatchedPass)
      return res.send(new ErrorHandler("Wrong Password !", 400));

    sendCookie(loginUser, res, `Welcome Back ${loginUser.fullname}`, 200);
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

export const logout = async (req, res) => {};

export const getProfile = async (req, res) => {};
