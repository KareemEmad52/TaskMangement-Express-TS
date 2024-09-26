import { taskModel } from "../DB/models/task.model";
import { TaskDTO } from "../types/types";

export class TaskRepository {
  async createTask(data: TaskDTO) {
    const task = new taskModel(data);
    return await task.save();
  }

  async findTasksByUserId(userId:string){
    return await taskModel.find({createdBy:userId})
  }

  async updateTask({taskId,updatedData}:{taskId:string,updatedData: Partial<TaskDTO>}){
    return await taskModel.findByIdAndUpdate(taskId,{...updatedData},{new:true})
  }

  async owenedTask ({userId,taskId}:{userId:string,taskId:string}){
    return await taskModel.findOne({createdBy:userId,_id:taskId})
  }

  async getTaskById(taskId:string){
    return await taskModel.findById(taskId)
  }

  async deleteTask(taskId:string){
    return await taskModel.findByIdAndDelete(taskId)
  }

}
