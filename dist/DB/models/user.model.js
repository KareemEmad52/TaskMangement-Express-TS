"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../../types/types");
const bcrypt_1 = __importDefault(require("bcrypt"));
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: types_1.UserGender,
        required: true,
    },
});
schema.pre("save", function (next) {
    const user = this;
    let newPass = "";
    if (!user.isModified("password"))
        return next();
    if (user.isModified("password")) {
        newPass = bcrypt_1.default.hashSync(user.password, 5);
    }
    user.password = newPass;
    next();
});
exports.UserModel = (0, mongoose_1.model)("user", schema);
//# sourceMappingURL=user.model.js.map