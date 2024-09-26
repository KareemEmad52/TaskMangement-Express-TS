"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskSchema = exports.updateTaskSchema = exports.getUserTasksSchema = exports.addTaskSchema = void 0;
const yup = __importStar(require("yup"));
const types_1 = require("../../types/types");
exports.addTaskSchema = yup.object({
    body: yup
        .object({
        title: yup
            .string()
            .max(50, "title must be at most 50 charcters")
            .required("title is required"),
        description: yup
            .string()
            .max(500, "description must be less than 500 character")
            .required("description is required"),
        status: yup
            .string()
            .oneOf([types_1.StatusEnums.IN_PROGRESS, types_1.StatusEnums.COMPLETED])
            .required(),
        deadline: yup
            .string()
            // 
            .datetime()
            .required(),
        startingDate: yup
            .string()
            .datetime()
            .required(),
    })
        .noUnknown(true, "Unknown field: ${unknown}"),
    headers: yup.object({
        token: yup.string().required(),
    }),
    params: yup.object(),
});
exports.getUserTasksSchema = yup.object({
    body: yup.object(),
    headers: yup.object({
        token: yup.string().required(),
    }),
    params: yup.object(),
});
exports.updateTaskSchema = yup.object({
    body: yup
        .object({
        title: yup
            .string()
            .max(50, "title must be at most 50 charcters")
            .optional(),
        description: yup
            .string()
            .max(500, "description must be less than 500 character")
            .optional(),
        status: yup
            .string()
            .oneOf([types_1.StatusEnums.IN_PROGRESS, types_1.StatusEnums.COMPLETED])
            .optional(),
        deadline: yup
            .string()
            .matches(/([0-9]{1,2})-([0-9]{1,2})-([0-9]{4})/, "must be matching dd-mm-yyyy")
            .optional(),
        startingDate: yup
            .string()
            .matches(/([0-9]{1,2})-([0-9]{1,2})-([0-9]{4})/, "must be matching dd-mm-yyyy")
            .optional(),
    })
        .noUnknown(true, "Unknown field: ${unknown}"),
    headers: yup.object({
        token: yup.string().required(),
    }),
    params: yup.object({
        taskId: yup.string().required(),
    }),
});
exports.deleteTaskSchema = yup.object({
    body: yup
        .object()
        .noUnknown(true, "Unknown field: ${unknown}"),
    headers: yup.object({
        token: yup.string().required(),
    }),
    params: yup.object({
        taskId: yup.string().required(),
    }),
});
//# sourceMappingURL=tasks.validations.js.map