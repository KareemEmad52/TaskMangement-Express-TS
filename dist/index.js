"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./Routers/router"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const DB_connection_1 = require("./DB/DB.connection");
const errorHandler_1 = require("./middlewares/errorHandler");
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const PORT = +process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1", router_1.default);
app.all('*', (req, res, next) => {
    throw new errorHandler_1.AppError('Route not found', 404);
});
app.use((err, req, res, next) => {
    const { status, stack, message } = err;
    res.status(status || 500).json(Object.assign({ status: "error", message }, (process.env.MODE === "development" && { stack })));
});
(0, DB_connection_1.DB_CONNECTION)();
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map