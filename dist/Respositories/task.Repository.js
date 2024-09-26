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
exports.TaskRepository = void 0;
const task_model_1 = require("../DB/models/task.model");
class TaskRepository {
    createTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = new task_model_1.taskModel(data);
            return yield task.save();
        });
    }
    findTasksByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.taskModel.find({ createdBy: userId });
        });
    }
    updateTask(_a) {
        return __awaiter(this, arguments, void 0, function* ({ taskId, updatedData }) {
            return yield task_model_1.taskModel.findByIdAndUpdate(taskId, Object.assign({}, updatedData), { new: true });
        });
    }
    owenedTask(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, taskId }) {
            return yield task_model_1.taskModel.findOne({ createdBy: userId, _id: taskId });
        });
    }
    getTaskById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.taskModel.findById(taskId);
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.taskModel.findByIdAndDelete(taskId);
        });
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.Repository.js.map