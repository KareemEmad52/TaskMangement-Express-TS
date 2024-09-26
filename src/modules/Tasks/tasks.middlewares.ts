import { NextFunction, Request, Response } from "express";
import { AppError, CatchAsyncError } from "../../middlewares/errorHandler";
import { TaskRepository } from "../../Respositories/task.Repository";
import mongoose from "mongoose";

const taskRepository = new TaskRepository();

export const isTaskExist = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const isExistTask = await taskRepository.getTaskById(
      req.params.taskId as string
    );

    if (!isExistTask) throw new AppError("Task not found", 404);

    next();
  }
);

export const hasPermission = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id as string;

    const taskId = mongoose.Types.ObjectId.isValid(req.params.taskId)
      ? new mongoose.Types.ObjectId(req.params.taskId)
      : null;

    if (!taskId) {
      throw new AppError("Invalid task ID", 400);
    }

    const existTask = await taskRepository.owenedTask({
      userId: userId,
      taskId: req.params.taskId,
    });

    if (!existTask) {
      throw new AppError("You don't have permission to update this task", 408);
    }

    next();
  }
);
