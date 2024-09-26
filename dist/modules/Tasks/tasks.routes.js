"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_middlewares_1 = require("../Auth/Auth.middlewares");
const ValidateRequests_1 = require("../../middlewares/ValidateRequests");
const tasks_validations_1 = require("./tasks.validations");
const tasks_controller_1 = require("./tasks.controller");
const tasks_middlewares_1 = require("./tasks.middlewares");
const router = (0, express_1.Router)();
router.get('/', Auth_middlewares_1.Authenticate, (0, ValidateRequests_1.validate)(tasks_validations_1.getUserTasksSchema), tasks_controller_1.getTasksByUserID);
router.post('/', Auth_middlewares_1.Authenticate, (0, ValidateRequests_1.validate)(tasks_validations_1.addTaskSchema), tasks_controller_1.addTask);
router.put('/:taskId', Auth_middlewares_1.Authenticate, (0, ValidateRequests_1.validate)(tasks_validations_1.updateTaskSchema), tasks_middlewares_1.isTaskExist, tasks_middlewares_1.hasPermission, tasks_controller_1.updateTask);
router.delete('/:taskId', Auth_middlewares_1.Authenticate, (0, ValidateRequests_1.validate)(tasks_validations_1.deleteTaskSchema), tasks_middlewares_1.isTaskExist, tasks_middlewares_1.hasPermission, tasks_controller_1.DeleteTask);
exports.default = router;
//# sourceMappingURL=tasks.routes.js.map