"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
class TaskService {
    constructor(taskRespository) {
        this.taskRespository = taskRespository;
    }
    createNewTask(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data, userId }) {
            const task = yield this.taskRespository.createTask(Object.assign(Object.assign({}, data), { createdBy: userId }));
            if (!task)
                throw new errorHandler_1.AppError("faild to create the task", 500);
            return task;
        });
    }
    getTasksByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                throw new errorHandler_1.AppError("No userId provided", 404);
            const tasks = yield this.taskRespository.findTasksByUserId(userId);
            return tasks;
        });
    }
    updateTask(_a) {
        return __awaiter(this, arguments, void 0, function* ({ taskId, updatedData }) {
            if (!taskId)
                throw new errorHandler_1.AppError("No Task Id Provided", 404);
            if (!updatedData)
                throw new errorHandler_1.AppError("No update data Provided", 404);
            const allowedUpdates = [
                "title",
                "description",
                "status",
                "deadline",
                "startingDate",
            ];
            const fields = Object.keys(updatedData);
            const isValidToUpdate = fields.some((field) => allowedUpdates.includes(field));
            if (!isValidToUpdate)
                throw new errorHandler_1.AppError("Invalid updates! You must provide at least one valid field.", 400);
            const updatedTask = yield this.taskRespository.updateTask({
                taskId,
                updatedData,
            });
            return updatedTask;
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedTask = yield this.taskRespository.deleteTask(taskId);
            return deletedTask;
        });
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map