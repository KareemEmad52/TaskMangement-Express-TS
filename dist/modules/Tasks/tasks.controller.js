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
exports.DeleteTask = exports.updateTask = exports.getTasksByUserID = exports.addTask = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const task_service_1 = require("./task.service");
const task_Repository_1 = require("../../Respositories/task.Repository");
const http_status_codes_1 = require("http-status-codes");
const taskService = new task_service_1.TaskService(new task_Repository_1.TaskRepository());
exports.addTask = (0, errorHandler_1.CatchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newTask = yield taskService.createNewTask({
        data: req.body,
        userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.CREATED),
        status: (0, http_status_codes_1.getStatusCode)((0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.CREATED)),
        data: newTask,
    });
}));
exports.getTasksByUserID = (0, errorHandler_1.CatchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const availibaleTasks = yield taskService.getTasksByUserId((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.OK),
        status: (0, http_status_codes_1.getStatusCode)((0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.OK)),
        data: availibaleTasks,
    });
}));
exports.updateTask = (0, errorHandler_1.CatchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTask = yield taskService.updateTask({
        taskId: req.params.taskId,
        updatedData: req.body,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.OK),
        status: (0, http_status_codes_1.getStatusCode)((0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.OK)),
        data: updatedTask,
    });
}));
exports.DeleteTask = (0, errorHandler_1.CatchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteTask = yield taskService.deleteTask(req.params.taskId);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.OK),
        status: (0, http_status_codes_1.getStatusCode)((0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.OK)),
        data: deleteTask,
    });
}));
//# sourceMappingURL=tasks.controller.js.map