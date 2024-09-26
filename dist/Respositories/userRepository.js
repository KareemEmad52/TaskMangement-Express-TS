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
exports.UserRepository = void 0;
const user_model_1 = require("../DB/models/user.model");
class UserRepository {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.UserModel.findOne({ email });
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_model_1.UserModel(user);
            return yield newUser.save();
        });
    }
    findUserById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.UserModel.findOne({ _id });
        });
    }
    findUserByCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.findOne({ email, password });
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map