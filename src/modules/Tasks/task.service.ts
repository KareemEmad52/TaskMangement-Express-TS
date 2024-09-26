import { AppError } from "../../middlewares/errorHandler";
import { TaskRepository } from "../../Respositories/task.Repository";
import { UserRepository } from "../../Respositories/userRepository";
import { Task, TaskDTO } from "../../types/types";

export class TaskService {
  constructor(private taskRespository: TaskRepository) {}

  async createNewTask({ data, userId }: { data: TaskDTO; userId: string }) {
    const task = await this.taskRespository.createTask({
      ...data,
      createdBy: userId,
    });
    if (!task) throw new AppError("faild to create the task", 500);
    return task;
  }

  async getTasksByUserId(userId: string) {
    if (!userId) throw new AppError("No userId provided", 404);
    const tasks = await this.taskRespository.findTasksByUserId(userId);
    return tasks;
  }

  async updateTask({taskId,updatedData}: {taskId: string;updatedData: Partial<TaskDTO>;}) {
    if (!taskId) throw new AppError("No Task Id Provided", 404);

    if (!updatedData) throw new AppError("No update data Provided", 404);
    const allowedUpdates = [
      "title",
      "description",
      "status",
      "deadline",
      "startingDate",
    ];

    const fields = Object.keys(updatedData);
    const isValidToUpdate = fields.some((field) =>
      allowedUpdates.includes(field)
    );
    if (!isValidToUpdate)
      throw new AppError(
        "Invalid updates! You must provide at least one valid field.",
        400
      );

    const updatedTask = await this.taskRespository.updateTask({
      taskId,
      updatedData,
    });

    return updatedTask;
  }


  async deleteTask(taskId:string) {
    const deletedTask = await this.taskRespository.deleteTask(taskId)
    return deletedTask
  }
}
