"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskModel = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../../types/types");
const schema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: types_1.StatusEnums,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    startingDate: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
});
exports.taskModel = (0, mongoose_1.model)("task", schema);
//# sourceMappingURL=task.model.js.map