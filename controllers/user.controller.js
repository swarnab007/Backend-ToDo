import { User } from "../models/user.model.js";
import { ErrorHandler } from "../middlewares/error.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, fullname, password } = req.body;
    console.log(username, password);

    if(!username || !email || !fullname || !password) return res.json(new ErrorHandler("All fields are required", 400));  
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

    const payload = {
      email: user.email,
      id: user._id,
    };

    let token = jwt.sign(payload, "djsjgjohwjhnwigbnmfmag353553hj", {
      expiresIn: "2h",
    });

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
    .status(200)
    .cookie("token", token, options)
    .json({
      success: true,
      message:`Registered successfully`,
    });
   // return sendCookie(user, res, "Registered successfully", 201);


  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "PLease fill all the details carefully",
      });
    }
    
    //check for registerd user
    let user = await User.findOne({username}).select("+password");
    
    if (!user) return res.send(new ErrorHandler("Register First", 400));


    const isMatchedPass = bcrypt.compare(password, user.password);
    if (!isMatchedPass)
      return res.send(new ErrorHandler("Wrong Password !", 400));

      const payload = {
        email: user.email,
        id: user._id,
      };

      let token = jwt.sign(payload, "djsjgjohwjhnwigbnmfmag353553hj", {
        expiresIn: "2h",
      });

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

       res
      .status(200)
      .cookie("token", token, options)
      .json({
        success: true,
        message:`Welcome Back ${user.fullname}`,
      });
      
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
