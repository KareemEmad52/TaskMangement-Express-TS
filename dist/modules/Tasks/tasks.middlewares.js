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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = exports.isTaskExist = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const task_Repository_1 = require("../../Respositories/task.Repository");
const mongoose_1 = __importDefault(require("mongoose"));
const taskRepository = new task_Repository_1.TaskRepository();
exports.isTaskExist = (0, errorHandler_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistTask = yield taskRepository.getTaskById(req.params.taskId);
    if (!isExistTask)
        throw new errorHandler_1.AppError("Task not found", 404);
    next();
}));
exports.hasPermission = (0, errorHandler_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const taskId = mongoose_1.default.Types.ObjectId.isValid(req.params.taskId)
        ? new mongoose_1.default.Types.ObjectId(req.params.taskId)
        : null;
    if (!taskId) {
        throw new errorHandler_1.AppError("Invalid task ID", 400);
    }
    const existTask = yield taskRepository.owenedTask({
        userId: userId,
        taskId: req.params.taskId,
    });
    if (!existTask) {
        throw new errorHandler_1.AppError("You don't have permission to update this task", 408);
    }
    next();
}));
//# sourceMappingURL=tasks.middlewares.js.map