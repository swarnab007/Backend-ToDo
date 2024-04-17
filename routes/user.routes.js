import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register",register)
router.post("/login", login);

router.get("/logout", logout);
router.get("/profile", getProfile);

export default router