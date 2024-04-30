import { Task } from "../models/task.model.js";

export const createTask = async (req, res, next) => {
  try {
    const { taskname, description } = req.body;
    await Task.create({
      taskname,
      description,
      user: req.user,
    });
    res.status(200).json({
      success: true,
      message: "Task Added successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const { id } = req.user;
    const tasks = await Task.find({ user: id });
    res.status(200).json({
      success: true,
      tasks,
    });
    // console.log(tasks);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const checkTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
