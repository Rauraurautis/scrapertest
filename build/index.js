"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
    (0, routes_1.routes)(app);
});
