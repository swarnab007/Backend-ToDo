import express from "express";
import {
  createTask,
  checkTask,
  getMyTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuth, createTask);
router.get("/me", isAuth, getMyTask);

router.route("/:id").put(isAuth, checkTask).delete(isAuth, deleteTask);

export default router;
