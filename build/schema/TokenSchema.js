"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenSchema = void 0;
const zod_1 = require("zod");
exports.createTokenSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        token: (0, zod_1.string)({ required_error: "Token is required!" }),
        userAgent: (0, zod_1.string)({ required_error: "Useragent is required!" }),
    })
});
