import { Request, Response } from "express";
import { CatchAsyncError } from "../../middlewares/errorHandler";
import { TaskService } from "./task.service";
import { TaskRepository } from "../../Respositories/task.Repository";
import { getReasonPhrase, getStatusCode, StatusCodes } from "http-status-codes";

const taskService = new TaskService(new TaskRepository());

export const addTask = CatchAsyncError(async (req: Request, res: Response) => {
  const newTask = await taskService.createNewTask({
    data: req.body,
    userId: req.user?._id as string,
  });
  res.status(StatusCodes.CREATED).json({
    message: getReasonPhrase(StatusCodes.CREATED),
    status: getStatusCode(getReasonPhrase(StatusCodes.CREATED)),
    data: newTask,
  });
});

export const getTasksByUserID = CatchAsyncError(
  async (req: Request, res: Response) => {
    const availibaleTasks = await taskService.getTasksByUserId(
      req.user?._id as string
    );
    res.status(StatusCodes.OK).json({
      message: getReasonPhrase(StatusCodes.OK),
      status: getStatusCode(getReasonPhrase(StatusCodes.OK)),
      data: availibaleTasks,
    });
  }
);

export const updateTask = CatchAsyncError(
  async (req: Request, res: Response) => {
    const updatedTask = await taskService.updateTask({
      taskId: req.params.taskId,
      updatedData: req.body,
    });
    res.status(StatusCodes.OK).json({
      message: getReasonPhrase(StatusCodes.OK),
      status: getStatusCode(getReasonPhrase(StatusCodes.OK)),
      data: updatedTask,
    });
  }
);


export const DeleteTask = CatchAsyncError(
  async (req: Request, res: Response) => {
    const deleteTask = await taskService.deleteTask(req.params.taskId as string)
    res.status(StatusCodes.OK).json({
      message: getReasonPhrase(StatusCodes.OK),
      status: getStatusCode(getReasonPhrase(StatusCodes.OK)),
      data: deleteTask,
    });
  }
);
