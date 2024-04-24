import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/logout", logout);
router.get("/profile", isAuth, getProfile);

export default router;
