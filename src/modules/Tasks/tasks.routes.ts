import { Router } from "express";
import { Authenticate } from "../Auth/Auth.middlewares";
import { validate } from "../../middlewares/ValidateRequests";
import { addTaskSchema, deleteTaskSchema, getUserTasksSchema, updateTaskSchema } from "./tasks.validations";
import { addTask, DeleteTask, getTasksByUserID, updateTask } from "./tasks.controller";
import { hasPermission, isTaskExist } from "./tasks.middlewares";

const router = Router()

router.get('/',Authenticate, validate(getUserTasksSchema),getTasksByUserID)
router.post('/',Authenticate,validate(addTaskSchema),addTask)
router.put('/:taskId',Authenticate,validate(updateTaskSchema),isTaskExist,hasPermission,updateTask)
router.delete('/:taskId',Authenticate,validate(deleteTaskSchema),isTaskExist,hasPermission,DeleteTask)


export default router